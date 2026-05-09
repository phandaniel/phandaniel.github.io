import { test, expect } from '@playwright/test';

test.describe('Portfolio Basic Flow', () => {
  test('home page has correct title and header', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Home | Daniel Phan/);
    await expect(page.getByText('Digital Craftsman', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Precision in every pixel.' })).toBeVisible();
  });

  test('navigation to projects works', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveURL(/\/projects/);
    await expect(page.getByRole('heading', { name: 'Featured Work' })).toBeVisible();
  });

  test('blog post renders correctly', async ({ page }) => {
    await page.goto('/');
    // Click the first blog post
    await page.locator('article a').first().click();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('The Three Pillars of Precision')).toBeVisible();
  });

  test('projects page loads cards', async ({ page }) => {
    await page.goto('/projects');
    // We expect at least one project card to be rendered or the empty state
    const cards = page.locator('a[target="_blank"]');
    const emptyState = page.getByText('Unable to load repositories');
    
    await expect(cards.first().or(emptyState)).toBeVisible();
  });
});
