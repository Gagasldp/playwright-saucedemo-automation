import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Validate Product Prices Currency', () => {
  test('should display all product prices in $ currency format', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Navigate to login page and login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify products page is loaded
    await productsPage.verifyPageLoaded();

    // Get all product price texts
    const priceTexts = await productsPage.productPrices.allTextContents();

    // Assert each price text starts with '$' and follows currency format (e.g., $29.99)
    for (const priceText of priceTexts) {
      expect(priceText).toMatch(/^\$\d+\.\d{2}$/);
    }

    // Additionally, verify prices can be parsed as valid numbers using existing method
    const prices = await productsPage.getProductPrices();
    expect(prices.length).toBeGreaterThan(0);
    for (const price of prices) {
      expect(typeof price).toBe('number');
      expect(price).toBeGreaterThan(0);
    }
  });
});
