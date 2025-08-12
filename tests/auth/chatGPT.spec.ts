// import { test, expect } from '@playwright/test';

// test('Go to wikipedia', async ({ page }) => {
//   await page.goto('https://www.wikipedia.org/');
//   const searchField = page.locator('#searchInput');
//   await expect(searchField).toBeVisible();
//   await searchField.fill('Playwright');
//   await expect(searchField).toHaveValue('Playwright');
//   const searchButton = page.locator('button.pure-button.pure-button-primary-progressive');
//   await expect(searchButton).toBeVisible();
//   await searchButton.click();

//   const searchTitle = page.locator('div.searchresults');
//   await expect(searchTitle).toBeVisible();
//   await expect(searchTitle).toContainText('Playwright');
// });
