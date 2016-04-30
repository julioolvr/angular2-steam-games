import {Injectable} from 'angular2/core';

const GAMES = [
  { name: 'Rocket League' },
  { name: 'Counter Strike: Global Offensive' }
];

@Injectable()
export class Api {
  getGames() {
    return Promise.resolve(GAMES);
  }
}
