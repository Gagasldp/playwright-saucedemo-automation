import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Folder test
  timeout: 30000, // Timeout per test (ms)
  expect: {
    timeout: 5000, // Timeout buat assertion expect()
  },
  use: {
    baseURL: 'https://example.com', // Base URL
    headless: false,
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      slowMo: 1000 // Slow motion 500ms
    }
  },
  reporter: [['html'], ['list']], // Reporter hasil test
});
