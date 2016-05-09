import {Component, Input} from 'angular2/core';

import {Game} from '../../models/game/game';
import {Api} from '../../services/api/api';

@Component({
  selector: 'games-list',
  template: require('./games-list.html'),
  styles: [],
  providers: [Api],
  directives: [],
  pipes: []
})
export class GamesList {
  public games: Array<Game>;
  public loadingGames: boolean;
  public errorMessage: string;

  constructor(private _api: Api) { }

  @Input()
  set steamId(value: string) {
    this.getGames(value);
  }

  getGames(steamId) {
    if (!steamId) {
      return;
    }

    this.loadingGames = true;
    this._api.getGames(steamId)
      .finally(() => this.loadingGames = false)
      .subscribe(
        games => this.games = games,
        error => this.errorMessage = error);
  }
}
