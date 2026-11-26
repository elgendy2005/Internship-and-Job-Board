import assert from 'node:assert/strict';
import { When, Then } from '@cucumber/cucumber';
import request from 'supertest';

When('I request the health endpoint', async function () {
  this.response = await request(this.app).get('/api/health');
});

Then('the response status is {int}', function (status) {
  assert.equal(this.response.status, status);
});

Then('the response body has status {string}', function (expected) {
  assert.equal(this.response.body.status, expected);
});
