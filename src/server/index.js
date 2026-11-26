import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from './app.js';

// Load .env if present (Node 22 built-in, no dotenv needed).
try {
  process.loadEnvFile();
} catch {
  // no .env file: use defaults
}

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const isProduction = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT) || 3000;

const app = createApp(null, {
  clientDir: isProduction ? path.join(rootDir, 'dist') : undefined,
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port} (${isProduction ? 'production' : 'development'})`);
});
