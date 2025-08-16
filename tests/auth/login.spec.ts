import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Login Feature', () => {
  test('Login sukses dengan kredensial valid', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Halaman produk muncul setelah login sukses', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.verifyPageLoaded();
  });

  test('Login gagal - password salah', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'wrongpass');
    await expect(await loginPage.getErrorMessage()).toHaveText(/Username and password do not match/);
  });
  test('Login invalid - username kosong', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', 'secret_sauce');
    await expect(await loginPage.getErrorMessage()).toBeVisible();
  })
  test('Login invalid - password kosong', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', '');
    await expect(await loginPage.getErrorMessage()).toBeVisible();
  })

  test('Login invalid - username dan password kosong', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');
    await expect(await loginPage.getErrorMessage()).toBeVisible();
  });

  
});

