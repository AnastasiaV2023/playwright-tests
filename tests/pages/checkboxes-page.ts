/**
 * Страница чекбоксов - Объект страницы
 * https://practice.expandtesting.com/checkboxes
 */
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class CheckboxesPage extends BasePage {
  readonly path = '/checkboxes';

  // Локаторы чекбоксов
  readonly checkbox1: Locator = this.page.locator('#checkbox1');
  readonly checkbox2: Locator = this.page.locator('#checkbox2');

  // Массив всех чекбоксов для итерации
  readonly allCheckboxes: Locator[] = [
    this.checkbox1,
    this.checkbox2
  ];

  constructor(page: Page) {
    super(page);
  }

  /**
   * Переход на страницу чекбоксов
   */
  async open(): Promise<void> {
    await this.navigateTo(this.path);
  }

  /**
   * Выбор конкретного чекбокса
   */
  async checkCheckbox(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    if (!(await locator.isChecked())) {
      await locator.check();
    }
  }

  /**
   * Снятие выбора с конкретного чекбокса
   */
  async uncheckCheckbox(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    if (await locator.isChecked()) {
      await locator.uncheck();
    }
  }

  /**
   * Переключение состояния чекбокса
   */
  async toggleCheckbox(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Выбор чекбокса 1
   */
  async check1(): Promise<void> {
    await this.checkCheckbox(this.checkbox1);
  }

  /**
   * Выбор чекбокса 2
   */
  async check2(): Promise<void> {
    await this.checkCheckbox(this.checkbox2);
  }

  /**
   * Снятие выбора с чекбокса 1
   */
  async uncheck1(): Promise<void> {
    await this.uncheckCheckbox(this.checkbox1);
  }

  /**
   * Снятие выбора с чекбокса 2
   */
  async uncheck2(): Promise<void> {
    await this.uncheckCheckbox(this.checkbox2);
  }

  /**
   * Переключение чекбокса 1
   */
  async toggle1(): Promise<void> {
    await this.toggleCheckbox(this.checkbox1);
  }

  /**
   * Переключение чекбокса 2
   */
  async toggle2(): Promise<void> {
    await this.toggleCheckbox(this.checkbox2);
  }

  /**
   * Проверка, выбран ли чекбокс
   */
  async isChecked(locator: Locator): Promise<boolean> {
    await locator.waitFor({ state: 'visible' });
    return await locator.isChecked();
  }

  /**
   * Получение состояния чекбокса 1
   */
  async isCheckbox1Checked(): Promise<boolean> {
    return await this.isChecked(this.checkbox1);
  }

  /**
   * Получение состояния чекбокса 2
   */
  async isCheckbox2Checked(): Promise<boolean> {
    return await this.isChecked(this.checkbox2);
  }

  /**
   * Выбор всех чекбоксов
   */
  async checkAll(): Promise<void> {
    for (const checkbox of this.allCheckboxes) {
      await this.checkCheckbox(checkbox);
    }
  }

  /**
   * Снятие выбора со всех чекбоксов
   */
  async uncheckAll(): Promise<void> {
    for (const checkbox of this.allCheckboxes) {
      await this.uncheckCheckbox(checkbox);
    }
  }

  /**
   * Получение состояний всех чекбоксов
   */
  async getAllCheckboxStates(): Promise<boolean[]> {
    const states: boolean[] = [];
    for (const checkbox of this.allCheckboxes) {
      states.push(await this.isChecked(checkbox));
    }
    return states;
  }

  // Утверждения

  /**
   * Проверка, что чекбокс выбран
   */
  async assertIsChecked(locator: Locator): Promise<void> {
    await expect(locator).toBeChecked();
  }

  /**
   * Проверка, что чекбокс не выбран
   */
  async assertIsNotChecked(locator: Locator): Promise<void> {
    await expect(locator).not.toBeChecked();
  }

  /**
   * Проверка, что чекбокс 1 выбран
   */
  async assertCheckbox1IsChecked(): Promise<void> {
    await this.assertIsChecked(this.checkbox1);
  }

  /**
   * Проверка, что чекбокс 1 не выбран
   */
  async assertCheckbox1IsNotChecked(): Promise<void> {
    await this.assertIsNotChecked(this.checkbox1);
  }

  /**
   * Проверка, что чекбокс 2 выбран
   */
  async assertCheckbox2IsChecked(): Promise<void> {
    await this.assertIsChecked(this.checkbox2);
  }

  /**
   * Проверка, что чекбокс 2 не выбран
   */
  async assertCheckbox2IsNotChecked(): Promise<void> {
    await this.assertIsNotChecked(this.checkbox2);
  }

  /**
   * Проверка, что состояние конкретного чекбокса соответствует ожидаемому
   */
  async assertCheckboxState(locator: Locator, expectedChecked: boolean): Promise<void> {
    if (expectedChecked) {
      await this.assertIsChecked(locator);
    } else {
      await this.assertIsNotChecked(locator);
    }
  }
}