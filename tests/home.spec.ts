import { test, expect } from "@playwright/test";

test("home page loads and displays products", async ({ page }) => {
  await page.goto("/");

  // look for the exact h1 tag in product listing page
  await expect(page.getByRole("heading", { name: /our products/i })).toBeVisible();

  // verify at least one product card loaded on the screen
  await expect(page.getByTestId("product-link").first()).toBeVisible();
});