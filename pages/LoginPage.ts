import { Page, Locator, expect } from '@playwright/test';
import { UniversalMetods } from '../Utils/UniversalMetods';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly emailIcon: Locator;
  readonly passwordInput: Locator;
  readonly passwordIcon: Locator;
  readonly submitButton: Locator;
  readonly loginTitle: Locator;
  readonly subTitle: Locator;
  readonly toggleIcon: Locator;
  readonly registrationButton: Locator;
  readonly noAccountText: Locator;
  readonly icon: Locator;
  readonly unic: UniversalMetods;
  readonly sideBar: Locator;
  readonly loginError: Locator;
  readonly registrationForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.unic = new UniversalMetods(page);
    this.emailInput = page.getByTestId('login-email-input');
    this.emailIcon = page.locator('svg.lucide-mail');
    this.passwordInput = page.getByTestId('login-password-input');
    this.passwordIcon = page.locator('svg.lucide-lock');
    this.submitButton = page.getByTestId('login-submit-button');
    this.icon = page.locator('svg.lucide-log-in');
    this.loginTitle = page.getByTestId('login-title');
    this.subTitle = page.getByText('Увійдіть до свого облікового запису', { exact: true });
    this.toggleIcon = page.locator('svg.lucide-eye');
    this.registrationButton = page.getByTestId('switch-to-register-button');
    this.noAccountText = page.locator('p:has-text("Немає облікового запису?")');
    this.sideBar = page.getByTestId('sidebar');
    this.loginError = page.getByTestId('login-error');
    this.registrationForm = page.getByTestId('register-form');
  }

  async checkCentralBlock() {
    await this.unic.safeVisible(this.icon);
    await this.unic.safeVisible(this.loginTitle);
    await expect(this.loginTitle).toHaveText('Вхід до системи');
    await this.unic.safeVisible(this.subTitle);
    await expect(this.subTitle).toHaveText('Увійдіть до свого облікового запису');
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
    await this.unic.safeVisible(this.passwordIcon);
    await this.unic.safeToHaveAttribute(this.passwordIcon, 'width', '24');
    await this.unic.safeToHaveAttribute(this.passwordIcon, 'height', '24');
    await this.unic.safeToHaveAttribute(this.passwordIcon, 'stroke', 'currentColor');
  }

  async checkSubmitButton() {
    await this.unic.safeVisible(this.submitButton);
    await expect(this.submitButton).toHaveText('Увійти');
  }

  async authorization(email: string, password: string) {
    await this.checkEmailField();
    await this.checkPasswordField();
    await this.unic.safeFill(this.emailInput, email);
    await this.unic.safeFill(this.passwordInput, password);
    await expect(this.emailInput).toHaveValue(email);
    await expect(this.passwordInput).toHaveValue(password);
    await this.checkSubmitButton();
    await this.unic.safeClick(this.submitButton);
    await this.unic.safeVisible(this.sideBar);
  }

  async errorMessage() {
    await this.unic.safeVisible(this.loginError);
    await expect(this.loginError).toContainText('Невірний email або пароль');
  }

  async noHaveAccount() {
    await this.unic.safeVisible(this.registrationButton);
    await this.unic.safeVisible(this.noAccountText);
    await this.unic.safeClick(this.registrationButton);
    await this.unic.safeVisible(this.registrationForm);
  }
}
