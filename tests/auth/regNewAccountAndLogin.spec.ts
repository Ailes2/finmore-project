import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { LoginPage } from '../../pages/LoginPage';
import { UniversalMetods } from '../../Utils/UniversalMetods';
import { randomUsers } from '../../Utils/Credentials';

test.describe('Registration and login by credentionals', () => {
  for (const user of randomUsers) {
    test(`Registration and login with: ${user.name}`, async ({ page }) => {
      const registrationPage = new RegistrationPage(page);
      const loginPage = new LoginPage(page);
      const unic = new UniversalMetods(page);
      const homePage = new HomePage(page);
      await homePage.goToHomePage();
      await homePage.assertTitle('Повнофункціональний фінансовий менеджер');
      await loginPage.noHaveAccount(); //для переходу в форму регістрації

      try {
        await registrationPage.createAccount(user.name, user.email, user.password, user.password);
        console.log(`✅ Успішна регістрація по - ${user.name}`);

        if (user.valid) {
          const userMenu = page.getByTestId('user-menu-trigger');
          const logout = page.getByTestId('logout-button');

          await unic.safeClick(userMenu);
          await unic.safeClick(logout);
          await unic.safeClick(registrationPage.switchToLoginButton);

          console.log(`🔄 Починаю авторизацію під даними ${user.name}`);

          await loginPage.authorization(user.email, user.password);
          console.log(`✅ Успішно авторизувались під даними ${user.name}`);
        }
      } catch (error) {
        console.log(
          `❌ ${user.name} не вдалось зареєструватись під цими даними. По причині: ${error}`,
        );
      }
    });
  }
});
