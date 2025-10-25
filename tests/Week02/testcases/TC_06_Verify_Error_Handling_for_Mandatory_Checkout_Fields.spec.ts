import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { ShopPage } from '../pages/shop.page';
import { ShopVerify } from '../verifiers/shop.verify';

const firstName = "John";
const lastName = "Doe";
const company = "ABC Company";
const country = "United States (US)";
const address = "123 Main Street";
const city = "New York";
const postcode = "10001";
const state = "New York";
const phone = "";
const email = "john.doe@example.com";

test('TC_06: Verify Error Handling for Mandatory Checkout Fields', async ({ page }) => {
    const cartPage = new CartPage(page);
    const shopPage = new ShopPage(page);
    const shopVerify = new ShopVerify(shopPage);

    await test.step('Precondition Navigate to Shop page', async () => {
        await shopPage.navigateToShoppage();
    });

    await test.step('Precondition Select any available product', async () => {
        await shopPage.selectProductDetails('Beats Solo3 Wireless On-Ear');
    });

    await test.step('Precondition Click "Add to Cart" button', async () => {
        await shopPage.addProductDetailToCart();
        await shopPage.waitForTimeout(2000);
    });

    await test.step('1. Leave mandatory fields (address, payment info) blank', async () => {
        await shopPage.navigateToCheckoutPage();
        await shopPage.waitForTimeout(2000);
        await cartPage.fillDataIntoBillingOrder({ firstName, lastName, company, country, address, city, postcode, state, phone, email });
    });

    await test.step('2. Click Confirm Order', async () => {
        await cartPage.clickPlaceOrder();
        await cartPage.waitForTimeout(2000);
    });

    await test.step('3. Verify error messages', async () => {
        await shopVerify.verifyErrorMessagesExist();
    });

});