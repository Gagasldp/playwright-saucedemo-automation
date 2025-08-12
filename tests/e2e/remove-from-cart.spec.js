import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Remove from Cart Feature', () => {
  test('Hapus produk dari keranjang', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Tambahkan 3 produk
    await productsPage.addProducts([0, 1, 2]);
    expect(await productsPage.getCartCount()).toBe(3);

    // Hapus produk index 1 (produk ke-2)
    await productsPage.removeProducts([1]);
    expect(await productsPage.getCartCount()).toBe(2);
  });
});
