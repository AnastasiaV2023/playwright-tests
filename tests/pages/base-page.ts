/**
 * Базовый класс страницы с общей функциональностью
 */
import { Page, Locator, expect } from '@playwright/test';
import { BASE_URL } from '../config/test-data';

export abstract class BasePage {
  protected page: Page;
  protected baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = BASE_URL;
  }

  /**
   * Переход по указанному пути
   */
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(`${this.baseUrl}${path}`, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  /**
   * Ожидание полной загрузки страницы
   */
  async waitForPageLoad(): Promise<void> {
    // Простое ожидание стабилизации страницы
    await this.page.waitForTimeout(1000);
  }

  /**
   * Получение заголовка страницы
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Проверка видимости элемента
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Клик по элементу с ожиданием
   */
  async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Заполнение поля ввода
   */
  async fillInput(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  /**
   * Очистка и заполнение поля ввода
   */
  async clearAndFill(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(value);
  }

  /**
   * Получение текстового содержимого элемента
   */
  async getTextContent(locator: Locator): Promise<string | null> {
    await locator.waitFor({ state: 'visible' });
    return await locator.textContent();
  }

  /**
   * Проверка, что элемент содержит ожидаемый текст
   */
  async assertTextContent(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  /**
   * Проверка видимости элемента
   */
  async assertVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Проверка скрытости элемента
   */
  async assertHidden(locator: Locator): Promise<void> {
    await expect(locator).toBeHidden();
  }

  /**
   * Создание скриншота
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}