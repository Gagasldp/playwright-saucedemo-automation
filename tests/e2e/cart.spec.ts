import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Add to Cart Feature', () => {

  test('Tambah 1 produk ke keranjang', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Login Dulu
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    // Verifikasi halaman produk sudah terbuka
    await productsPage.verifyPageLoaded();
    // Tambahkan produk pertama ke keranjang
    await productsPage.addFirstProductToCart();
  })

  test('Verifikasi jumlah produk di keranjang', async ({page}) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Login dulu
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Tambahkan produk ke keranjang
    await productsPage.addFirstProductToCart();

    //verifikasi jumlah produk di keranjang
    await expect(productsPage.cartBadge).toBeVisible();
    expect(await productsPage.getCartCount()).toBe(1);
  })

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

  test('Tambah 2 produk dan hapus 1 produk', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Login dulu
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Tambahkan produk index 0 dan 2 (misal produk ke-1 dan ke-3)
    await productsPage.addProducts([0, 1]);

    // Verifikasi jumlah cart = 2
    await expect(productsPage.cartBadge).toBeVisible();
    expect(await productsPage.getCartCount()).toBe(2);

    // Hapus 1 produk dari keranjang
    await productsPage.removeProducts([0]);
    await productsPage.verifyCartBadge(1);
  });
});
