/**
 * Страница входа - Объект страницы
 * https://practice.expandtesting.com/login
 */
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  readonly path = '/login';

  // Локаторы
  readonly usernameInput: Locator = this.page.locator('#username');
  readonly passwordInput: Locator = this.page.locator('#password');
  readonly loginButton: Locator = this.page.locator('button[type="submit"]');
  readonly errorMessage: Locator = this.page.locator('#flash');
  readonly successMessage: Locator = this.page.locator('#flash.alert-success, div.alert-success');
  readonly logoutLink: Locator = this.page.locator('a[href="/logout"], button:has-text("Logout")');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Переход на страницу входа
   */
  async open(): Promise<void> {
    await this.navigateTo(this.path);
  }

  /**
   * Ввод имени пользователя
   */
  async enterUsername(username: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
  }

  /**
   * Ввод пароля
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillInput(this.passwordInput, password);
  }

  /**
   * Нажатие кнопки входа
   */
  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  /**
   * Выполнение входа с учётными данными
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Получение текста сообщения об ошибке
   */
  async getErrorMessage(): Promise<string> {
    const text = await this.getTextContent(this.errorMessage);
    return text?.trim() || '';
  }

  /**
   * Получение текста сообщения об успехе
   */
  async getSuccessMessage(): Promise<string> {
    const text = await this.getTextContent(this.successMessage);
    return text?.trim() || '';
  }

  /**
   * Проверка, выполнен ли вход (видно сообщение об успехе или ссылка выхода)
   */
  async isLoggedIn(): Promise<boolean> {
    return await this.successMessage.isVisible() || await this.logoutLink.isVisible();
  }

  /**
   * Проверка видимости формы входа
   */
  async isLoginFormVisible(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }

  // Утверждения

  /**
   * Проверка, что сообщение об ошибке содержит ожидаемый текст
   */
  async assertErrorMessageContains(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedText);
  }

  /**
   * Проверка успешного входа
   */
  async assertLoginSuccess(): Promise<void> {
    await expect(this.logoutLink).toBeVisible();
  }

  /**
   * Проверка загрузки страницы входа
   */
  async assertOnLoginPage(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Проверка, что оба поля ввода пустые
   */
  async assertInputsAreEmpty(): Promise<void> {
    await expect(this.usernameInput).toHaveValue('');
    await expect(this.passwordInput).toHaveValue('');
  }

  /**
   * Проверка, что кнопка входа отключена
   */
  async assertLoginButtonIsDisabled(): Promise<void> {
    await expect(this.loginButton).toBeDisabled();
  }
}