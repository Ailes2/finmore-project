import { expect, Locator, Page } from '@playwright/test';

export class ChatGPTLogin {
  readonly page: Page;
  readonly login: Locator;
  readonly password: Locator;
  readonly buttonLogin;

  constructor(page: Page) {
    this.page = page;
    this.login = page.locator('якийсь селектор');
    this.password = page.locator('якийсь селектор');
    this.buttonLogin = page.locator('якийсь селектор');
  }

  async CheckLoginField() {
    await expect(this.login).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.buttonLogin).toBeVisible();
  }
}
