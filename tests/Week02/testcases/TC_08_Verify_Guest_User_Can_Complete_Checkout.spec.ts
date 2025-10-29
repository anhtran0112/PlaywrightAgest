/*
1. Navigate to Cart
2. Click "Proceed to Checkout"
3. Fill in billing details:
   - First name
   - Last name
   - Address
   - City
   - Postcode
   - Phone
   - Email
4. Select payment method
5. Place order
'- Order should be placed successfully
- Order confirmation should be displayed
- Order number should be generated
*/

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
   phone: "158759863",
   email: "anh.tran2@agest.com"
};

test.beforeEach(async ({ page }) => {
   const shopPage = new ShopPage(page);
   await test.step('Precondition: Navigate to Shop and add product to cart', async () => {
      await shopPage.navigateToShoppage();
      await shopPage.acceptCookiesIfVisible();
      await shopPage.selectProductDetails('Beats Solo3 Wireless On-Ear');
      await shopPage.addProductDetailToCart();
      await shopPage.waitForTimeout(2000);
   });
});

test('TC_08: Verify Guest User Can Complete Checkout', async ({ page }) => {
   const cartPage = new CartPage(page);
   const shopPage = new ShopPage(page);
   const shopVerify = new ShopVerify(shopPage);

   await test.step('1. Navigate to Cart and proceed to checkout', async () => {
      await shopPage.navigateToCheckoutPage();
      await shopPage.waitForTimeout(2000);
      //await cartPage.acceptCookiesIfVisible();

   });

   await test.step('2. Fill in complete billing details', async () => {
      await cartPage.fillDataIntoBillingOrder(testUser);
   });

   await test.step('3. Select payment method', async () => {
      await cartPage.selectPaymentMethod('Cash on delivery');
   });

   await test.step('4. Click Place Order button', async () => {
      await cartPage.clickPlaceOrder();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);
   });

   await test.step('5. Verify order is placed successfully', async () => {
      await shopVerify.verifyOrderPlacedSuccessfully();
   });

   await test.step('6. Verify order number is generated', async () => {
      await shopVerify.verifyOrderNumberGenerated();
   });
});

