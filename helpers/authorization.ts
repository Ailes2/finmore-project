import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { HomePage } from '../pages/HomePage';

export async function authorization(
  page: Page,
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  currency: string,
) {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const registrationPage = new RegistrationPage(page);

  await homePage.goToHomePage();
  await loginPage.noHaveAccount();
  await registrationPage.createAccount(name, email, password, confirmPassword, currency);
}
