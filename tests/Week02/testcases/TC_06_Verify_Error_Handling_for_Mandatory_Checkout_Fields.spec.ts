import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { ShopPage } from '../pages/shop.page';
import { ShopVerify } from '../verifiers/shop.verify';

const testUser = {
    firstName: "John",
    lastName: "Doe",
    company: "ABC Company", 
    country: "United States (US)",
    address: "123 Main Street",
    city: "New York",
    postcode: "10001", 
    state: "New York",
    phone: "",
    email: "anh.tran@agest.com"
};

test.beforeEach(async ({ page }) => {
    const shopPage = new ShopPage(page);

    await test.step('Precondition: Navigate to Shop and add product to cart', async () => {
        await shopPage.navigateToShoppage();
        await shopPage.selectProductDetails('Beats Solo3 Wireless On-Ear');
        await shopPage.addProductDetailToCart();
        await shopPage.waitForTimeout(2000);
    });
});

test('TC_06: Verify Error Handling for Mandatory Checkout Fields', async ({ page }) => {
    const cartPage = new CartPage(page);
    const shopPage = new ShopPage(page);
    const shopVerify = new ShopVerify(shopPage);

    await test.step('1. Navigate to Checkout and fill form with blank phone', async () => {
        await shopPage.navigateToCheckoutPage();
        await shopPage.waitForTimeout(2000);
        await cartPage.fillDataIntoBillingOrder(testUser);
    });

    await test.step('2. Click Place Order button', async () => {
        await cartPage.clickPlaceOrder();
        // await cartPage.waitForTimeout(2000);
        await page.waitForLoadState('networkidle');
    });

    await test.step('3. Verify error messages are displayed', async () => {
        await shopVerify.verifyErrorMessagesExist();
    });
});