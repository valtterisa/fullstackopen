import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  use: {
    baseURL: "http://localhost:5173",
  },
  webServer: [
    {
      command: "node dev-e2e.cjs",
      port: 5173,
      reuseExistingServer: true,
    },
  ],
});
