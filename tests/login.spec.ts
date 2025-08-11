import test, { expect } from '@playwright/test';

test.describe('Login tests', () => {
  test('should display login page', async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.waitForSelector('[placeholder="Username"]', { timeout: 10000 });
  });

  test('should login successfully', async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);
  });

  test('should fail login with wrong password', async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Epic sadface')).toBeVisible();
  });
});
