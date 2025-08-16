import { test, expect } from '@playwright/test';

test('Akses halaman produk tanpa login akan redirect ke login', async ({ page }) => {
  // Langsung buka halaman produk
  await page.goto('https://www.saucedemo.com/inventory.html');
  // Pastikan URL yang terbuka adalah halaman login
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  // Pastikan tombol login terlihat
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
