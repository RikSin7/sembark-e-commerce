import { test, expect } from "@playwright/test";

test.describe("Cart Page functionality", () => {

    test("displays the empty cart UI when no items are present", async ({ page }) => {
        await page.goto("/cart");
        await expect(page.getByRole("heading", { name: /your cart is empty/i })).toBeVisible();
        await expect(page.getByTestId("start-shopping-btn")).toBeVisible();
    });

    test("successfully clears all items from the cart", async ({ page }) => {
        // Add an item to the cart
        await page.goto("/");
        await page.getByTestId("product-link").first().click();
        await expect(page).toHaveURL(/\/product\/\d+/);

        await page.getByRole("button", { name: /add to cart/i }).click();
        await expect(page.getByRole("button", { name: /add another/i })).toBeVisible();

        //  Navigate to the Cart
        await page.goto("/cart");
        await expect(page.getByText("Order Summary")).toBeVisible();

        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain("You have awesome items");
            await dialog.accept();
        });
        await page.getByRole("button", { name: /clear cart/i }).click();

        // Verify the cart returned to the empty state
        await expect(page.getByRole("heading", { name: /your cart is empty/i })).toBeVisible();
    });
});