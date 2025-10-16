/*
1. Hover over "All departments" menu
2. Verify all main categories are present:
   - Automobiles & Motorcycles
   - Car Electronics
   - Mobile Phone Accessories
   - Computer & Office
   - Tablet Accessories
   - Consumer Electronics
   - Electronic Components & Supplies
   - Phones & Telecommunications
   - Watches
3. Click each category and verify navigation
*/
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { HomeVerify } from '../verifiers/home.verify';

test('TC_03: Verify Main Menu Categories Navigate Correctly', async ({ page }) => {
    const homePage = new HomePage(page);
    const homeVerify = new HomeVerify(homePage);

    await test.step('Navigate to homepage and handle initial setup', async () => {
        await homePage.navigateTo('https://demo.testarchitect.com/');
        await homePage.closePopup();
        await homePage.acceptCookies();
    });

    await test.step('Verify all menu categories navigate correctly', async () => {
        await homeVerify.verifyAllMenuCategoriesNavigateCorrectly();
    });
});