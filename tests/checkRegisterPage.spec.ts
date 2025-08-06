import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { UniversalMetods } from '../Utils/UniversalMetods';

test('Check registration page', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goToHomePage();
  await homePage.assertTitle('Повнофункціональний фінансовий менеджер');

  const registrationPage = new RegistrationPage(page);
  const loginPage = new LoginPage(page);
  const unic = new UniversalMetods(page);

  await loginPage.noHaveAccount();

  await expect(registrationPage.registerPage).toBeVisible();
  await registrationPage.checkFullRegistrationForm();

  await unic.safeFill(registrationPage.name, 'Kim Chen In', 'Name field');
  await unic.safeFill(registrationPage.email, 'forexemple@mail.com', 'email field');
  await unic.safeFill(registrationPage.password, '1234567', 'password field');
  await unic.safeFill(registrationPage.confirmPassword, '1234567', 'confirm field');
  await unic.safeClick(registrationPage.submitButton, 'Submit button');
  await unic.safeVisible(loginPage.sideBar);
});
