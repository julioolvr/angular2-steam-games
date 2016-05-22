import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import {Game} from '../../models/game/game.ts';

@Injectable()
export class Api {
  constructor(private _http: Http) {}

  private _basePath = 'http://localhost:9000';

  getGames(steamId: string): Observable<Game[]> {
    return this.getPath(`/IPlayerService/GetOwnedGames/v0001/?steamid=${steamId}&include_appinfo=1`)
      .map(data => data.response ? data.response.games : [])
      .map(gamesData =>
        gamesData.map(gameData => new Game(gameData.appid, gameData.name))
      )
      .catch(this.handleError);
  }

  getIdByUsername(username: string) {
    return this.getPath(`/ISteamUser/ResolveVanityURL/v0001/?vanityurl=${username}`)
      .map(data => data.response ? data.response.steamid : undefined);
  }

  getPath(path: string) {
    return this._http
      .get(`${this._basePath}${path}&format=json`)
      .map(this.extractData);
  }

  extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    return res.json();
  }

  handleError(error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
