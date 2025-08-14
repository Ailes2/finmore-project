import { test, expect } from '@playwright/test';

test('Test the Hello World text', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');
  const startButton = page.getByRole('button', { name: 'Start' });
  const text = page.locator('#finish');

  await expect(startButton).toBeVisible();
  await startButton.click();
  await expect(text).toBeVisible({ timeout: 20000 });
  await expect(text).toHaveText('Hello World!');

  //додаю якісь зміни для пуша в гіт лаб

  //
  ///
  ///
});
