// import { test } from '@playwright/test';
// import { UniversalMetods } from '../../Utils/UniversalMetods';

// test.describe('Check iframe for payment on Rozetka', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('https://rozetka.com.ua');
//   });

//   test('Add item to basket and check payment iframe', async ({ page }) => {
//     const unic = new UniversalMetods(page);
//     const addItemToBasket = page.locator('button.button');
//     const makeAnOrderButton = page.locator('.rz-checkout-button');
//     const searchField = page.locator('input[name="search"]');

//     await searchField.waitFor({ state: 'visible', timeout: 10000 });
//     await unic.safeFill(searchField, 'Кабель RZTK HDMI - HDMI 4K v. 2.0 1.8 м Black');
//     await searchField.press('Enter');

//     await unic.safeVisible(addItemToBasket);

//     // await unic.safeClick(makeAnOrderButton);
//     // await page.waitForLoadState('networkidle');

//     // const paymentFrame = page.frameLocator(
//     //   'iframe#trz-iframe-8b0bd2d5-3ba1-478d-b955-ba64e9f19fd4',
//     // );

//     // await paymentFrame.locator('input#cardNumber"]').fill('1234 5678 9012 3456');
//   });
// });
