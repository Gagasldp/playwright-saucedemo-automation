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
    this.addToCartButtons = page.locator('.inventory_item button'); // tombol add/remove
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
  }

  async getTitle() {
    return this.page.locator('.title');
  }

  async sortProducts(optionValue: string) {
    await this.page.selectOption('[data-test="product_sort_container"]', optionValue);
  }

  async viewProduct(name: string) {
    await this.page.click(`text=${name}`);
  }

  async addToCart(productId: string) {
    await this.page.click(`[data-test="add-to-cart-${productId}"]`);
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }
  async addProducts(indices: number[]) {
    for (const index of indices) {
      await this.addToCartButtons.nth(index).click();
    }
  }
  async getCartCount(): Promise<number> {
    const badge = await this.page.locator('.shopping_cart_badge');
    if (await badge.isVisible()) {
      const countText = await badge.textContent();
      return countText ? parseInt(countText, 10) : 0;
    }
    return 0;
  }
  async removeProducts(indexes: number[]) {
  for (const index of indexes) {
    await this.addToCartButtons.nth(index).click(); // klik lagi buat remove
    }
  }
  async sortBy(optionValue: string) {
  await expect(this.sortDropdown).toBeVisible({ timeout: 10000 });
  await this.sortDropdown.selectOption(optionValue);
  await expect(this.sortDropdown).toBeVisible();
  await this.sortDropdown.selectOption(optionValue);

}

async getProductNames(): Promise<string[]> {
  return await this.productNames.allTextContents();
}

async getProductPrices(): Promise<number[]> {
  const prices = await this.productPrices.allTextContents();
  return prices.map(price => parseFloat(price.replace('$', '')));
}
}
