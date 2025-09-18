import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Product Image Visibility', () => {
  test('should display product images on products page after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Navigate to login page and login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify products page is loaded
    await productsPage.verifyPageLoaded();

    // Verify product images are visible
    await productsPage.verifyProductImagesVisible();
  });
});
