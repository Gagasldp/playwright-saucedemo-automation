import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',              // Folder tempat test berada
  timeout: 30000,                  // Timeout per test (ms)
  expect: {
    timeout: 5000,                 // Timeout buat assertion expect()
  },
  use: {
    baseURL: 'https://example.com', // Base URL web yang dites
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  reporter: [['html'], ['list']], // Reporter hasil test
});
