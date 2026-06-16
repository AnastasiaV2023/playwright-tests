/**
 * Тесты страницы входа
 * https://practice.expandtesting.com/login
 * 
 * Сценарии тестов:
 * - Позитивные: Успешный вход с валидными учётными данными
 * - Негативные: Неверный логин, неверный пароль, пустые поля
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { TEST_CREDENTIALS } from '../config/test-data';

let loginPage: LoginPage;

test.describe('Тесты страницы входа', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('Успешный вход с валидными учётными данными', async ({ page }) => {
    await loginPage.assertOnLoginPage();
    await loginPage.login(
      TEST_CREDENTIALS.VALID_USERNAME,
      TEST_CREDENTIALS.VALID_PASSWORD
    );
    await expect(page).toHaveURL(/.*\/secure/);
    await expect(loginPage.successMessage).toContainText('You logged into a secure area!');
    await expect(loginPage.logoutLink).toBeVisible();
  });

  test('Вход с невалидным логином и валидным паролем', async ({ page }) => {
    await loginPage.assertOnLoginPage();
    await loginPage.login('wrongUser', TEST_CREDENTIALS.VALID_PASSWORD);
    await expect(loginPage.errorMessage).toContainText('password is invalid');
    await expect(page).not.toHaveURL(/.*\/secure/);
    await expect(loginPage.usernameInput).toBeVisible();
  });

  test('Вход с пустыми полями логина и пароля', async ({ page }) => {
    await loginPage.assertOnLoginPage();
    await loginPage.clickLoginButton();
    await expect(loginPage.errorMessage).toContainText('username');
    await expect(page).not.toHaveURL(/.*\/secure/);
    await expect(loginPage.usernameInput).toBeVisible();
  });

  test('Вход с валидным логином и невалидным паролем', async ({ page }) => {
    await loginPage.assertOnLoginPage();
    await loginPage.login(TEST_CREDENTIALS.VALID_USERNAME, 'WrongPassword');
    await expect(loginPage.errorMessage).toContainText('password is invalid');
    await expect(page).not.toHaveURL(/.*\/secure/);
    await expect(loginPage.usernameInput).toBeVisible();
  });
});
