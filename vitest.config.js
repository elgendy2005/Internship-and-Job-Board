import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
    env: {
      DB_PATH: ':memory:',
    },
    coverage: {
      provider: 'v8',
      include: ['src/domain/**/*.js', 'src/server/**/*.js'],
      exclude: ['src/server/index.js'],
      reporter: ['text', 'html', 'lcov'],
    },
  },
});
