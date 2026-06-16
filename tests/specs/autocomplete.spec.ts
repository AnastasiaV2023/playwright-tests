/**
 * Тесты страницы автозаполнения
 * https://practice.expandtesting.com/autocomplete
 * 
 * Сценарии тестов:
 * - Поиск страны «Canada» через поле автозаполнения
 * - Выбор предложенного варианта из выпадающего списка
 * - Проверка, что выбранное значение отобразилось в поле
 */
import { test, expect } from '@playwright/test';
import { AutocompletePage } from '../pages/autocomplete-page';
import { AUTOCOMPLETE_TEST_DATA } from '../config/test-data';

let autocompletePage: AutocompletePage;

test.describe('Тесты страницы автозаполнения', () => {
  test.beforeEach(async ({ page }) => {
    autocompletePage = new AutocompletePage(page);
    await autocompletePage.open();
  });

  test('Поиск страны «Canada» через поле автозаполнения и выбор из выпадающего списка', async () => {
    await autocompletePage.searchAndSelectCountry(
      AUTOCOMPLETE_TEST_DATA.SEARCH_TERM,
      AUTOCOMPLETE_TEST_DATA.EXPECTED_RESULT
    );

    await autocompletePage.assertInputValue(AUTOCOMPLETE_TEST_DATA.EXPECTED_RESULT);
  });

  test('Проверка, что выбранное значение отобразилось в поле', async () => {
    await autocompletePage.searchAndSelectCountry(
      AUTOCOMPLETE_TEST_DATA.SEARCH_TERM,
      AUTOCOMPLETE_TEST_DATA.EXPECTED_RESULT
    );

    const inputValue = await autocompletePage.getInputValue();
    expect(inputValue).toBe(AUTOCOMPLETE_TEST_DATA.EXPECTED_RESULT);
  });
});