import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { randomUsers } from '../../Utils/Credentials';
import { UniversalMetods } from '../../Utils/UniversalMetods';

// треба подумати. Бо на цьому сайті не зберігаються аккаунти в бд, а тільки в кукі і тому неможна перевірити логін на сайті

// test.describe('Go to login page', () => {
//   test.beforeEach(async ({ page }) => {
//     const homePage = new HomePage(page);
//     await homePage.goToHomePage();
//     await homePage.assertTitle('Повнофункціональний фінансовий менеджер');
//   });

//   randomUsers.forEach((user) => {
//     test(`Check authorization with ${user.name}`, async ({ page }) => {
//       const loginPage = new LoginPage(page);
//       const unic = new UniversalMetods(page);
//       const logoValidAuthorization = page.getByTestId('sidebar');

//       await loginPage.authorization(user.email, user.password);

//       if (user.valid) {
//         await logoValidAuthorization.waitFor({ state: 'visible', timeout: 10000 });
//         await unic.safeVisible(logoValidAuthorization);
//         console.log(`${user.name} - успішно залогінився`);
//       } else {
//         await loginPage.errorMessage();
//       }
//     });
//   });
// });
