# Test Cases Checklist

Автоматизированные тесты для https://practice.expandtesting.com  
Фреймворк: Playwright (TypeScript) | Page Object Model  
Всего тестов: **23** | Все прошли: **23/23**

---

## 1. Login Page (`/login`)

| № | Сценарий | Тип | Статус | Ссылка на тест |
|---|---------|-----|--------|----------------|
| 1.1 | Успешный вход с валидными учётными данными (логин: `practice`, пароль: `SuperSecretPassword!`) | Позитивный | ✅ Passed | `login.spec.ts:21` |
| 1.2 | Вход с невалидным логином и валидным паролем | Негативный | ✅ Passed | `login.spec.ts:32` |
| 1.3 | Вход с валидным логином и невалидным паролем | Негативный | ✅ Passed | `login.spec.ts:48` |
| 1.4 | Вход с пустыми полями логина и пароля | Негативный | ✅ Passed | `login.spec.ts:40` |

**Ожидаемое поведение:**
- Успешный вход → редирект на `/secure`, сообщение об успехе, видна кнопка Logout
- Неверный логин → сообщение об ошибке, пользователь остаётся на странице входа
- Неверный пароль → сообщение об ошибке, пользователь остаётся на странице входа
- Пустые поля → сообщение об ошибке, пользователь остаётся на странице входа

---

## 2. Inputs Page (`/inputs`)

| № | Сценарий | Тип | Статус | Ссылка на тест |
|---|---------|-----|--------|----------------|
| 2.1 | Заполнение всех полей формы (text + number) и проверка отображения в Output | Позитивный | ✅ Passed | `inputs.spec.ts:22` |
| 2.2 | Очистка всех полей после заполнения | Негативный | ✅ Passed | `inputs.spec.ts:32` |

**Доступные поля на странице:**
- Text input (`#input-text`)
- Number input (`#input-number`)

**Ожидаемое поведение:**
- Заполнение → нажатие Submit → данные отображаются в блоке Output
- Очистка → поля становятся пустыми

---

## 3. Forgot Password Page (`/forgot-password`)

| № | Сценарий | Тип | Статус | Ссылка на тест |
|---|---------|-----|--------|----------------|
| 3.1 | Валидация: email без символа `@` | Негативный | ✅ Passed | `forgot-password.spec.ts:20` |
| 3.2 | Валидация: email без локальной части (`@nodomain.com`) | Негативный | ✅ Passed | `forgot-password.spec.ts:26` |
| 3.3 | Валидация: email с пробелами | Негативный | ✅ Passed | `forgot-password.spec.ts:32` |
| 3.4 | Валидация: email без домена (`missing@.com`) | Негативный | ✅ Passed | `forgot-password.spec.ts:38` |

**Ожидаемое поведение:**
- Все невалидные email → отображение ошибки валидации (`invalid-feedback`) с текстом «valid email»

---

## 4. Checkboxes Page (`/checkboxes`)

| № | Сценарий | Тип | Статус | Ссылка на тест |
|---|---------|-----|--------|----------------|
| 4.1 | Активация (выбор) чекбокса #1 | Позитивный | ✅ Passed | `checkboxes.spec.ts:22` |
| 4.2 | Деактивация (снятие выбора) чекбокса #1 | Позитивный | ✅ Passed | `checkboxes.spec.ts:27` |
| 4.3 | Переключение состояния нескольких чекбоксов | Позитивный | ✅ Passed | `checkboxes.spec.ts:33` |
| 4.4 | Проверка состояния чекбокса после перезагрузки страницы | Негативный | ✅ Passed | `checkboxes.spec.ts:41` |

**Ожидаемое поведение:**
- Выбор чекбокса → состояние сохраняется до перезагрузки
- После перезагрузки → состояние сбрасывается (сервер не сохраняет состояние чекбоксов)

---

## 5. Key Presses Page (`/key-presses`)

| № | Сценарий | Клавиша | Статус | Ссылка на тест |
|---|---------|---------|--------|----------------|
| 5.1 | Нажатие Escape | Escape | ✅ Passed | `key-presses.spec.ts:24` |
| 5.2 | Нажатие Control | Control | ✅ Passed | `key-presses.spec.ts:29` |
| 5.3 | Нажатие Enter | Enter | ✅ Passed | `key-presses.spec.ts:34` |
| 5.4 | Нажатие Backspace | Backspace | ✅ Passed | `key-presses.spec.ts:40` |
| 5.5 | Нажатие Tab | Tab | ✅ Passed | `key-presses.spec.ts:45` |
| 5.6 | Нажатие Shift | Shift | ✅ Passed | `key-presses.spec.ts:50` |
| 5.7 | Нажатие Alt | Alt | ✅ Passed | `key-presses.spec.ts:55` |

**Ожидаемое поведение:**
- Каждая нажатая клавиша отображается в блоке Result в формате: `You entered: KEY_NAME`

---

## 6. Autocomplete Page (`/autocomplete`)

| № | Сценарий | Тип | Статус | Ссылка на тест |
|---|---------|-----|--------|----------------|
| 6.1 | Поиск страны «Canada» через автозаполнение и выбор из выпадающего списка | Позитивный | ✅ Passed | `autocomplete.spec.ts:22` |
| 6.2 | Проверка отображения выбранного значения в поле и блоке Result | Позитивный | ✅ Passed | `autocomplete.spec.ts:31` |

**Ожидаемое поведение:**
- Ввод «Canada» → появляется выпадающий список → выбор «Canada» → значение отображается в поле и в блоке Result

---

## Сводная статистика

| Страница | Всего тестов | Passed | Failed | Skipped |
|---------|-------------|--------|--------|---------|
| Login | 4 | 4 | 0 | 0 |
| Inputs | 2 | 2 | 0 | 0 |
| Forgot Password | 4 | 4 | 0 | 0 |
| Checkboxes | 4 | 4 | 0 | 0 |
| Key Presses | 7 | 7 | 0 | 0 |
| Autocomplete | 2 | 2 | 0 | 0 |
| **Итого** | **23** | **23** | **0** | **0** |

---

## Запуск тестов

```bash
npm test                          # Все тесты
npm run test:login                # Только Login
npm run test:inputs               # Только Inputs
npm run test:forgot-password      # Только Forgot Password
npm run test:checkboxes           # Только Checkboxes
npm run test:key-presses          # Только Key Presses
npm run test:autocomplete         # Только Autocomplete
npm run test:headed               # В видимом браузере
npm run test:report               # Открыть HTML-отчёт
```
