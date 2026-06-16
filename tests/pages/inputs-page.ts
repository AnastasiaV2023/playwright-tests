/**
 * Страница ввода данных - Объект страницы
 * https://practice.expandtesting.com/inputs
 */
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class InputsPage extends BasePage {
  readonly path = '/inputs';

  // Локаторы полей ввода - используются только доступные элементы
  readonly textInput: Locator = this.page.locator('#input-text');
  readonly numberInput: Locator = this.page.locator('#input-number');

  // Локаторы полей вывода
  readonly textOutput: Locator = this.page.locator('#output-text');
  readonly numberOutput: Locator = this.page.locator('#output-number');

  // Кнопка отправки
  readonly submitButton: Locator = this.page.locator('#btn-display-inputs');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Переход на страницу ввода данных
   */
  async open(): Promise<void> {
    await this.navigateTo(this.path);
  }

  /**
   * Ввод текста в текстовое поле
   */
  async enterText(value: string): Promise<void> {
    await this.fillInput(this.textInput, value);
  }

  /**
   * Ввод числа в числовое поле
   */
  async enterNumber(value: string): Promise<void> {
    await this.fillInput(this.numberInput, value);
  }

  /**
   * Заполнение доступных полей ввода тестовыми данными
   */
  async fillAllFields(data: {
    text: string;
    number: string;
  }): Promise<void> {
    await this.enterText(data.text);
    await this.enterNumber(data.number);
  }

  /**
   * Нажатие кнопки отправки для отображения вывода
   */
  async submitForm(): Promise<void> {
    await this.clickElement(this.submitButton);
  }

  /**
   * Очистка всех доступных полей ввода
   */
  async clearAllFields(): Promise<void> {
    await this.textInput.clear();
    await this.numberInput.clear();
  }

  /**
   * Получение всех доступных значений вывода
   */
  async getAllOutputs(): Promise<Record<string, string>> {
    return {
      text: (await this.textOutput.textContent()) || '',
      number: (await this.numberOutput.textContent()) || ''
    };
  }

  // Утверждения

  /**
   * Проверка видимости доступных полей ввода
   */
  async assertAllInputsVisible(): Promise<void> {
    await expect(this.textInput).toBeVisible();
    await expect(this.numberInput).toBeVisible();
  }

  /**
   * Проверка, что поле ввода содержит ожидаемое значение
   */
  async assertInputValue(locator: Locator, expectedValue: string): Promise<void> {
    await expect(locator).toHaveValue(expectedValue);
  }

  /**
   * Проверка, что вывод содержит ожидаемое значение
   */
  async assertOutputContains(locator: Locator, expectedValue: string): Promise<void> {
    await expect(locator).toContainText(expectedValue);
  }

  /**
   * Проверка, что поле ввода пустое
   */
  async assertInputIsEmpty(locator: Locator): Promise<void> {
    await expect(locator).toHaveValue('');
  }

  /**
   * Проверка, что все доступные поля ввода очищены
   */
  async assertAllInputsCleared(): Promise<void> {
    await this.assertInputIsEmpty(this.textInput);
    await this.assertInputIsEmpty(this.numberInput);
  }

  /**
   * Проверка, что вывод соответствует отправленным значениям
   */
  async assertOutputsMatchExpected(data: {
    text: string;
    number: string;
  }): Promise<void> {
    await this.submitForm();
    await expect(this.textOutput).toHaveText(data.text);
    await expect(this.numberOutput).toHaveText(data.number);
  }
}