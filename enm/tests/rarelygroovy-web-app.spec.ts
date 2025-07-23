import { test, expect } from '@playwright/test';

test('shows Events Page', async ({ page }) => {
  await page.goto('/');
  const header = await page.locator('#events-header');
  await expect(header).toBeVisible();
  await expect(header).toHaveText('Not Events');
});