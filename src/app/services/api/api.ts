import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import {Game} from '../../models/game/game.ts';

@Injectable()
export class Api {
  constructor(private _http: Http) {}

  private _basePath = 'http://localhost:9000';

  getGames(steamId: string): Observable<Game[]> {
    return this._http
      .get(`${this._basePath}/IPlayerService/GetOwnedGames/v0001/?steamid=${steamId}&format=json`)
      .map(this.extractData)
      .flatMap<{appid: string}>(data => Observable.from(data.response ? data.response.games : [], x => x)) // TODO: Why do I need to map? Maybe b/c of Angular's Rx?
      .map(gameData => gameData.appid)
      .flatMap<Game>(gameId => this.getGame(gameId, steamId)) // TODO: Any way to fetch several games at once instead of one by one?
      .filter(game => !!game.name) // TODO: Maybe something else can be done to get these games?
      .reduce((games, game) => games.concat([game]), [])
      .catch(this.handleError);
  }

  getGame(gameId: string, steamId: string): Observable<Game> {
    return this._http
      .get(`${this._basePath}/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${gameId}&steamid=${steamId}`)
      .map(this.extractData)
      .map(data => this.createGame(gameId, data));
  }

  createGame(gameId: string, res: any): Game {
    return { id: gameId, name: res.playerstats.gameName };
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
