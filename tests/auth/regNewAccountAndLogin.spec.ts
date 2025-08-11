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

      // await test.info().attach('User Data', {
      //   body: JSON.stringify(user, null, 2),
      //   contentType: 'application/json',
      // });

      await test.step('Відкриваю головну сторінку', async () => {
        await homePage.goToHomePage();
        await homePage.assertTitle('Повнофункціональний фінансовий менеджер');
        const homeScreenshot = await page.screenshot({ fullPage: true });
        await test.info().attach(`Open home page ${user.name}`, {
          body: homeScreenshot,
          contentType: 'image/png',
        });
      });

      await test.step('Перехід у форму реєстрації', async () => {
        await loginPage.noHaveAccount();
      });

      try {
        await test.step('Реєстрація нового користувача', async () => {
          await registrationPage.createAccount(user.name, user.email, user.password, user.password);
          const registrationScreenshot = await page.screenshot({ fullPage: true });
          await test.info().attach(`Registration ${user.name}`, {
            body: registrationScreenshot,
            contentType: 'image/png',
          });
        });

        if (user.valid) {
          await test.step('Вихід з акаунта', async () => {
            await unic.safeClick(page.getByTestId('user-menu-trigger'));
            await unic.safeClick(page.getByTestId('logout-button'));
            const logoutScreenshot = await page.screenshot({ fullPage: true });
            await test.info().attach(`Logout ${user.name}`, {
              body: logoutScreenshot,
              contentType: 'image/png',
            });
          });

          await test.step('Перехід у форму логіну', async () => {
            await unic.safeClick(registrationPage.switchToLoginButton);
          });

          await test.step('Авторизація зареєстрованого користувача', async () => {
            await loginPage.authorization(user.email, user.password);
            // await expect(page.getByText(`Вітаю, ${user.name}`)).toBeVisible();
            const loginScreenshot = await page.screenshot({ fullPage: true });
            await test.info().attach(`Login with new credentials: ${user.name}`, {
              body: loginScreenshot,
              contentType: 'image/png',
            });
          });
        }
      } catch (error) {
        await test.info().attach('Error message', {
          body: String(error),
          contentType: 'text/plain',
        });
        throw error;
      }
    });
  }
});
