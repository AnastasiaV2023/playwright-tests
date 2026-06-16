/**
 * Страница нажатия клавиш - Объект страницы
 * https://practice.expandtesting.com/key-presses
 */
import { Page, Locator, expect, Keyboard } from '@playwright/test';
import { BasePage } from './base-page';

export class KeyPressesPage extends BasePage {
  readonly path = '/key-presses';

  // Локаторы
  readonly inputField: Locator = this.page.locator('#target');
  readonly resultSection: Locator = this.page.locator('#result');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Переход на страницу нажатия клавиш
   */
  async open(): Promise<void> {
    await this.navigateTo(this.path);
  }

  /**
   * Клик по полю ввода для фокуса
   */
  async focusInputField(): Promise<void> {
    await this.clickElement(this.inputField);
  }

  /**
   * Нажатие конкретной клавиши
   */
  async pressKey(key: string): Promise<void> {
    await this.focusInputField();
    await this.inputField.press(key);
  }

  /**
   * Нажатие клавиши Escape
   */
  async pressEscape(): Promise<void> {
    await this.pressKey('Escape');
  }

  /**
   * Нажатие клавиши Control
   */
  async pressControl(): Promise<void> {
    await this.pressKey('Control');
  }

  /**
   * Нажатие клавиши Enter
   */
  async pressEnter(): Promise<void> {
    await this.pressKey('Enter');
  }

  /**
   * Нажатие клавиши Backspace
   */
  async pressBackspace(): Promise<void> {
    await this.pressKey('Backspace');
  }

  /**
   * Нажатие клавиши Tab
   */
  async pressTab(): Promise<void> {
    await this.pressKey('Tab');
  }

  /**
   * Нажатие клавиши Shift
   */
  async pressShift(): Promise<void> {
    await this.pressKey('Shift');
  }

  /**
   * Нажатие клавиши Alt
   */
  async pressAlt(): Promise<void> {
    await this.pressKey('Alt');
  }

  /**
   * Получение текста результата после нажатия клавиши
   */
  async getResultText(): Promise<string> {
    const text = await this.getTextContent(this.resultSection);
    return text?.trim() || '';
  }

  /**
   * Получение нажатой клавиши из результата
   */
  async getPressedKey(): Promise<string> {
    const result = await this.getResultText();
    // Извлечение имени клавиши из результата (формат: "You entered: KEY")
    const match = result.match(/You entered:\s*(.+)/i);
    return match ? match[1].trim() : '';
  }

  // Утверждения

  /**
   * Проверка видимости секции результата
   */
  async assertResultSectionVisible(): Promise<void> {
    await expect(this.resultSection).toBeVisible();
  }

  /**
   * Проверка видимости поля ввода
   */
  async assertInputFieldVisible(): Promise<void> {
    await expect(this.inputField).toBeVisible();
  }

  /**
   * Проверка, что результат содержит ожидаемую клавишу
   */
  async assertResultContainsKey(expectedKey: string): Promise<void> {
    await expect(this.resultSection).toContainText(`You entered: ${expectedKey}`, { ignoreCase: true });
  }

  /**
   * Проверка, что клавиша Escape была зарегистрирована
   */
  async assertEscapeKeyRegistered(): Promise<void> {
    await this.assertResultContainsKey('Escape');
  }

  /**
   * Проверка, что клавиша Control была зарегистрирована
   */
  async assertControlKeyRegistered(): Promise<void> {
    await this.assertResultContainsKey('Control');
  }

  /**
   * Проверка, что клавиша Enter была зарегистрирована
   */
  async assertEnterKeyRegistered(): Promise<void> {
    await this.assertResultContainsKey('Enter');
  }

  /**
   * Проверка, что клавиша Backspace была зарегистрирована
   */
  async assertBackspaceKeyRegistered(): Promise<void> {
    await this.assertResultContainsKey('Backspace');
  }

  /**
   * Проверка, что клавиша Tab была зарегистрирована
   */
  async assertTabKeyRegistered(): Promise<void> {
    await this.assertResultContainsKey('Tab');
  }

  /**
   * Проверка, что клавиша Shift была зарегистрирована
   */
  async assertShiftKeyRegistered(): Promise<void> {
    await this.assertResultContainsKey('Shift');
  }

  /**
   * Проверка, что клавиша Alt была зарегистрирована
   */
  async assertAltKeyRegistered(): Promise<void> {
    await this.assertResultContainsKey('Alt');
  }
}