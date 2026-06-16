/**
 * Тесты страницы чекбоксов
 * https://practice.expandtesting.com/checkboxes
 * 
 * Сценарии тестов:
 * - Активация (выбор) чекбокса
 * - Деактивация (снятие выбора) чекбокса
 * - Переключение состояния нескольких чекбоксов
 * - Проверка состояния чекбокса после перезагрузки страницы (сохраняется ли)
 */
import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../pages/checkboxes-page';

let checkboxesPage: CheckboxesPage;

test.describe('Тесты страницы чекбоксов', () => {
  test.beforeEach(async ({ page }) => {
    checkboxesPage = new CheckboxesPage(page);
    await checkboxesPage.open();
  });

  test('Активация чекбокса', async () => {
    await checkboxesPage.check1();
    await checkboxesPage.assertCheckbox1IsChecked();
  });

  test('Деактивация чекбокса', async () => {
    await checkboxesPage.check1();
    await checkboxesPage.uncheck1();
    await checkboxesPage.assertCheckbox1IsNotChecked();
  });

  test('Переключение состояния нескольких чекбоксов', async () => {
    await checkboxesPage.toggle1();
    await checkboxesPage.check2();
    
    await checkboxesPage.assertCheckbox1IsChecked();
    await checkboxesPage.assertCheckbox2IsChecked();
  });

  test('Проверка состояния чекбокса после перезагрузки страницы', async ({ page }) => {
    await checkboxesPage.check1();
    await checkboxesPage.assertCheckbox1IsChecked();

    await page.reload({ waitUntil: 'domcontentloaded' });
    await checkboxesPage.assertCheckbox1IsNotChecked();
  });
});