import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  use: {
    baseURL: "http://localhost:5173", // Vite dev server URL or prod URL
  },
  // Optional: auto-start dev server(s)
  // webServer: [
  //   { command: "pnpm dev", port: 5173, reuseExistingServer: true },
  // ],
});
