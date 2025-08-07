import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { UniversalMetods } from '../Utils/UniversalMetods';

test('Register and login in new account', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goToHomePage();
  await homePage.assertTitle('Повнофункціональний фінансовий менеджер');

  const registrationPage = new RegistrationPage(page);
  const loginPage = new LoginPage(page);
  const unic = new UniversalMetods(page);

  await loginPage.noHaveAccount();

  await expect(registrationPage.registerPage).toBeVisible();
  await registrationPage.checkFullRegistrationForm();

  const name = 'Kim Chen In';
  const email = 'forexemple@mail.com';
  const password = '1234567';

  await registrationPage.createAccount(name, email, password, password);

  console.log(
    'Успішно залогінився під данними: електронна почта' + email + ' та пароль ' + password,
  );

  const userMenu = page.getByTestId('user-menu-trigger');
  const logout = page.getByTestId('logout-button');

  await unic.safeClick(userMenu);
  await unic.safeClick(logout);
  await unic.safeClick(registrationPage.switchToLoginButton);

  console.log('Починаю авторизацію під тими ж данними');

  await loginPage.authorization(email, password);
  console.log('Успішено авторизувався в аккаунт');
});
