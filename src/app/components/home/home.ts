import { Component } from 'angular2/core';
import { FORM_DIRECTIVES } from 'angular2/common';

import { GamesList } from '../games-list/games-list';
import { SteamUserFinder } from '../steam-user-finder/steam-user-finder';

@Component({
  selector: 'home',
  directives: [...FORM_DIRECTIVES, GamesList, SteamUserFinder],
  pipes: [],
  styles: [require('./home.scss')],
  template: require('./home.html')
})
export class Home {
  steamId: string;

  onIdChanged(newSteamId: string) {
    this.steamId = newSteamId;
  }
}
