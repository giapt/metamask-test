import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

// Alternatively, read from "../my.env" file.
export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    headless: false,
    video: {
      mode: 'on',
      size: { width: 640, height: 480 },
    },
  },
  // start local web server before tests
  // webServer: [
  //   {
  //     command: 'yarn start:server',
  //     url: 'http://localhost:3000',
  //     timeout: 5000,
  //     reuseExistingServer: true,
  //   },
  // ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],
  outputDir: 'test-results',
});
