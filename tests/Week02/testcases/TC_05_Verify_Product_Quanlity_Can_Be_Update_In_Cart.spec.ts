// Ghi chú
// count thẻ tr [@class="woocommerce-cart-form__cart-item cart_item st-item-meta"];
// thẻ td[2]: tên sp
// thẻ td[4]: số lượng
//<input type="number" class="input-text qty text"  value="1"
//tìm tên sp từ td[2] ->type or fill value vao thẻ td[4]

// viết 1 method tìm sp trong giỏ hàng
// findProductInCart (productName)
// updateProductInCart(prodictName, quality)
// Tìm button  'Update cart'
// await page.getByRole('button', { name: 'Update cart' });

import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/shop.page';
import { ShopVerify } from '../verifiers/shop.verify';

let countItemInCartBefore: number;
let countItemInCartAfter: number;

test('TC05: Verify product quanlity can be update in cart', async ({ page }) => {
    const shopPage = new ShopPage(page);
    const shopVerify = new ShopVerify(shopPage);
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

    });

    await test.step('4. Change quantity to 2', async () => {
        await shopPage.navigateToCartpage();
        await shopPage.waitForTimeout(2000);
        await shopPage.updateProductInCart("Beats Solo3 Wireless On-Ear", 2);
        await shopPage.waitForTimeout(2000);
    });

    await test.step('5. Click "Update Cart" button', async () => {
        await shopPage.updateCart();
        await shopPage.waitForTimeout(2000);
        countItemInCartAfter = await shopPage.getCartCountNumber();
    });

    await test.step('6. Verify cart updates', async () => {
        await shopVerify.verifyCartIconUpdate(countItemInCartBefore, countItemInCartAfter);
        await shopVerify.verifyCartProductAlert();
    });
});