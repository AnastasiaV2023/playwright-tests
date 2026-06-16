/**
 * Страница автозаполнения - Объект страницы
 * https://practice.expandtesting.com/autocomplete
 */
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class AutocompletePage extends BasePage {
  readonly path = '/autocomplete';

  // Локаторы
  readonly countryInput: Locator = this.page.locator('#country');
  readonly autocompleteDropdown: Locator = this.page.locator('#country').locator('..').locator('.autocomplete-items');
  readonly selectedValue: Locator = this.page.locator('#result');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Переход на страницу автозаполнения
   */
  async open(): Promise<void> {
    await this.navigateTo(this.path);
  }

  /**
   * Ввод поискового запроса в поле страны
   */
  async enterSearchTerm(term: string): Promise<void> {
    await this.fillInput(this.countryInput, term);
  }

  /**
   * Очистка поля страны
   */
  async clearSearchTerm(): Promise<void> {
    await this.countryInput.clear();
  }

  /**
   * Выбор страны из выпадающего списка
   */
  async selectCountryFromDropdown(countryName: string): Promise<void> {
    // Ожидание появления выпадающего списка
    await this.autocompleteDropdown.waitFor({ state: 'visible' });
    
    // Поиск и клик по соответствующему варианту
    const option = this.autocompleteDropdown.locator(`div:has-text("${countryName}")`).first();
    await option.click();
  }

  /**
   * Поиск и выбор страны
   */
  async searchAndSelectCountry(searchTerm: string, countryName: string): Promise<void> {
    await this.enterSearchTerm(searchTerm);
    await this.selectCountryFromDropdown(countryName);
  }

  /**
   * Получение текста выбранного значения
   */
  async getSelectedValue(): Promise<string> {
    const text = await this.getTextContent(this.selectedValue);
    return text?.trim() || '';
  }

  /**
   * Получение значения поля ввода
   */
  async getInputValue(): Promise<string> {
    return await this.countryInput.inputValue();
  }

  /**
   * Проверка видимости выпадающего списка
   */
  async isDropdownVisible(): Promise<boolean> {
    return await this.autocompleteDropdown.isVisible();
  }

  // Утверждения

  /**
   * Проверка видимости поля страны
   */
  async assertCountryInputVisible(): Promise<void> {
    await expect(this.countryInput).toBeVisible();
  }

  /**
   * Проверка видимости выпадающего списка
   */
  async assertDropdownVisible(): Promise<void> {
    await expect(this.autocompleteDropdown).toBeVisible();
  }

  /**
   * Проверка скрытости выпадающего списка
   */
  async assertDropdownHidden(): Promise<void> {
    await expect(this.autocompleteDropdown).toBeHidden();
  }

  /**
   * Проверка, что выбранное значение соответствует ожидаемому
   */
  async assertSelectedValue(expectedValue: string): Promise<void> {
    await expect(this.selectedValue).toHaveText(expectedValue);
  }

  /**
   * Проверка, что поле ввода содержит ожидаемое значение
   */
  async assertInputValue(expectedValue: string): Promise<void> {
    await expect(this.countryInput).toHaveValue(expectedValue);
  }

  /**
   * Проверка, что страна присутствует в вариантах выпадающего списка
   */
  async assertCountryInDropdown(countryName: string): Promise<void> {
    const option = this.autocompleteDropdown.locator(`div:has-text("${countryName}")`);
    await expect(option).toBeVisible();
  }

  /**
   * Проверка отсутствия вариантов в выпадающем списке
   */
  async assertNoOptionsInDropdown(): Promise<void> {
    const options = this.autocompleteDropdown.locator('div');
    const count = await options.count();
    expect(count).toBe(0);
  }
}