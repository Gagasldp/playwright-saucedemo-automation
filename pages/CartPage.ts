import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async getCartItems() {
    return this.page.locator('.cart_item');
  }

  async removeItem(productName: string) {
    await this.page.click(`[data-test="remove-${productName}"]`);
  }

  async checkout() {
    await this.page.click('[data-test="checkout"]');
  }
}
