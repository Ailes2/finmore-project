import { expect, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToHomePage() {
    await this.page.goto('https://finmore.netlify.app');
  }

  async assertTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async assertUrl(expectedUrl: string) {
    await expect(this.page).toHaveURL(expectedUrl);
  }
}
