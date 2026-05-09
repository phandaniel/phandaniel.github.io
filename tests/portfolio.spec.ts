import { test, expect } from '@playwright/test';

test.describe('Portfolio Basic Flow', () => {
  test('home page has correct title and header', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Home | Daniel Phan/);
    // Flexible match for the badge
    await expect(page.locator('span').filter({ hasText: 'Digital Craftsman' }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: "Hi, I'm Daniel." })).toBeVisible();
  });

  test('navigation to projects works', async ({ page }) => {
    await page.goto('/');
    // Use the nav link specifically
    await page.locator('header nav').getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveURL(/\/projects/);
    await expect(page.getByRole('heading', { name: 'Projects', exact: true })).toBeVisible();
  });

  test('blog post renders correctly', async ({ page }) => {
    await page.goto('/');
    // The blog posts are now links with large serif font
    const firstPost = page.locator('a[href^="/blog/"]').first();
    await firstPost.click();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('The Three Pillars of Precision')).toBeVisible();
  });

  test('projects page loads cards', async ({ page }) => {
    await page.goto('/projects');
    // Project cards are now links to external GitHub in the main area
    const cards = page.locator('main').locator('a[target="_blank"]');
    const emptyState = page.getByText('Syncing with the digital forge...');
    
    await expect(cards.first().or(emptyState)).toBeVisible();
  });
});
