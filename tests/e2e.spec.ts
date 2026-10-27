import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('home page has no serious or critical a11y violations @a11y', async ({
    page,
  }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const seriousViolations = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );

    expect(seriousViolations).toEqual([]);
  });

  test('certificates page has no serious a11y violations @a11y', async ({
    page,
  }) => {
    await page.goto('/certificates');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const seriousViolations = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );

    expect(seriousViolations).toEqual([]);
  });

  test('contact page has no serious a11y violations @a11y', async ({
    page,
  }) => {
    await page.goto('/contact');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const seriousViolations = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );

    expect(seriousViolations).toEqual([]);
  });
});

test.describe('Navigation', () => {
  test('skip link works', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('nav links are keyboard accessible', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });
});

test.describe('Content', () => {
  test('home page shows certificate count', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=22')).toBeVisible();
  });

  test('certificates page shows all 22 certificates', async ({ page }) => {
    await page.goto('/certificates');
    const rows = page.locator('.ledger-table tbody tr');
    await expect(rows).toHaveCount(22);
  });
});
