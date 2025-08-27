import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage';

test.describe('Registration negative flow', () => {
  test('should show error when passwords do not match', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.goToHomePage();

    await loginPage.noHaveAccount();

    await registrationPage.checkFormFields();
    await registrationPage.unic.safeFill(registrationPage.name, 'Test User');
    await registrationPage.unic.safeFill(registrationPage.email, 'mismatch@test.com');
    await registrationPage.unic.safeFill(registrationPage.password, 'password123');
    await registrationPage.unic.safeFill(registrationPage.confirmPassword, 'different123');
    await registrationPage.registerCurrencySelector.selectOption('USD');
    await registrationPage.unic.safeClick(registrationPage.submitButton);

    await registrationPage.unic.safeVisible(page.getByText(/Паролі не співпадають/i));
  });
});
