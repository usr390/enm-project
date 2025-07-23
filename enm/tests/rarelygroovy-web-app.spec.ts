import { test, expect } from '@playwright/test';
import { mockEvents } from './mocks/mockEvents';
import percySnapshot from '@percy/playwright';


test('Events header renders from mocked API', async ({ context, page }) => {
  // 1️⃣ Route FIRST, on the context
  await context.route('**/api/enmEventsTrans', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockEvents)});
  });


  // 2️⃣ THEN navigate
  await page.goto('/');
  await percySnapshot(page, 'Events page');

  // 3️⃣ Assert UI
  const header = page.locator('#events-header');
  await expect(header).toBeVisible();
  await expect(header).toHaveText('Events');
});