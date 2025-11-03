import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ShopPage } from '../pages/shop.page';
import { CartPage } from '../pages/cart.page';
import { CartVerify } from '../verifiers/cart.verify';

const validUsername = "anh.duy.tran@agest.vn";
const validPassword = "123456789";

test('TC_07: Verify Users Can Clear the Shopping Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const shopPage = new ShopPage(page);
    const cartPage = new CartPage(page);
    const cartVerify = new CartVerify(cartPage);

    await test.step('1.Login with valid credentials', async () => {
        await loginPage.navigateToLoginpage();
        await loginPage.loginWithValidCredentials(validUsername, validPassword);
    });

    await test.step('2.Go to Shopping cart page', async () => {
        await shopPage.navigateToShoppage();
        await shopPage.waitForTimeout(2000);
        await shopPage.selectProductDetails('AirPods');
        await shopPage.addProductDetailToCart();
        await shopPage.waitForTimeout(2000);

    });

    await test.step('3.Verify items show in table', async () => {
        await shopPage.navigateToCartpage();
        await shopPage.waitForTimeout(2000);
        await cartVerify.verifyCartProductExistInCart('AirPods');
    });

    await test.step('4.Click on Clear shopping cart', async () => {
        await cartPage.clearShoppingCart();
        await shopPage.waitForTimeout(2000);
    });

    await test.step('5.Verify empty cart page displays', async () => {
        await cartVerify.verifyCartIsEmpty();
    });
});