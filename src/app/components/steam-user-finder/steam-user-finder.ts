import { Component, EventEmitter, Output } from 'angular2/core';
import { Control } from 'angular2/common';
import { MATERIAL_DIRECTIVES } from 'ng2-material/all';
import { Observable } from 'rxjs/Observable';

import { Api } from '../../services/api/api';

@Component({
  selector: 'steam-user-finder',
  template: require('./steam-user-finder.html'),
  styles: [],
  providers: [],
  directives: [...MATERIAL_DIRECTIVES],
  pipes: []
})
export class SteamUserFinder {
  steamIdInput: Control = new Control('');

  @Output()
  onIdChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _api: Api) { }

  ngOnInit() {
    this.steamIdInput.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .flatMap<string>((inputValue: string) => this.getSteamId(inputValue))
      .subscribe(steamId => this.onIdChanged.emit(steamId));
  }

  getSteamId(inputValue: string) {
    if (/^\d+$/.test(inputValue)) {
      return Observable.fromArray([inputValue]);
    }

    let regex = /(?:https?:\/\/)?steamcommunity.com\/id\/([^/]+)/;
    let match = inputValue.match(regex);

    return this.getSteamIdFromUsername(match ? match[1] : inputValue);
  }

  getSteamIdFromUsername(username: string) {
    return this._api.getIdByUsername(username);
  }
}
