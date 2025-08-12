import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async getTitle() {
    return this.page.locator('.title');
  }

  async sortProducts(optionValue: string) {
    await this.page.selectOption('[data-test="product_sort_container"]', optionValue);
  }

  async viewProduct(name: string) {
    await this.page.click(`text=${name}`);
  }

  async addToCart(productName: string) {
    await this.page.click(`[data-test="add-to-cart-${productName}"]`);
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }
}
