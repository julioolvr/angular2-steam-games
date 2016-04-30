import {Component, OnInit} from 'angular2/core';

import {Api} from '../../services/api/api';

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

  constructor(private _api: Api) { }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this._api.getGames().then(games => this.games = games);
  }
}
