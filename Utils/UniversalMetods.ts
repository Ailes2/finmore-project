import { expect, Page, Locator, TestInfo } from '@playwright/test';

export class UniversalMetods {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async safeVisible(locator: Locator, description = 'element') {
    const desc = this.locatorHaveString(description, locator);
    try {
      await expect(locator).toBeVisible();
    } catch (error) {
      throw new Error(`${desc} is not visible: ${error}`);
    }
  }

  async safeClick(locator: Locator, description = 'element') {
    const desc = this.locatorHaveString(description, locator);
    try {
      await this.safeVisible(locator, desc);
      await locator.click();
    } catch (error) {
      throw new Error(`Failed to click on ${desc}: ${error}`);
    }
  }

  async safeFill(locator: Locator, value: string, description = 'input') {
    const desc = this.locatorHaveString(description, locator);
    try {
      await this.safeVisible(locator, desc);
      await locator.fill(value);
      await expect(locator).toHaveValue(value);
    } catch (error) {
      throw new Error(`Failed to fill ${desc} with value "${value}": ${error}`);
    }
  }

  async safeHidden(locator: Locator) {
    await expect(locator).toBeHidden();
  }

  async getText(locator: Locator): Promise<string> {
    await this.safeVisible(locator);
    const text = await locator.textContent();
    return text?.trim() || '';
  }

  async Screenshot(testInfo: TestInfo, name?: string) {
    const screenshot = await this.page.screenshot({ fullPage: true });

    const titleParts = testInfo.titlePath;
    const attachName = name || titleParts[titleParts.length - 1] || 'screenshot';

    await testInfo.attach(attachName, {
      body: screenshot,
      contentType: 'image/png',
    });
  }

  async safeToHaveAttribute(
    locator: Locator,
    param: string,
    value: string,
    description = 'Element',
  ) {
    const desc = this.locatorHaveString(description, locator);
    try {
      await this.safeVisible(locator, desc);
      await expect(locator).toHaveAttribute(param, value);
    } catch (error) {
      throw new Error(
        `${desc} does not have expected attribute "${param}" with value "${value}": ${error}`,
      );
    }
  }

  private locatorHaveString(description: string, locator: Locator) {
    const trimmed = description.trim();
    return trimmed.length > 0 ? trimmed : locator.toString();
  }
}
