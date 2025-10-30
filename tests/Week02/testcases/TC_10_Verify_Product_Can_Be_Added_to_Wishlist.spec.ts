/*
1. Navigate to Shop page
2. Find a product
3. Click wishlist icon
4. Verify wishlist update
5. Navigate to Wishlist page

- Product should be added to wishlist
- Wishlist count should increase
- Product should appear in wishlist page
*/


import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/shop.page';
import { ShopVerify } from '../verifiers/shop.verify';
import { HomePage } from '../pages/home.page';
import { error } from 'console';

test('TC_10: Verify Guest User Can Add to Wishlist', async ({ page }) => {
    const shopPage = new ShopPage(page);
    const shopVerify = new ShopVerify(shopPage);
    const homePage = new HomePage(page);

    await test.step('1. Navigate to Shop page', async () => {
        await homePage.navigateToHomepage();
        await homePage.closePopup();
        await homePage.acceptCookies();
        await homePage.selectCategories('All categories');
        await homePage.searchForProduct('AirPods');
        await shopPage.waitForTimeout(2000);
        //await shopPage.selectProductDetails('AirPods');
        await shopPage.addProductToWishlist();
        await shopPage.navigateToWishListPage();
        await shopVerify.verifyWishlistTableNotEmpty();
    });
});