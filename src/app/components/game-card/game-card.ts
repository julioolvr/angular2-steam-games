import { Component, Input } from 'angular2/core';
import { MATERIAL_DIRECTIVES } from 'ng2-material/all';

import { Game } from '../../models/game/game';
import { Api } from '../../services/api/api';

@Component({
  selector: 'game-card',
  directives: [...MATERIAL_DIRECTIVES],
  pipes: [],
  styles: [],
  template: require('./game-card.html')
})
export class GameCard {
  @Input()
  public game: Game;

  constructor(private _api: Api) { }

  get gameLogoUrl(): string {
    return this._api.getImageUrl(this.game.id, this.game.imgLogoHash);
  }
}
