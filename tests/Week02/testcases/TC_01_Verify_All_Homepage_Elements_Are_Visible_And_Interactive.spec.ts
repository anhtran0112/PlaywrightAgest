/*
1. Navigate to https://demo.testarchitect.com/
2. Close popup notifications
3. Accept cookie notice
4. Verify header section elements:
   - Phone number "(+1800) 000 8808"
   - Address "1730 S. Amphlett Blvd. Suite 200, San Mateo, CA"
5. Verify top navigation elements:
   - Login/Sign up link
   - Social media icons (Pinterest, Instagram, Twitter, Facebook)
6. Verify main navigation menu:
   - Home
   - About Us
   - Shop
   - Offers
   - Blog
   - Contact Us
*/

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { HomeVerify } from '../verifiers/home.verify';

test('TC_01: Verify Homepage Elements Are Visible', async ({ page }) => {
   const homePage = new HomePage(page);
   const homeVerify = new HomeVerify(homePage);

   await test.step('1. Navigate to homepage', async () => {
      await homePage.navigateToHomepage();
   });

   await test.step('2. Close popup notifications', async () => {
      await homePage.closePopup();
   });

   await test.step('3. Accept cookie notice', async () => {
      await homePage.acceptCookies();
   });

   await test.step('4. Verify header section elements', async () => {
      await expect(homePage.getPhoneNumber()).toBeVisible();
      await expect(homePage.getAddress()).toBeVisible();
   });

   await test.step('5. Verify top navigation elements', async () => {
      // All mentioned elements should be visible
      await expect(homePage.getLoginSignupLink()).toBeVisible();
      await expect(homePage.getFacebookIcon()).toBeVisible();
      await expect(homePage.getInstagramIcon()).toBeVisible();
      await expect(homePage.getPinterestIcon()).toBeVisible();
      await expect(homePage.getTwitterIcon()).toBeVisible();
   });

   await test.step('6. Verify main navigation menu elements', async () => {
      await homePage.clickAboutUsMenu();
      await homeVerify.verifyLinkNavigation('About us', 'https://demo.testarchitect.com/about-us/');
      await homePage.clickHomeMenu();
      await homeVerify.verifyLinkNavigation('Home', 'https://demo.testarchitect.com/');
      await homePage.clickShopMenu();
      await homeVerify.verifyLinkNavigation('Shop', 'https://demo.testarchitect.com/shop/');
      await homePage.clickOffersMenu();
      await homeVerify.verifyLinkNavigation('Offer', 'https://demo.testarchitect.com/product-category/electronic-components-supplies/');
      await homePage.clickBlogMenu();
      await homeVerify.verifyLinkNavigation('Blog', 'https://demo.testarchitect.com/blog/');
      await homePage.clickContactUsMenu();
      await homeVerify.verifyLinkNavigation('Contact', 'https://demo.testarchitect.com/contact/');
      await homePage.clickLoginSignupLink();
      await homeVerify.verifyLinkNavigation('My account', 'https://demo.testarchitect.com/my-account/');
   });
});