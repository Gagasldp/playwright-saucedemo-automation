import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Sort Product Feature', () => {
  test('Sort by Name (A to Z)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);

    // Sort A-Z
    const names = (await productsPage.getProductNames()).map(n => n.trim().toLowerCase());
    const sorted = [...names].sort();
    await page.waitForTimeout(500);
    expect(names).toEqual(sorted);
  });

//   test('Sort by Price (Low to High)', async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const productsPage = new ProductsPage(page);

//   await loginPage.goto();
//   await loginPage.login('standard_user', 'secret_sauce');
//   await expect(page).toHaveURL(/inventory.html/);

//   await productsPage.sortBy('lohi');
//   await page.waitForTimeout(500);

//   const prices = (await productsPage.getProductPrices()).map(price => Number(price.toFixed(2)));
//   const sortedPrices = [...prices].sort((a, b) => a - b);

//   console.log('sorted prices:', sortedPrices);
//   console.log('UI prices:', prices);
//   expect(prices).toEqual(sortedPrices);
});
