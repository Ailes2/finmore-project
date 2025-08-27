import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('UI checks for Login page', () => {
  test('should display all main elements on login page', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goToHomePage();

    await loginPage.checkCentralBlock();
    await loginPage.checkEmailField();
    await loginPage.checkPasswordField();
    await loginPage.checkSubmitButton();
    await loginPage.noHaveAccount();
  });
});
