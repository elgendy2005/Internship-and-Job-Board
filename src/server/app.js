import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import { HttpError } from './errors.js';
import { healthRouter } from './routes/health.js';

/**
 * Build the Express application.
 *
 * @param {import('better-sqlite3').Database} db  open database connection (use ':memory:' in tests)
 * @param {object} [options]
 * @param {string} [options.clientDir]  folder with the built React client; when set, it is
 *   served as static files with an SPA fallback to index.html (production only)
 */
export function createApp(db, { clientDir } = {}) {
  const app = express();
  app.locals.db = db;

  app.disable('x-powered-by');
  app.use(express.json());

  // --- API routes ---------------------------------------------------------
  app.use('/api/health', healthRouter());

  // Unknown API routes return JSON, never the SPA page.
  app.use('/api', (req, _res, next) => {
    next(new HttpError(404, `Not found: ${req.method} ${req.originalUrl}`));
  });

  // --- Built client (production) -----------------------------------------
  if (clientDir && fs.existsSync(path.join(clientDir, 'index.html'))) {
    app.use(express.static(clientDir));
    app.get('/{*splat}', (_req, res) => {
      res.sendFile(path.join(clientDir, 'index.html'));
    });
  }

  app.use(jsonErrorHandler);

  return app;
}

// Express recognises error handlers by their four arguments, so `next` must stay.
// eslint-disable-next-line no-unused-vars
function jsonErrorHandler(err, _req, res, _next) {
  const status = err.status ?? err.statusCode ?? 500;

  if (status >= 500) {
    console.error(err);
    res.status(status).json({ error: 'Internal server error' });
    return;
  }

  const message = err.type === 'entity.parse.failed' ? 'Request body is not valid JSON' : err.message;
  res.status(status).json({ error: message });
}
