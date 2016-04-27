import {Component, OnInit} from 'angular2/core';

const GAMES = [
  { name: 'Rocket League' },
  { name: 'Counter Strike: Global Offensive' }
];

@Component({
  selector: 'games-list',
  template: require('./games-list.html'),
  styles: [],
  providers: [],
  directives: [],
  pipes: []
})
export class GamesList implements OnInit {
  public games = GAMES;

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Load games here?');
  }

}
