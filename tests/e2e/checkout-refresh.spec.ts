import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Refresh Feature', () => {
    test('User melakukan refresh halaman checkout', async ({page}) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const checkoutPage = new CheckoutPage(page);

        
        // Login
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await productsPage.verifyPageLoaded();
        await productsPage.addFirstProductToCart();
        await expect(productsPage.cartBadge).toHaveText('1');

        // Buka halaman checkout
        await productsPage.goToCart();
        await page.click('[data-test=checkout]');
        
        // isi form checkout
        await checkoutPage.fillInformation('Gagas', 'Prastyo', '12345');
        await checkoutPage.continueCheckout();
        await expect(page).toHaveURL(/.*checkout-step-two/);

        // Refresh halaman checkout
        await page.reload();
        await expect(page).toHaveURL(/.*checkout-step-two/);
    });

});