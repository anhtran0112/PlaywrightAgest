import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://demo.testarchitect.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('TestArchitect Sample Website – Just using for training purpose only');
});

test('get started link', async ({ page }) => {
  await page.goto('https://demo.testarchitect.com/');
  await page.locator('//div[@id="popmake-5700"]//button[contains(@class, "close")]').click({ timeout: 5000 });
  // Chờ thêm một chút sau khi đóng popup để trang ổn định
  await page.waitForTimeout(1000);
  // Click the get started link.
  await page.locator("//div[@class='header-wrapper']//a[contains(@href,'/shop/') and @class='item-link']").click();
  //await page.getByRole('link', { name: 'Get started' }).click();
  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveURL("https://demo.testarchitect.com/shop/");
  //await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
