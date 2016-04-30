import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from 'angular2/testing';
import {Api} from './api';

describe('Api Service', () => {

  beforeEachProviders(() => [Api]);

});
