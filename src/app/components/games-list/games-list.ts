import {Component, OnInit, Input} from 'angular2/core';

import {Api} from '../../services/api/api';

const STEAM_ID = '76561197995010243';

@Component({
  selector: 'games-list',
  template: require('./games-list.html'),
  styles: [],
  providers: [Api],
  directives: [],
  pipes: []
})
export class GamesList {
  public games;
  public errorMessage: string;

  constructor(private _api: Api) { }

  @Input()
  set steamId(value: string) { // TODO: Is this to react to changes?
    this.getGames(value);
  }

  getGames(steamId) {
    if (!steamId) {
      return;
    }

    this._api.getGames(steamId).subscribe(
      games => this.games = games,
      error => this.errorMessage = error);
  }
}
