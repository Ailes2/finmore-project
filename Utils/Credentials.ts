export const randomUsers = [
  {
    name: 'valid user USD',
    email: 'qwerty@mail.com',
    password: '123456789',
    currency: 'USD',
    valid: true,
  },
  {
    name: 'admin user UAH',
    email: 'admin@company.com',
    password: 'AdminPass123!',
    currency: 'UAH',
    valid: true,
  },
  {
    name: 'empty email',
    email: '',
    password: 'somepassword',
    currency: 'UAH',
    valid: false,
  },
  {
    name: 'empty password',
    email: 'user@domain.com',
    password: '',
    currency: 'UAH',
    valid: false,
  },
  {
    name: 'invalid email format',
    email: 'not-an-email',
    password: '12345678',
    currency: 'UAH',
    valid: false,
  },
  {
    name: 'wrong credentials',
    email: 'unknown@mail.com',
    password: 'wrongpassword',
    currency: 'UAH',

    valid: false,
  },
  {
    name: 'long email EUR',
    email: 'verylongemailaddress' + 'x'.repeat(100) + '@test.com',
    password: 'pass123',
    currency: 'EUR',
    valid: true,
  },
  {
    name: 'sql injection attempt',
    email: `' OR 1=1 --`,
    password: `' OR 'a'='a`,
    currency: 'UAH',
    valid: false,
  },

  {
    name: 'wrong currency CNY',
    email: 'qwerty@mail.com',
    password: '123456789',
    currency: 'CNY',
    valid: false,
  },
];

// for (const user of validUsers) {
//   test(`успішний логін: ${user.email}`, async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await page.goto('/login');
//     await loginPage.fillEmail(user.email);
//     await loginPage.fillPassword(user.password);
//     await loginPage.clickLogin();

// треба ще вказати консоль лог щоб розуміти на якій ти строці
