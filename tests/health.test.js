import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import request from 'supertest';
import { afterEach, describe, expect, it } from 'vitest';
import { createTestApp } from './helpers.js';

describe('GET /api/health', () => {
  it('reports that the API is running', async () => {
    const { app } = createTestApp();

    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('JSON error handling', () => {
  it('returns a JSON 404 for unknown API routes', async () => {
    const { app } = createTestApp();

    const res = await request(app).get('/api/does-not-exist');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Not found: GET /api/does-not-exist' });
  });

  it('returns a JSON 400 for a malformed JSON body', async () => {
    const { app } = createTestApp();

    const res = await request(app)
      .post('/api/health')
      .set('Content-Type', 'application/json')
      .send('{not json');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Request body is not valid JSON' });
  });
});

describe('serving the built client', () => {
  let clientDir;

  afterEach(() => {
    if (clientDir) fs.rmSync(clientDir, { recursive: true, force: true });
  });

  it('falls back to index.html for client routes but keeps /api as JSON', async () => {
    clientDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ijb-client-'));
    fs.writeFileSync(path.join(clientDir, 'index.html'), '<!doctype html><title>IJB</title>');
    const { app } = createTestApp({ clientDir });

    const page = await request(app).get('/internships');
    expect(page.status).toBe(200);
    expect(page.text).toContain('<title>IJB</title>');

    const api = await request(app).get('/api/unknown');
    expect(api.status).toBe(404);
    expect(api.body.error).toMatch(/Not found/);
  });
});
