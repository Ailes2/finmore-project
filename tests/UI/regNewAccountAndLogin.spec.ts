import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { LoginPage } from '../../pages/LoginPage';
import { UniversalMetods } from '../../Utils/UniversalMetods';
import { randomUsers } from '../../Utils/Credentials';

test.describe('Registration and login by credentials', () => {
  for (const user of randomUsers) {
    test(`Registration and login with: ${user.name}`, async ({ page }) => {
      const registrationPage = new RegistrationPage(page);
      const loginPage = new LoginPage(page);
      const unic = new UniversalMetods(page);
      const homePage = new HomePage(page);

      await test.step('Open the home page', async () => {
        await homePage.goToHomePage();
        await homePage.assertTitle('Повнофункціональний фінансовий менеджер');
        const homeScreenshot = await page.screenshot({ fullPage: true });
        await test.info().attach(`Open home page ${user.name}`, {
          body: homeScreenshot,
          contentType: 'image/png',
        });
      });

      await test.step('Go to registration form', async () => {
        await loginPage.noHaveAccount();
      });

      try {
        await test.step('Registration new user by credentials', async () => {
          await registrationPage.createAccount(
            user.name,
            user.email,
            user.password,
            user.password,
            user.currency,
          );
          const registrationScreenshot = await page.screenshot({ fullPage: true });
          await test.info().attach(`Registration ${user.name}`, {
            body: registrationScreenshot,
            contentType: 'image/png',
          });
        });

        if (user.valid) {
          await test.step('Logout', async () => {
            await unic.safeClick(page.getByTestId('user-menu-trigger'));
            await unic.safeClick(page.getByTestId('logout-button'));
            const logoutScreenshot = await page.screenshot({ fullPage: true });
            await test.info().attach(`Logout ${user.name}`, {
              body: logoutScreenshot,
              contentType: 'image/png',
            });
          });

          await test.step('Go to login form and log in', async () => {
            await unic.safeClick(registrationPage.switchToLoginButton);
          });

          await test.step('Log in with credentials', async () => {
            await loginPage.authorization(user.email, user.password);
            const loginScreenshot = await page.screenshot({ fullPage: true });
            await test.info().attach(`Login with new credentials: ${user.name}`, {
              body: loginScreenshot,
              contentType: 'image/png',
            });
          });
        }
      } catch (error) {
        if (!user.valid) {
          console.log(`Тест очікуванно не пройшов по кейсу: ${user.name}`);
        } else {
          throw error;
        }
      }
    });
  }
});
