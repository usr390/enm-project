// tests/helpers/auth.ts
import { test, expect, Page, BrowserContext } from '@playwright/test';

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

// artist directory helpers

export async function getArtistStartYearsFromEntirePage(
  page: Page,
  sectionClass: 'rgv-artists-activity-range' | 'touring-artists-activity-range'
): Promise<number[]> {
  const tags = page.locator(`.${sectionClass} >> css=p-tag, .${sectionClass} >> css=.p-tag`);
  await expect(tags.first()).toBeVisible();

  const texts = await tags.allInnerTexts();

  const years = texts.map(t => {
    const m = t.match(/(\d{4})/);
    if (!m) throw new Error(`No year found in: "${t}"`);
    return Number(m[1]);
  });

  expect(years.every(Number.isFinite)).toBeTruthy();
  return years;
}

export function expectNonIncreasingYears(nums: number[]) {
  for (let i = 1; i < nums.length; i++) {
    expect(nums[i], `Index ${i}: ${nums[i]} should be <= ${nums[i - 1]}`).toBeLessThanOrEqual(nums[i - 1]);
  }
}

export async function clickTimelineToggleButton(page: Page) {
  const toggle = page.getByTestId('timeline-button'); // or: page.locator('#timeline-button')
  await toggle.scrollIntoViewIfNeeded();
  await toggle.click();
  await page.waitForLoadState('networkidle');
}