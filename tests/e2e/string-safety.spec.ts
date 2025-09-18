import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CheckoutPage } from '../../pages/CheckoutPage';


test.describe('String safety tests', () => {
    test('should handle special characters in input fields', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const checkoutPage = new CheckoutPage(page);
        
        await page.goto('https://saucedemo.com/');
        
        // Login
        await loginPage.login('standard_user', 'secret_sauce');
        await productsPage.verifyPageLoaded();

        /// Add product to cart
        await productsPage.addFirstProductToCart();

        // Get into cart
        await productsPage.goToCart();
        await page.click('[data-test=checkout]');

        // fill checkout information with special char
        await checkoutPage.fillInformation('!@#$%&*jhasdgjasbj', 'asgfdhggasjhdg', '1234');
        await checkoutPage.continueCheckout();
        await checkoutPage.finishCheckout();

        // Uncoment bellow lines to verify err message
        // Verify that the character is not allowed to be entered
        // await expect(page.locator('[data-test="error"]'))
    //   .toHaveText('Error: First character must be a Letter');

        // Verify success message
        await expect(checkoutPage.getSuccessMessage()).toBeVisible();
    });
});