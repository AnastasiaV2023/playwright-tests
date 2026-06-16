/**
 * Тесты страницы восстановления пароля
 * https://practice.expandtesting.com/forgot-password
 * 
 * Сценарии тестов:
 * - Валидация поля ввода email (не менее 4 сценариев)
 */
import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../pages/forgot-password-page';
import { EMAIL_TEST_DATA } from '../config/test-data';

let forgotPasswordPage: ForgotPasswordPage;

test.describe('Тесты страницы восстановления пароля', () => {
  test.beforeEach(async ({ page }) => {
    forgotPasswordPage = new ForgotPasswordPage(page);
    await forgotPasswordPage.open();
  });

  test('Валидация email без символа @', async () => {
    const invalidEmail = EMAIL_TEST_DATA.INVALID[0].email;
    await forgotPasswordPage.submitEmail(invalidEmail);
    await forgotPasswordPage.assertEmailErrorContains('valid email');
  });

  test('Валидация email без локальной части', async () => {
    const invalidEmail = EMAIL_TEST_DATA.INVALID[1].email;
    await forgotPasswordPage.submitEmail(invalidEmail);
    await forgotPasswordPage.assertEmailErrorContains('valid email');
  });

  test('Валидация email с пробелами', async () => {
    const invalidEmail = EMAIL_TEST_DATA.INVALID[2].email;
    await forgotPasswordPage.submitEmail(invalidEmail);
    await forgotPasswordPage.assertEmailErrorContains('valid email');
  });

  test('Валидация email без домена', async () => {
    const invalidEmail = EMAIL_TEST_DATA.INVALID[3].email;
    await forgotPasswordPage.submitEmail(invalidEmail);
    await forgotPasswordPage.assertEmailErrorContains('valid email');
  });
});
