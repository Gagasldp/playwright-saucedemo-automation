import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test('Add product, logout, login again -> cart should be empty', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  // STEP 1: Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // STEP 2: Tambah produk ke 1 ke keranjang
  await productsPage.addProducts([0]); 
  await expect(productsPage.cartBadge).toHaveText('1');

  // STEP 3: Logout
  await productsPage.logout();

  // STEP 4: Login ulang
  await loginPage.login('standard_user', 'secret_sauce');

  // STEP 5: Verifikasi keranjang kosong
  await expect(productsPage.cartBadge).toHaveCount(0); 
});
