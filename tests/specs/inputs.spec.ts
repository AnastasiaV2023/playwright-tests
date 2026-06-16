/**
 * Тесты страницы ввода данных
 * https://practice.expandtesting.com/inputs
 * 
 * Сценарии тестов:
 * - Заполнение всех полей формы различными типами данных
 * - Проверка отображения введенных данных в блоке «Output»
 * - Очистка всех полей после заполнения
 */
import { test, expect } from '@playwright/test';
import { InputsPage } from '../pages/inputs-page';
import { INPUT_TEST_DATA } from '../config/test-data';

let inputsPage: InputsPage;

test.describe('Тесты страницы ввода данных', () => {
  test.beforeEach(async ({ page }) => {
    inputsPage = new InputsPage(page);
    await inputsPage.open();
  });

  test('Заполнение всех полей формы различными типами данных и проверка вывода', async () => {
    const testData = {
      text: INPUT_TEST_DATA.TEXT,
      number: INPUT_TEST_DATA.NUMBER
    };

    await inputsPage.fillAllFields(testData);
    await inputsPage.assertOutputsMatchExpected(testData);
  });

  test('Очистка всех полей после заполнения', async () => {
    const testData = {
      text: INPUT_TEST_DATA.TEXT,
      number: INPUT_TEST_DATA.NUMBER
    };

    await inputsPage.fillAllFields(testData);
    await inputsPage.clearAllFields();
    await inputsPage.assertAllInputsCleared();
  });

});