import { test, expect, Page } from '@playwright/test';
import { mockEvents, } from './mocks/mockEvents';
import { mockArtists, } from './mocks/mockArtists';
import { mockUser, } from './mocks/mockUser';
import { mockLogin, mockCreateUser, applyEventFilter, applyArtistDirectoryFilter, getArtistStartYearsFromEntirePage, expectNonIncreasingYears, clickTimelineToggleButton } from './helpers/helpers';


// import percySnapshot from '@percy/playwright';

test.describe('Events', () => { 
    test.beforeEach(async ({ context, page }) => {
      await context.route('**/api/enmEventsTrans', route =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockEvents),
        })
      );
      await page.goto('/');
    });

    test('page renders', async ({ page }) => {
      // await percySnapshot(page, 'Events page');
      const header = page.locator('#events-header');
      await expect(header).toBeVisible();
      await expect(header).toHaveText('Events');
    });
  
    test('filter works', async ({ page }) => {
      await applyEventFilter(page, 'xxx');
      const disclaimer = page.locator('#no-events-found-disclaimer');
      await expect(disclaimer).toBeVisible();
      await expect(disclaimer).toHaveText('No events found for "xxx".');
    });
})

test.describe('Artist Directory', () => { 
  test.beforeEach(async ({ context, page }) => {
    await context.route('**/api/artistDirectoryTrans', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockArtists)});
    });
    await page.goto('/artist-directory');

  });

  test('page renders', async ({ context, page }) => {
      // await percySnapshot(page, 'Artist Directory page');
      const header = page.locator('#artist-directory-header');
      await expect(header).toBeVisible();
      await expect(header).toHaveText('Artist Directory');
  });
  test('filter works', async ({ page }) => {
    await applyArtistDirectoryFilter(page, 'Guilty Pleasure');
    const artistCount = page.locator('#artist-directory-count');
    await expect(artistCount).toBeVisible();

    const expected = 1;
    const regex = new RegExp(`Listed:\\s*${expected}(?:\\s+of\\s+\\d+)?\\s*$`);
    await expect(artistCount).toHaveText(regex);
  });
  test('timeline sort orders RGV by start year (desc)', async ({ page }) => {
    await clickTimelineToggleButton(page);
    const years = await getArtistStartYearsFromEntirePage(page, 'rgv-artists-activity-range');
    expectNonIncreasingYears(years);
  });
})


test('User is logged from mocked API', async ({ context, page }) => {
  await mockLogin(context, page, mockUser);
  await page.click('#app-sidebar');
  // await percySnapshot(page, 'Side bar open');
  const loggedInAs = page.locator('#logged-in-as');

  await expect(loggedInAs).toBeVisible();
  await expect(loggedInAs).toHaveText(`Logged in as ${mockUser.user.username}`);
});

test.skip('User is created from mocked API', async ({ context, page }) => {
  await mockCreateUser(context, page, mockUser);
  await page.click('#app-sidebar');
  // await percySnapshot(page, 'Side bar open');
  const loggedInAs = page.locator('#logged-in-as');

  await expect(loggedInAs).toBeVisible();
  await expect(loggedInAs).toHaveText(`Logged in as ${mockUser.user.username}`);
});

