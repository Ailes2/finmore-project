import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login negative flow', () => {
  test('should show error message with invalid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goToHomePage();

    await loginPage.authorization('wrong@mail.com', 'wrongpass', false);
    await loginPage.errorMessage();
  });
});
