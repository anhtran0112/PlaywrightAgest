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

   await homePage.navigateTo('https://demo.testarchitect.com/');
   await homePage.closePopup();
   await homePage.acceptCookies();

   await expect(homePage.getHomeMenu()).toBeVisible();
   await expect(homePage.getPhoneNumber()).toBeVisible();
   await expect(homePage.getAddress()).toBeVisible();
   await expect(homePage.getAboutUsMenu()).toBeVisible();
   await expect(homePage.getShopMenu()).toBeVisible();
   await expect(homePage.getOffersMenu()).toBeVisible();
   await expect(homePage.getBlogMenu()).toBeVisible();
   await expect(homePage.getContactUsMenu()).toBeVisible();
   await expect(homePage.getLoginSignupLink()).toBeVisible();
   await expect(homePage.getFacebookIcon()).toBeVisible();
   await expect(homePage.getInstagramIcon()).toBeVisible();
   await expect(homePage.getPinterestIcon()).toBeVisible();
   await expect(homePage.getTwitterIcon()).toBeVisible();

   // Click vào category About us
   await homePage.clickAboutUsMenu();
   // Verify navigation
   await homeVerify.verifyLinkNavigation('About us', 'https://demo.testarchitect.com/about-us/');

   // Click vào category Home
   await homePage.clickHomeMenu();
   // Verify navigation
   await homeVerify.verifyLinkNavigation('Home', 'https://demo.testarchitect.com/');

   // Click vào category Shop
   await homePage.clickShopMenu();
   // Verify navigation
   await homeVerify.verifyLinkNavigation('Shop', 'https://demo.testarchitect.com/shop/');

   // Click vào category Offer
   await homePage.clickOffersMenu();
   // Verify navigation
   await homeVerify.verifyLinkNavigation('Offer', 'https://demo.testarchitect.com/product-category/electronic-components-supplies/');

   // Click vào category Blog
   await homePage.clickBlogMenu();
   // Verify navigation
   await homeVerify.verifyLinkNavigation('Blog', 'https://demo.testarchitect.com/blog/');

   // Click vào category Contact
   await homePage.clickContactUsMenu();
   // Verify navigation
   await homeVerify.verifyLinkNavigation('Contact', 'https://demo.testarchitect.com/contact/');

   // Click vào category My account
   await homePage.clickLoginSignupLink();
   // Verify navigation
   await homeVerify.verifyLinkNavigation('My account', 'https://demo.testarchitect.com/my-account/');

});