# Playwright Automation Tests

Автотесты для сайта https://practice.expandtesting.com, реализованные на **TypeScript + Playwright**.

## 📋 О проекте

Этот проект содержит автоматизированные тесты для различных страниц практичного сайта тестирования:

- **Login** - Тесты аутентификации
- **Inputs** - Тесты различных типов полей ввода
- **Forgot Password** - Тесты восстановления пароля
- **Checkboxes** - Тесты чекбоксов
- **Key Presses** - Тесты нажатий клавиш
- **Autocomplete** - Тесты автозаполнения

## 🛠️ Технический стек

- **Язык**: TypeScript
- **Фреймворк**: Playwright Test
- **Паттерн**: Page Object Model (POM)
- **CI/CD**: GitLab CI
- **Баг-трекинг**: GitLab Issues

## 📁 Структура проекта

```
├── tests/
│   ├── config/              # Конфигурация и тестовые данные
│   │   └── test-data.ts     # Тестовые данные и константы
│   ├── pages/               # Page Objects
│   │   ├── base-page.ts     # Базовый класс страницы
│   │   ├── login-page.ts    # Login Page Object
│   │   ├── inputs-page.ts   # Inputs Page Object
│   │   ├── forgot-password-page.ts
│   │   ├── checkboxes-page.ts
│   │   ├── key-presses-page.ts
│   │   └── autocomplete-page.ts
│   ├── specs/               # Тестовые спецификации
│   │   ├── login.spec.ts
│   │   ├── inputs.spec.ts
│   │   ├── forgot-password.spec.ts
│   │   ├── checkboxes.spec.ts
│   │   ├── key-presses.spec.ts
│   │   └── autocomplete.spec.ts
│   └── utils/               # Утилиты и хелперы
│       └── test-helpers.ts
├── playwright.config.ts     # Конфигурация Playwright
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Быстрый старт

### Требования

- Node.js >= 18
- npm или yarn

### Установка

```bash
# Установка зависимостей
npm install

# Установка браузеров Playwright
npx playwright install
```

### Запуск тестов

```bash
# Запуск всех тестов
npm test

# Запуск в headed режиме (с браузером)
npm run test:headed

# Запуск в UI режиме
npm run test:ui

# Запуск в режиме отладки
npm run test:debug

# Запуск для конкретного браузера
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Запуск конкретных файлов тестов
npm run test:login
npm run test:inputs
npm run test:forgot-password
npm run test:checkboxes
npm run test:key-presses
npm run test:autocomplete
```

### Просмотр отчёта

```bash
# После запуска тестов открыть HTML отчёт
npm run test:report
```

## 📝 Описание тестов

### Login Page (login.spec.ts)

**Позитивный сценарий:**
- Успешный вход с валидными учётными данными

**Негативные сценарии:**
- Вход с невалидным логином и валидным паролем
- Вход с валидным логином и невалидным паролем
- Вход с пустыми полями логина и пароля

### Inputs Page (inputs.spec.ts)

- Заполнение всех доступных полей формы (text, number)
- Проверка отображения введенных данных в блоке «Output»
- Очистка всех полей после заполнения

### Forgot Password Page (forgot-password.spec.ts)

**Валидация поля email (4 сценария):**
- Не валидный email (без @)
- Не валидный email (без локальной части)
- Не валидный email (с пробелами)
- Не валидный email (без домена)

### Checkboxes Page (checkboxes.spec.ts)

- Активация (выбор) чекбокса
- Деактивация (снятие выбора) чекбокса
- Переключение состояния нескольких чекбоксов
- Проверка состояния чекбокса после перезагрузки страницы

### Key Presses Page (key-presses.spec.ts)

**Обязательные клавиши:**
- Escape (Esc)
- Control (Ctrl)
- Enter
- Backspace

**Опциональные клавиши:**
- Tab
- Shift
- Alt

### Autocomplete Page (autocomplete.spec.ts)

- Поиск страны «Canada» через поле автозаполнения
- Выбор предложенного варианта из выпадающего списка
- Проверка, что выбранное значение отобразилось в поле

## 🔧 Конфигурация

### Playwright Config

Файл `playwright.config.ts` содержит конфигурацию:
- Базовый URL: `https://practice.expandtesting.com`
- Браузеры: Chromium, Firefox, WebKit
- Репорты: HTML, List
- Скриншоты: только при неудаче
- Видео: только при неудаче

### Тестовые данные

Все тестовые данные вынесены в `tests/config/test-data.ts`:
- Учётные данные для login
- Данные для валидации email
- Данные для различных типов полей ввода
- Данные для автозаполнения
