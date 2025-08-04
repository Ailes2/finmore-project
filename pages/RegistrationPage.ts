import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { UniversalMetods } from '../Utils/UniversalMetods';

export class RegistrationPage {
  readonly page: Page;
  readonly loginPage: LoginPage;
  readonly icon: Locator;
  readonly registerTitle: Locator;
  readonly subTitle: Locator;
  readonly name: Locator;
  readonly nameIcon: Locator;
  readonly email: Locator;
  readonly emailIcon: Locator;
  readonly password: Locator;
  readonly passwordIcon: Locator;
  readonly confirmPassword: Locator;
  readonly confirmPasswordIcon: Locator;
  readonly registerCurrency: Locator;
  readonly submitButton: Locator;
  readonly noAccountText: Locator;
  readonly switchToLoginButton: Locator;
  readonly unic: UniversalMetods;
  readonly toggle: Locator;
  readonly toggleConfirm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.icon = page.locator('svg.lucide-user-plus');
    this.registerTitle = page.getByTestId('register-title');
    this.subTitle = page.getByText('Створіть новий обліковий запис', { exact: true });
    this.name = page.getByTestId('register-name-input');
    this.nameIcon = page.locator('svg.lucide-user');
    this.email = page.getByTestId('register-email-input');
    this.emailIcon = page.locator('svg.lucide-mail');
    this.password = page.getByTestId('register-password-input');
    this.passwordIcon = page.locator('svg.lucide-lock').nth(0);
    this.toggle = page.getByTestId('toggle-password-visibility');
    this.confirmPassword = page.getByTestId('register-confirm-password-input');
    this.confirmPasswordIcon = page.locator('svg.lucide-lock').nth(1);
    this.toggleConfirm = page.getByTestId('toggle-confirm-password-visibility');
    this.registerCurrency = page.getByTestId('register-currency-select');
    this.submitButton = page.getByTestId('register-submit-button');
    this.noAccountText = page.locator('p:has-text("Немає облікового запису?")');
    this.switchToLoginButton = page.getByTestId('switch-to-login-button');
    this.unic = new UniversalMetods(page);
  }

  async checkCentralblock() {
    await this.unic.safeVisible(this.icon);
    await this.unic.safeVisible(this.registerTitle);
    await this.unic.safeVisible(this.subTitle);
  }

  async checkNameField() {
    await this.unic.safeVisible(this.name);
    await this.unic.safeToHaveAttribute(this.name, 'placeholder', 'Іван Петренко');
    await this.checkNameIcon();
  }

  async checkNameIcon() {
    await this.unic.safeVisible(this.nameIcon);
    await this.unic.safeToHaveAttribute(this.nameIcon, 'width', '24');
    await this.unic.safeToHaveAttribute(this.nameIcon, 'height', '24');
    await this.unic.safeToHaveAttribute(this.nameIcon, 'stroke', 'currentColor');
    await expect(this.nameIcon).toHaveClass(/lucide-user/);
  }

  async checkEmailField() {
    await this.unic.safeVisible(this.email);
    await this.unic.safeToHaveAttribute(this.email, 'placeholder', 'your@email.com');
    await this.checkEmailIcon();
  }

  async checkEmailIcon() {
    await this.unic.safeVisible(this.emailIcon);
    await this.unic.safeToHaveAttribute(this.emailIcon, 'width', '24');
    await this.unic.safeToHaveAttribute(this.emailIcon, 'height', '24');
    await this.unic.safeToHaveAttribute(this.emailIcon, 'stroke', 'currentColor');
    await expect(this.emailIcon).toHaveClass(/lucide-mail/);
  }

  async checkPasswordField() {
    await this.unic.safeVisible(this.password);
    await this.unic.safeToHaveAttribute(this.password, 'placeholder', 'Мінімум 6 символів');
    await this.checkPasswordIcon();
  }

  async checkPasswordIcon() {
    await this.unic.safeVisible(this.passwordIcon);
    await this.unic.safeToHaveAttribute(this.passwordIcon, 'width', '24');
    await this.unic.safeToHaveAttribute(this.passwordIcon, 'height', '24');
    await this.unic.safeToHaveAttribute(this.passwordIcon, 'stroke', 'currentColor');
    await expect(this.passwordIcon).toHaveClass(/lucide-lock/);
  }

  async checkConfirmPasswordField() {
    await this.unic.safeVisible(this.confirmPassword);
    await this.unic.safeToHaveAttribute(this.confirmPassword, 'placeholder', 'Повторіть пароль');
    await this.checkConfirmPasswordIcon();
  }

  async checkConfirmPasswordIcon() {
    await this.unic.safeVisible(this.confirmPasswordIcon);
    await this.unic.safeToHaveAttribute(this.confirmPasswordIcon, 'width', '24');
    await this.unic.safeToHaveAttribute(this.confirmPasswordIcon, 'height', '24');
    await this.unic.safeToHaveAttribute(this.confirmPasswordIcon, 'stroke', 'currentColor');
    await expect(this.confirmPasswordIcon).toHaveClass(/lucide-lock/);
  }

  async checkSwitchToRegistration() {
    await this.unic.safeVisible(this.switchToLoginButton);
    await expect(this.switchToLoginButton).toHaveText('Зареєструватися');
    await this.unic.safeVisible(this.noAccountText);
  }

  async checkFormFields() {
    await this.checkNameField();
    await this.checkEmailField();
    await this.checkPasswordField();
    await this.checkConfirmPasswordField();
  }
}
