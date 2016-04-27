import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {GamesList} from '../games-list/games-list';

@Component({
  selector: 'home',
  directives: [...FORM_DIRECTIVES, GamesList],
  pipes: [],
  styles: [require('./home.scss')],
  template: require('./home.html')
})
export class Home implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Home');
  }

}
