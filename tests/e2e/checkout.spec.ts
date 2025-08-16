import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage'; // Make sure this file exists at ../../pages/ProductsPage.ts
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Flow', () => {
  test('Verify ringkasan harga di checkout overview', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // 1. Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Tambah beberapa produk (misal index 0 dan 1)
    await productsPage.addProducts([0, 1]);

    // 3. Ke cart → checkout
    await productsPage.goToCart();
    await page.click('[data-test="checkout"]');

    // 4. Isi form data checkout
    await page.fill('[data-test="firstName"]', 'Gagas');
    await page.fill('[data-test="lastName"]', 'Prast');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    // 5. Ambil semua harga produk di overview
    const itemPrices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = itemPrices.map(p => parseFloat(p.replace('$', '')));
    const sumItemPrices = numericPrices.reduce((a, b) => a + b, 0);

    // 6. Ambil Item Total, Tax, dan Total yang ditampilkan di UI
    const itemTotalText = await page.locator('.summary_subtotal_label').textContent();
    const taxText = await page.locator('.summary_tax_label').textContent();
    const totalText = await page.locator('.summary_total_label').textContent();

    const itemTotal = parseFloat(itemTotalText!.replace('Item total: $', ''));
    const tax = parseFloat(taxText!.replace('Tax: $', ''));
    const total = parseFloat(totalText!.replace('Total: $', ''));

    // 7. Verifikasi
    expect(itemTotal).toBeCloseTo(sumItemPrices, 2);
    expect(total).toBeCloseTo(itemTotal + tax, 2);
  });
  
  test('Checkout sukses dengan data lengkap', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // 1. Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Tambah produk ke cart
    await productsPage.addFirstProductToCart();

    // 3. Masuk cart dan checkout
    await productsPage.goToCart();
    await page.click('[data-test="checkout"]');

    // 4. Isi form data lengkap
    await page.fill('[data-test="firstName"]', 'Gagas');
    await page.fill('[data-test="lastName"]', 'Prast');
    await page.fill('[data-test="postalCode"]', '12345');

    // 5. Lanjut & Finish
    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');

    // 6. Verifikasi pesan sukses
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('Checkout gagal jika form kosong', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // 1. Login valid
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Tambah produk
    await productsPage.addFirstProductToCart();

    // 3. Masuk cart → checkout
    await productsPage.goToCart();
    await page.click('[data-test="checkout"]');

    // 4. Biarkan field kosong, langsung klik Continue
    await page.click('[data-test="continue"]');

    // 5. Verifikasi error message muncul
    await expect(page.locator('[data-test="error"]'))
      .toHaveText('Error: First Name is required');
  });
});
