import { test, expect } from "@playwright/test";

test("adds product to cart from details page and verifies cart state", async ({ page }) => {
    // start at home and navigate to details
    await page.goto("/");
    await page.getByTestId("product-link").first().click();
    await expect(page).toHaveURL(/\/product\/\d+/);

    // find and click the add to cart button
    const addToCartButton = page.getByRole("button", { name: /add to cart/i });
    await addToCartButton.click();

    // verify the changed text for add to cart button => Add Another...
    await expect(page.getByRole("button", { name: /add another/i })).toBeVisible();

    // navigate to cart
    await page.goto("/cart");

    // verify global cart state: The Order Summary should exist
    await expect(page.getByText("Order Summary")).toBeVisible();
});