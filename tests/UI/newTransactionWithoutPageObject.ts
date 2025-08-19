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

    const expenseButton = page.getByTestId('expense-type-button');
    const incomeButton = page.getByTestId('income-type-button');
    const amountInput = page.getByTestId('transaction-amount-input');
    const transactionCategorySelect = page.getByTestId('transaction-category-select');
    const descriptionInput = page.getByTestId('transaction-description-input');
    const dateInput = page.getByTestId('transaction-date-input');
    const transactionAccountSelect = page.getByTestId('transaction-account-select');
    const tagInput = page.getByTestId('new-tag-input');
    const submitButton = page.getByTestId('transaction-form-submit');
    const cancelButton = page.getByTestId('transaction-form-cancel');

    await unic.safeVisible(buttonNewTransaction);
    await unic.Screenshot(testInfo, 'We are loggined in account');
    await unic.safeClick(buttonNewTransaction);
    await unic.safeVisible(transactionFormTitle);
    await unic.Screenshot(testInfo, 'Transaction form is opened');

    await unic.safeFill(amountInput, '150');
    await transactionCategorySelect.selectOption('Транспорт');
    await unic.safeFill(descriptionInput, 'Якийсь опис транзакції');
    await unic.safeFill(dateInput, '2025-08-18');
    await transactionAccountSelect.selectOption('Картка Монобанку');
    await unic.safeFill(tagInput, 'New tag');
    await unic.Screenshot(testInfo, 'Transaction form after data entry');
    await unic.safeClick(submitButton);
    await unic.safeVisible(buttonNewTransaction);
    await unic.Screenshot(testInfo, 'Created new transaction');
  });
});
