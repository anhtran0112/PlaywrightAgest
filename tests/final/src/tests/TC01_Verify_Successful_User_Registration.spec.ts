import { test } from '@playwright/test';
import { HomeActionPage } from '../pages/home.action.page';
import { MyAccountActions } from '../pages/myaccount.action.page';
import { BasePageExpect } from '../verifies/base.expect';
import { PaymentExpect } from '../verifies/payment.expect';
import { MyAccountExpect } from '../verifies/myaccount.expect';

test('Complete product purchase flow using Action Pages', async ({ page }) => {
    const homePage = new HomeActionPage(page);
    const basePageExpect = new BasePageExpect(page);
    const paymentExpect = new PaymentExpect(page);
    const myAccountPage = new MyAccountActions(page);
    const myAccountExpect = new MyAccountExpect(page);

    await test.step('Step 1: Navigate to My Account page and register new user', async () => {
        await homePage.goToMyAccountPage();
    });

    await test.step('Step 2: Verify register and login success', async () => {
        const registeredEmail = await myAccountPage.registerNewUser();
        await myAccountExpect.verifyLoginSuccess(registeredEmail);
    });
    
    await test.step('Step 3: Click "Shop" menu in the header and verify shop page loaded', async () => {
        await homePage.goToShopPage();
        await basePageExpect.verifyProductPageLoaded();
    });

    await test.step('Step 4: Click on Home link in the breadcrumb', async () => {
        await homePage.goToHomePage();
    });

    await test.step('Step 5: Verify Home page contains only Three Arrivals', async () => {
        await basePageExpect.verifyHomePageLoaded();
        await basePageExpect.verifyThreeArrivalsExistOnHomePage();
    });

    await test.step('Step 6: Click on arrival image "Selenium Ruby"', async () => {
        await homePage.clickArrivalImageByName("Selenium Ruby");
    });

    await test.step('Step 7: Verify user is redirected to product page with add to basket functionality', async () => {
        await paymentExpect.verifyProductDisplayCorrectly("Selenium Ruby", 500);
    });
});