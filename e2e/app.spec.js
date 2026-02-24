import { test, expect } from "@playwright/test";

test("user can see persons list", async ({ page }) => {
  await page.goto("/"); // baseURL + "/"

  // Assert something from your React UI that depends on backend data
  await expect(page.getByText("Arto Hellas")).toBeVisible();
});
