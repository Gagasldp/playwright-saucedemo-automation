import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Validate Add/Remove Button Text and Cart Update', () => {
  test('should change button text from "Add to cart" to "Remove" after clicking add button and update cart badge', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify products page loaded
    await productsPage.verifyPageLoaded();

    // Get the first product's add/remove button
    const firstButton = productsPage.addToCartButtons.first();

    // Verify initial button text is "Add to cart"
    await expect(firstButton).toHaveText(/add to cart/i);

    // Click the add button
    await firstButton.click();

    // Verify button text changes to "Remove"
    await expect(firstButton).toHaveText(/remove/i);

    // Verify cart badge shows 1
    await productsPage.verifyCartBadge(1);

    // Optionally, click remove button and verify text changes back to "Add to cart"
    await firstButton.click();
    await expect(firstButton).toHaveText(/add to cart/i);
    // Verify cart badge is not visible or zero
    if (await productsPage.cartBadge.isVisible()) {
      expect(await productsPage.getCartCount()).toBe(0);
    } else {
      expect(await productsPage.getCartCount()).toBe(0);
    }
  });
});
