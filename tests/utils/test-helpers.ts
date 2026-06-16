/**
 * Test utilities and helpers
 */
import { expect } from '@playwright/test';

/**
 * Retry helper for flaky tests
 */
export async function retryAction<T>(
  action: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await action();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
}

/**
 * Wait for element to be visible with retry
 */
export async function waitForElementVisible(
  locator: any,
  timeoutMs: number = 5000
): Promise<void> {
  await expect(locator).toBeVisible({ timeout: timeoutMs });
}

/**
 * Wait for element to be hidden with retry
 */
export async function waitForElementHidden(
  locator: any,
  timeoutMs: number = 5000
): Promise<void> {
  await expect(locator).toBeHidden({ timeout: timeoutMs });
}

/**
 * Generate random string for testing
 */
export function generateRandomString(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate random email
 */
export function generateRandomEmail(): string {
  return `test_${generateRandomString(8)}@example.com`;
}

/**
 * Generate random number between min and max
 */
export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Wait for network idle
 */
export async function waitForNetworkIdle(page: any, timeoutMs: number = 10000): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout: timeoutMs });
}

/**
 * Take screenshot with timestamp
 */
export async function takeScreenshotWithTimestamp(
  page: any,
  name: string
): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${name}_${timestamp}.png`;
  await page.screenshot({ path: `screenshots/${filename}`, fullPage: true });
}

/**
 * Compare two objects deeply
 */
export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== 'object' || obj1 === null ||
      typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

/**
 * Wait for specific time
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}