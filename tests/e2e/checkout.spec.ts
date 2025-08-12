import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage'; // Make sure this file exists at ../../pages/ProductsPage.ts
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Flow', () => {
  test('End-to-End checkout sukses', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const titleLocator = await productsPage.getTitle();
    await expect(await titleLocator.textContent()).toBe('Products');

    // Tambah barang ke cart
    await productsPage.addToCart('sauce-labs-backpack'); // ID produk diambil dari attribute
    await productsPage.goToCart();

    // Cek isi cart
    const cartItems = await cartPage.getCartItems();
    await expect(cartItems).toHaveCount(1);
    await cartPage.checkout();

    // Isi informasi checkout
    await checkoutPage.fillInformation('Gagas', 'Prastyo', '12345');
    await checkoutPage.continueCheckout();

    // Selesaikan pembelian
    await checkoutPage.finishCheckout();
     await expect(checkoutPage.getSuccessMessage()).toHaveText(/Thank you for your order!/i); //ignore case sensitive
  });
});
