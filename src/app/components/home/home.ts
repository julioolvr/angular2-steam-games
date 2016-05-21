import { Component, OnInit } from 'angular2/core';
import { FORM_DIRECTIVES, Control } from 'angular2/common';
import { MATERIAL_DIRECTIVES } from "ng2-material/all";

import {GamesList} from '../games-list/games-list';

@Component({
  selector: 'home',
  directives: [...FORM_DIRECTIVES, GamesList, ...MATERIAL_DIRECTIVES],
  pipes: [],
  styles: [require('./home.scss')],
  template: require('./home.html')
})
export class Home implements OnInit {
  steamIdInput: Control = new Control('');
  steamId: string;

  ngOnInit() {
    this.steamIdInput.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((steamId: string) => this.steamId = steamId);
  }
}
