import { test, expect } from '@playwright/test';
import { HomeActionPage } from '../pages/home.action.page';
import { ProductActionPage } from '../pages/product.action.page';
import { CartActionPage } from '../pages/cart.action.page';
import { BasePageExpect } from '../verifies/base.expect';
import { PaymentExpect } from '../verifies/payment.expect';
import { BillingTestData, PaymentTestData } from '../data/test.data';
import { MyAccountActions } from '../pages/myaccount.action.page';
import { MyAccountExpect } from '../verifies/myaccount.expect';

test.describe('Complete product purchase flow', () => {
    let homePage: HomeActionPage;
    let productPage: ProductActionPage;
    let myAccountPage: MyAccountActions;
    let cartPage: CartActionPage;
    let basePageExpect: BasePageExpect;
    let paymentExpect: PaymentExpect;
    let myAccountExpect: MyAccountExpect;

    test.beforeEach(async ({ page }) => {
        // Khởi tạo action pages
        homePage = new HomeActionPage(page);
        productPage = new ProductActionPage(page);
        myAccountPage = new MyAccountActions(page);
        cartPage = new CartActionPage(page);
        basePageExpect = new BasePageExpect(page);
        paymentExpect = new PaymentExpect(page);
        myAccountExpect = new MyAccountExpect(page);

        // Register và login với user mới
        await test.step('Setup: Register and login with new user', async () => {
            await homePage.goToMyAccountPage();
            await myAccountPage.registerNewUser();
        });
    });

    test('Complete product purchase flow using Action Pages', async () => {
        await test.step('Step 1: Navigate to My Account -> Addresses', async () => {
            await homePage.goToMyAccountPage();
            await myAccountPage.addressesLink.click();
        });

        await test.step('Step 2: Click "Edit" button for Billing Address', async () => {
            await myAccountPage.editBillingAddressLink.click();
        });

        await test.step('Step 3: Fill billing information and save address', async () => {
            await cartPage.fillBillingInfo(BillingTestData.valid);
            await myAccountPage.saveAddressButton.click();
        });

        await test.step('Step 4: Verify Message displays “Address changed successfully', async () => {
            await myAccountExpect.verifyMessageUpdateBillingSuccess();
        });

        await test.step('Step 5: Click "Addressed" link in the left-hand side menu', async () => {
            await myAccountPage.clickAddressesLink();
        });

        await test.step('Step 6: Verify Billing Address is displayed {First Name} {Last Name} {Address} {Town / City} {Postcode / ZIP} {State / County}', async () => {
            await myAccountExpect.verifyUpdateDataBillingSuccess({
                firstName: BillingTestData.valid.firstName,
                lastName: BillingTestData.valid.lastName,
                address: BillingTestData.valid.address,
                town: BillingTestData.valid.town,
                postcode: BillingTestData.valid.postcode,
                country: BillingTestData.valid.country,
                companyName: BillingTestData.valid.companyName,
            });
        });
    });
});