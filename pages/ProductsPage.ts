import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.locator('.inventory_item button');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
  }

  /* ========== NAVIGATION & PAGE VERIFY ========== */
  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.page.locator('.title')).toHaveText('Products');
    await expect(this.page.locator('.inventory_list')).toBeVisible();
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }

  async viewProduct(name: string) {
    await this.page.click(`text=${name}`);
  }

  /* ========== LOGOUT ========== */
  async logout() {
    await this.page.locator('#react-burger-menu-btn').click();
    await this.page.locator('#logout_sidebar_link').click();
    await expect(this.page).toHaveURL(/saucedemo.com/);
    await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
  }

  /* ========== CART ACTIONS ========== */
  async addProducts(indices: number[]) {
    for (const index of indices) {
      await this.addToCartButtons.nth(index).click();
    }
  }

  async addFirstProductToCart() {
    await this.page.locator('.inventory_item').first().locator('button').click();
    await expect(this.cartBadge).toHaveText('1');
  }

  async removeProducts(indices: number[]) {
    for (const index of indices) {
      await this.addToCartButtons.nth(index).click();
    }
  }

  async verifyCartBadge(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const countText = await this.cartBadge.textContent();
      return countText ? parseInt(countText, 10) : 0;
    }
    return 0;
  }

  async sortBy(optionText: string) {
  // Pastikan sudah di halaman Products
  await expect(this.page).toHaveURL(/inventory.html/);
  await expect(this.page.locator('.title')).toHaveText('Products');

  // Tunggu dropdown muncul
  const dropdown = this.page.locator('[class="product_sort_container"]');
  await expect(dropdown).toBeVisible();

  const sortMap: Record<string, string> = {
    'Name (A to Z)': 'az',
    'Name (Z to A)': 'za',
    'Price (low to high)': 'lohi',
    'Price (high to low)': 'hilo'
  };

  await dropdown.selectOption(sortMap[optionText]);
}




  /* ========== GET PRODUCT DATA ========== */
  async getProductNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.productPrices.allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }
}
