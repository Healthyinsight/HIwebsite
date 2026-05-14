import { defineConfig, devices } from '@playwright/test'

/**
 * BASE_URL can be set as a GitHub Secret (or local env var) to run tests
 * against a deployed Vercel preview URL instead of a local dev server.
 */
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

export default defineConfig({
  testDir: './e2e',

  // Fail the build if test.only() is accidentally left in source.
  forbidOnly: !!process.env.CI,

  // Retry flaky tests twice in CI, not at all locally.
  retries: process.env.CI ? 2 : 0,

  // Single worker in CI avoids port conflicts; local uses available cores.
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    // Full HTML report (opened manually; never auto-opened in CI).
    ['html', { open: 'never' }],
    // Concise line-by-line output in the Actions log.
    ['list'],
  ],

  use: {
    baseURL: BASE_URL,
    // Always run headless — no display available in CI.
    headless: true,
    // Capture a screenshot on failure for the uploaded artifact.
    screenshot: 'only-on-failure',
    // Record a trace on the first retry so failures are debuggable.
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Spin up the Next.js dev server automatically when no external BASE_URL
  // is provided. reuseExistingServer lets you keep a local server running
  // between test runs without restarting it each time.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npm run dev',
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
})
