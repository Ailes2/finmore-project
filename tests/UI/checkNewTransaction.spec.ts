import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { UniversalMetods } from '../../Utils/UniversalMetods';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Create user', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);
    const loginPage = new LoginPage(page);

    await homePage.goToHomePage();
    await homePage.assertTitle('Повнофункціональний фінансовий менеджер');
    await loginPage.noHaveAccount();
    await registrationPage.createAccount(
      'New User',
      'newsemail@gmail.com',
      '123456789',
      '123456789',
      'UAH',
    );
  });

  test('Create new transaction', async ({ page }, testInfo) => {
    const unic = new UniversalMetods(page);
    const buttonNewTransaction = page.getByTestId('add-transaction-button');
    const transactionFormTitle = page.getByTestId('transaction-form-title');

    await unic.safeVisible(buttonNewTransaction);
    await unic.Screenshot(testInfo, 'We are loggined in account');
    await unic.safeVisible(buttonNewTransaction);
    await unic.safeClick(buttonNewTransaction);
    await unic.safeVisible(transactionFormTitle);
    await unic.Screenshot(testInfo, 'Transaction form is opened');
  });
});
