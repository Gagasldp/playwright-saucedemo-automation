import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Sort Product Feature', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);

    // Login sebelum setiap test
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.verifyPageLoaded();
  });

  test('Sort by Name (A to Z)', async () => {
    await productsPage.sortBy('Name (A to Z)');
  });

  test('Sort by Name (Z to A)', async () => {
    await productsPage.sortBy('Name (Z to A)');
  });

  test('Sort by price low to high', async () => {
    await productsPage.sortBy('Price (low to high)');
  });

  test('Sort by price high to low', async () => {
    await productsPage.sortBy('Price (high to low)');
  });

});
