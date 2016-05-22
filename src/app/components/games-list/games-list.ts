import { Component, Input } from 'angular2/core';
import { MATERIAL_DIRECTIVES } from 'ng2-material/all';

import { Game } from '../../models/game/game';
import { Api } from '../../services/api/api';
import { GameCard } from '../game-card/game-card';

@Component({
  selector: 'games-list',
  template: require('./games-list.html'),
  styles: [require('./games-list.scss')],
  providers: [Api],
  directives: [GameCard, ...MATERIAL_DIRECTIVES],
  pipes: []
})
export class GamesList {
  public games: Array<Game>;
  public loadingGames: boolean;
  public errorMessage: string;

  private _steamId: string;

  constructor(private _api: Api) { }

  @Input()
  set steamId(value: string) {
    this._steamId = value;
    this.games = [];

    if (value) {
      this.getGames(value);
    }
  }

  get steamId(): string {
    return this._steamId;
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
