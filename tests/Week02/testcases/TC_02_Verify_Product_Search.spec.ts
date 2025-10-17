/*
1. Navigate to https://demo.testarchitect.com/
2. Close any popup notifications if present
3. Accept cookie notice if present. 
4. Locate the search bar in the header
5. Click on the category dropdown
6. Select "All categories"
7. Enter "camera" in the search field
8. Click the search button
9. Observe search results page
*/
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { HomeVerify } from '../verifiers/home.verify';

test('TC_02: Verify Product Search Functionality Works', async ({ page }) => {
    const homePage = new HomePage(page);
    const homeVerify = new HomeVerify(homePage);

    await test.step('Step 1: Navigate to application homepage', async () => {
        await homePage.navigateToHomepage();
    });

    await test.step('Step 2: Close any popup notifications if present', async () => {
        await homePage.closePopup();
    });

    await test.step('Step 3: Accept cookie notice if present', async () => {
        await homePage.acceptCookies();
    });

    await test.step('Step 4: Select "All categories" from category dropdown', async () => {
        await homePage.selectCategories('All categories');
    });

    await test.step('Step 5: Enter "camera" in the search field and perform search', async () => {
        await homePage.searchForProduct('camera');
    });

    await test.step('Step 6: Verify search results page and products', async () => {
        await expect(page).toHaveURL(/.*s=camera/);
        const validProducts = await homeVerify.verifyProductsExistAfterSearch('camera', true);
        expect(validProducts).toBe(true);
    });
});