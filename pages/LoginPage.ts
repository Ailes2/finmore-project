import { Page, Locator, expect } from '@playwright/test';
import { UniversalMetods } from '../Utils/UniversalMetods';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly emailIcon: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly loginTitle: Locator;
  readonly subTitle: Locator;
  readonly toggleIcon: Locator;
  readonly registrationButton: Locator;
  readonly noAccountText: Locator;
  readonly icon: Locator;
  readonly unic: UniversalMetods;
  readonly userMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.unic = new UniversalMetods(page);
    this.emailInput = page.getByTestId('login-email-input');
    this.emailIcon = page.locator('svg.lucide-mail');
    this.passwordInput = page.getByTestId('login-password-input');
    this.submitButton = page.getByTestId('login-submit-button');
    this.icon = page.locator('svg.lucide-log-in');
    this.loginTitle = page.getByTestId('login-title');
    this.subTitle = page.getByText('Увійдіть до свого облікового запису', { exact: true });
    this.toggleIcon = page.getByTestId('toggle-password-visibility');
    this.registrationButton = page.getByTestId('switch-to-register-button');
    this.noAccountText = page.locator('p:has-text("Немає облікового запису?")');
    this.userMenu = page.getByTestId('user-menu-trigger');
  }

  async checkCentralBlock() {
    await this.unic.safeVisible(this.icon);
    await this.unic.safeVisible(this.loginTitle);
    await expect(this.loginTitle).toHaveValue('Вхід до системи');
    await this.unic.safeVisible(this.subTitle);
    await expect(this.subTitle).toHaveValue('Увійдіть до свого облікового запису');
  }

  async checkEmailField() {
    await this.unic.safeVisible(this.emailInput);
    await this.unic.safeToHaveAttribute(this.emailInput, 'placeholder', 'your@email.com');
    await this.checkEmailIcon();
  }

  async checkPasswordField() {
    await this.unic.safeVisible(this.passwordInput);
    await this.unic.safeToHaveAttribute(this.passwordInput, 'placeholder', 'Введіть пароль');
    await this.checkPasswordIcon();
    await this.checkToggleIcon();
  }

  async checkEmailIcon() {
    await this.unic.safeVisible(this.emailIcon);
    await this.unic.safeToHaveAttribute(this.emailIcon, 'width', '24');
    await this.unic.safeToHaveAttribute(this.emailIcon, 'height', '24');
    await this.unic.safeToHaveAttribute(this.emailIcon, 'stroke', 'currentColor');
    await expect(this.emailIcon).toHaveClass(/lucide-mail/);
  }

  async checkToggleIcon() {
    await this.unic.safeVisible(this.toggleIcon);
    await this.unic.safeToHaveAttribute(this.toggleIcon, 'width', '24');
    await this.unic.safeToHaveAttribute(this.toggleIcon, 'height', '24');
    await this.unic.safeToHaveAttribute(this.toggleIcon, 'stroke', 'currentColor');
    await expect(this.toggleIcon).toHaveClass(/lucide-eye/);
  }

  async checkPasswordIcon() {
    await this.unic.safeVisible(this.toggleIcon);
    await this.unic.safeToHaveAttribute(this.toggleIcon, 'width', '24');
    await this.unic.safeToHaveAttribute(this.toggleIcon, 'height', '24');
    await this.unic.safeToHaveAttribute(this.toggleIcon, 'stroke', 'currentColor');
    await expect(this.toggleIcon).toHaveClass(/lucide-lock/);
  }

  async checkSubmitButton() {
    await this.unic.safeVisible(this.submitButton);
    await expect(this.submitButton).toHaveValue('Увійти');
  }

  async authorization() {
    await this.checkEmailField();
    await this.checkPasswordField();

    //надалі перенести в окремий файл
    await this.unic.safeFill(this.emailInput, 'qwerty@mail.com');
    await this.unic.safeFill(this.passwordInput, '123456789');
    await this.checkSubmitButton();
    await this.unic.safeClick(this.submitButton);
    await this.unic.safeVisible(this.userMenu);
  }
}
