import { test, expect } from '@playwright/test';
import { mockEvents, } from './mocks/mockEvents';
import { mockArtists, } from './mocks/mockArtists';
import { mockUser, } from './mocks/mockUser';

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

test('Artist Directory header renders from mocked API', async ({ context, page }) => {
  // 1️⃣ Route FIRST, on the context
  await context.route('**/api/artistDirectoryTrans', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockArtists)});
  });


  // 2️⃣ THEN navigate
  await page.goto('/artist-directory');
  await percySnapshot(page, 'Artist Directory page');

  // 3️⃣ Assert UI
  const header = page.locator('#artist-directory-header');
  await expect(header).toBeVisible();
  await expect(header).toHaveText('Artist Directory');
});

test('User is logged from mocked API', async ({ context, page }) => {
  // 1️⃣ Route FIRST, on the context
  await context.route('**/api/login', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockUser)});
  });

  // 2️⃣ THEN navigate
  await page.goto('/login');
  // 3️⃣ Fill out the login form
  await page.fill('#username-input', 'test');
  await page.fill('#password-input input', 'test');
  // 3️⃣ Assert UI
  await page.click('#login-button')
  await page.waitForURL('/events');
  await page.click('#app-sidebar');
  await percySnapshot(page, 'Side bar open');



  const loggedInAs = page.locator('#logged-in-as');
  await expect(loggedInAs).toBeVisible();
  await expect(loggedInAs).toHaveText(`Logged in as ${mockUser.user.username}`);
});

test('User is created from mocked API', async ({ context, page }) => {
  // 1️⃣ Route FIRST, on the context
  await context.route('**/api/create-user', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockUser)});
  });

  // 2️⃣ THEN navigate
  await page.goto('/create-user');
  // 3️⃣ Fill out the login form
  await page.fill('#username-input-create-form', 'test');
  await page.fill('#password-input-create-form input', 'test');
  // 3️⃣ Assert UI
  await page.click('#create-user-button')
  await page.waitForURL('/events');
  await page.click('#app-sidebar');
  await percySnapshot(page, 'Side bar open');



  const loggedInAs = page.locator('#logged-in-as');
  await expect(loggedInAs).toBeVisible();
  await expect(loggedInAs).toHaveText(`Logged in as ${mockUser.user.username}`);
});