import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Add to Cart Feature', () => {
  test('Tambah beberapa produk ke keranjang', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Login dulu
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Tambahkan produk index 0 dan 2 (misal produk ke-1 dan ke-3)
    await productsPage.addProducts([0, 2]);

    // Verifikasi jumlah cart = 2
    await expect(productsPage.cartBadge).toBeVisible();
    expect(await productsPage.getCartCount()).toBe(2);
  });
});
