export const randomUsers = [
  {
    name: 'valid user',
    email: 'qwerty@mail.com',
    password: '123456789',
    valid: true,
  },
  {
    name: 'admin user',
    email: 'admin@company.com',
    password: 'AdminPass123!',
    valid: false,
  },
  {
    name: 'empty email',
    email: '',
    password: 'somepassword',
    valid: false,
  },
  {
    name: 'empty password',
    email: 'user@domain.com',
    password: '',
    valid: false,
  },
  {
    name: 'invalid email format',
    email: 'not-an-email',
    password: '12345678',
    valid: false,
  },
  {
    name: 'wrong credentials',
    email: 'unknown@mail.com',
    password: 'wrongpassword',
    valid: false,
  },
  {
    name: 'long email',
    email: 'verylongemailaddress' + 'x'.repeat(100) + '@test.com',
    password: 'pass123',
    valid: false,
  },
  {
    name: 'sql injection attempt',
    email: `' OR 1=1 --`,
    password: `' OR 'a'='a`,
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
