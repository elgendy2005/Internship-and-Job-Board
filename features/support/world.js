import { setWorldConstructor, Before, After } from '@cucumber/cucumber';
import { openDb } from '../../src/server/db.js';
import { createApp } from '../../src/server/app.js';

/**
 * Shared state for one scenario. Every scenario gets a fresh in-memory database
 * and Express app, so scenarios never affect each other.
 */
class AppWorld {
  constructor() {
    this.db = null;
    this.app = null;
    this.response = null;
  }
}

setWorldConstructor(AppWorld);

Before(function () {
  this.db = openDb(':memory:');
  this.app = createApp(this.db);
});

After(function () {
  this.db?.close();
});
