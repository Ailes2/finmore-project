import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage';

test.describe('Navigation between forms', () => {
  test('should switch from registration back to login', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.goToHomePage();

    // з логіну переходимо на реєстрацію
    await loginPage.noHaveAccount();
    await registrationPage.checkFullRegistrationForm();

    // клікаємо "вже маєте обліковий запис?"
    await registrationPage.unic.safeClick(registrationPage.switchToLoginButton);

    // перевірка що знову логін форма
    await loginPage.checkCentralBlock();
  });
});
