/**
 * Страница восстановления пароля - Объект страницы
 * https://practice.expandtesting.com/forgot-password
 */
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class ForgotPasswordPage extends BasePage {
  readonly path = '/forgot-password';

  // Локаторы
  readonly emailInput: Locator = this.page.locator('#email');
  readonly submitButton: Locator = this.page.locator('button[type="submit"]');
  readonly message: Locator = this.page.locator('#message');
  readonly emailError: Locator = this.page.locator('.invalid-feedback');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Переход на страницу восстановления пароля
   */
  async open(): Promise<void> {
    await this.navigateTo(this.path);
  }

  /**
   * Ввод email
   */
  async enterEmail(email: string): Promise<void> {
    await this.fillInput(this.emailInput, email);
  }

  /**
   * Нажатие кнопки отправки
   */
  async clickSubmitButton(): Promise<void> {
    await this.clickElement(this.submitButton);
  }

  /**
   * Отправка email для сброса пароля
   */
  async submitEmail(email: string): Promise<void> {
    await this.enterEmail(email);
    await this.clickSubmitButton();
  }

  /**
   * Получение значения поля ввода email
   */
  async getEmailValue(): Promise<string> {
    return await this.emailInput.inputValue();
  }

  /**
   * Получение текста сообщения
   */
  async getMessage(): Promise<string> {
    const text = await this.getTextContent(this.message);
    return text?.trim() || '';
  }

  /**
   * Проверка видимости ошибки email
   */
  async isEmailErrorVisible(): Promise<boolean> {
    return await this.emailError.isVisible();
  }

  /**
   * Получение текста ошибки email
   */
  async getEmailError(): Promise<string> {
    const text = await this.getTextContent(this.emailError);
    return text?.trim() || '';
  }

  /**
   * Проверка валидности email с использованием HTML5 валидации
   */
  async isEmailValid(): Promise<boolean> {
    return await this.emailInput.evaluate((el) => (el as HTMLInputElement).checkValidity());
  }

  /**
   * Получение сообщения валидации email
   */
  async getEmailValidationMessage(): Promise<string> {
    return await this.emailInput.evaluate((el) => (el as HTMLInputElement).validationMessage);
  }

  /**
   * Проверка видимости сообщения об успехе
   */
  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.message.isVisible();
  }

  /**
   * Проверка наличия ошибки в поле email
   */
  async hasEmailError(): Promise<boolean> {
    return await this.emailError.isVisible();
  }

  // Утверждения

  /**
   * Проверка видимости поля ввода email
   */
  async assertEmailInputVisible(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
  }

  /**
   * Проверка видимости кнопки отправки
   */
  async assertSubmitButtonVisible(): Promise<void> {
    await expect(this.submitButton).toBeVisible();
  }

  /**
   * Проверка, что сообщение об успехе содержит ожидаемый текст
   */
  async assertSuccessMessageContains(expectedText: string): Promise<void> {
    await expect(this.message).toContainText(expectedText);
  }

  /**
   * Проверка, что ошибка email содержит ожидаемый текст
   */
  async assertEmailErrorContains(expectedText: string): Promise<void> {
    await expect(this.emailError).toContainText(expectedText);
  }

  /**
   * Проверка, что поле email имеет правильный тип
   */
  async assertEmailInputType(): Promise<void> {
    const type = await this.emailInput.getAttribute('type');
    expect(type).toBe('email');
  }
}