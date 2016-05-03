import {Component, OnInit} from 'angular2/core';

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
export class GamesList implements OnInit {
  public games;
  public errorMessage: string;

  constructor(private _api: Api) { }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this._api.getGames(STEAM_ID).subscribe(
      games => this.games = games,
      error => this.errorMessage = error);
  }
}
