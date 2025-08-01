// tests/helpers/auth.ts
import { Page, BrowserContext } from '@playwright/test';

export async function mockLogin(
  context: BrowserContext,
  page: Page,
  mockUser: any,
  creds = { username: 'test', password: 'test' }
) {
  // Stub the backend call
  await context.route('**/api/login', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockUser),
    })
  );

  // UI interaction
  await page.goto('/login');
  await page.fill('#username-input', creds.username);
  await page.fill('#password-input input', creds.password);

  await Promise.all([
    page.waitForURL('/events'),
    page.click('#login-button'),
  ]);
}

export async function mockCreateUser(
    context: BrowserContext,
    page: Page,
    mockUser: any,
    creds = { username: 'test', password: 'test' }
  ) {
    // Stub backend
    await context.route('**/api/create-user', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockUser),
      })
    );
  
    // UI interaction
    await page.goto('/create-user');
    await page.fill('#username-input-create-form', creds.username);
    await page.fill('#password-input-create-form input', creds.password);
  
    await Promise.all([
      page.waitForURL('/events'),
      page.click('#create-user-button'),
    ]);
}

export async function applyEventFilter(
    page: Page,
    text: string,
    selector = '#enm-event-list-filter input'
  ) {
    await page.fill(selector, text);
  }
  export async function applyArtistDirectoryFilter(
    page: Page,
    text: string,
    selector = '#artist-directory-filter input'
  ) {
    await page.fill(selector, text);
  }