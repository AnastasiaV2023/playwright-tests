/**
 * Базовая конфигурация и константы для тестов
 */
export const BASE_URL = 'https://practice.expandtesting.com';
export const TEST_TIMEOUT = 30000;

/**
 * Тестовые учётные данные для страницы входа
 * Эти учётные данные отображаются на самой странице входа
 */
export const TEST_CREDENTIALS = {
  VALID_USERNAME: 'practice',
  VALID_PASSWORD: 'SuperSecretPassword!'
} as const;

/**
 * Тестовые данные для валидации email
 */
export const EMAIL_TEST_DATA = {
  VALID: [
    'test@example.com',
    'user.name@domain.org',
    'user+tag@domain.co.uk'
  ],
  INVALID: [
    { email: 'invalid', description: 'without @ symbol' },
    { email: '@nodomain.com', description: 'without local part' },
    { email: 'spaces in@email.com', description: 'with spaces' },
    { email: 'missing@.com', description: 'without domain' }
  ]
} as const;

/**
 * Тестовые данные для полей ввода (страница /inputs)
 */
export const INPUT_TEST_DATA = {
  TEXT: 'Hello World',
  NUMBER: '12345'
} as const;

/**
 * Тестовые данные для нажатия клавиш
 */
export const KEY_PRESS_TEST_DATA = {
  ESCAPE: 'Escape',
  CONTROL: 'Control',
  ENTER: 'Enter',
  BACKSPACE: 'Backspace',
  TAB: 'Tab',
  SHIFT: 'Shift',
  ALT: 'Alt'
} as const;

/**
 * Тестовые данные для автозаполнения
 */
export const AUTOCOMPLETE_TEST_DATA = {
  SEARCH_TERM: 'Canada',
  EXPECTED_RESULT: 'Canada'
} as const;