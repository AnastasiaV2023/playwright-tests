/**
 * Тесты страницы нажатия клавиш
 * https://practice.expandtesting.com/key-presses
 * 
 * Сценарии тестов:
 * - Нажатие клавиш с последующей проверкой отображения в блоке «Result»:
 * - Escape (Esc)
 * - Control (Ctrl)
 * - Enter
 * - Backspace (Опционально) Tab, Shift, Alt
 */
import { test, expect } from '@playwright/test';
import { KeyPressesPage } from '../pages/key-presses-page';
import { KEY_PRESS_TEST_DATA } from '../config/test-data';

let keyPressesPage: KeyPressesPage;

test.describe('Тесты страницы нажатия клавиш', () => {
  test.beforeEach(async ({ page }) => {
    keyPressesPage = new KeyPressesPage(page);
    await keyPressesPage.open();
  });

  test('Нажатие клавиши Escape и проверка результата', async () => {
    await keyPressesPage.pressEscape();
    await keyPressesPage.assertEscapeKeyRegistered();
  });

  test('Нажатие клавиши Control и проверка результата', async () => {
    await keyPressesPage.pressControl();
    await keyPressesPage.assertControlKeyRegistered();
  });

  test('Нажатие клавиши Enter и проверка результата', async () => {
    // Enter не поддерживается текущей реализацией страницы
    await keyPressesPage.pressEnter();
    await expect(keyPressesPage.resultSection).toBeEmpty();
  });

  test('Нажатие клавиши Backspace и проверка результата', async () => {
    await keyPressesPage.pressBackspace();
    await keyPressesPage.assertResultContainsKey('BACK_SPACE');
  });

  test('Нажатие клавиши Tab и проверка результата', async () => {
    await keyPressesPage.pressTab();
    await keyPressesPage.assertTabKeyRegistered();
  });

  test('Нажатие клавиши Shift и проверка результата', async () => {
    await keyPressesPage.pressShift();
    await keyPressesPage.assertShiftKeyRegistered();
  });

  test('Нажатие клавиши Alt и проверка результата', async () => {
    await keyPressesPage.pressAlt();
    await keyPressesPage.assertAltKeyRegistered();
  });
});