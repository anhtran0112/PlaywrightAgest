/*
1. Navigate to Shop page
2. Select any available product
3. Click "Add to Cart" button
4. Verify cart notification
5. Check cart icon update
*/
import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/shop.page';
import { ShopVerify } from '../verifiers/shop.verify';

test('TC_04: Verify Product Can Be Added to Shopping Cart', async ({ page }) => {
    const shopPage = new ShopPage(page);
    const shopVerify = new ShopVerify(shopPage);
    let countItemInCartBefore: number;
    let countItemInCartAfter: number;

    await test.step('1. Navigate to Shop page', async () => {
        await shopPage.navigateToShoppage();
    });

    await test.step('2. Select any available product', async () => {
        countItemInCartBefore = await shopPage.getCartCountNumber();
        await shopPage.selectProductDetails('Beats Solo3 Wireless On-Ear');
    });

    await test.step('3. Click "Add to Cart" button', async () => {
        await shopPage.addProductDetailToCart();
        await shopPage.waitForTimeout(2000);
        countItemInCartAfter = await shopPage.getCartCountNumber();
    });

    await test.step('4. Verify cart notification', async () => {
        await shopVerify.verifyProductAddedNotification();
    });

    await test.step('5. Check cart icon update', async () => {
        await shopVerify.verifyCartIconUpdate(countItemInCartBefore, countItemInCartAfter)
    });
});