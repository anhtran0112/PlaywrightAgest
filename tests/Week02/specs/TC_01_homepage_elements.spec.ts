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
import { HomePage } from '../page/home.page';

test('TC_01: Verify Homepage Elements Are Visible', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigateTo('https://demo.testarchitect.com/');
    await homePage.closePopup();
    await homePage.acceptCookies();
    await homePage.verifyHeaderElements();
    await expect(homePage.getHomeMenu()).toBeVisible();
    await expect(homePage.getAboutUsMenu()).toBeVisible();
    await expect(homePage.getShopMenu()).toBeVisible();
    await expect(homePage.getOffersMenu()).toBeVisible();
    await expect(homePage.getBlogMenu()).toBeVisible();
    await expect(homePage.getContactUsMenu()).toBeVisible();
    await expect(homePage.getLoginSignupLink()).toBeVisible();
    const areSocialIconsVisible = await homePage.verifySocialMediaIcons();
    expect(areSocialIconsVisible, 'All social media icons should be visible').toBe(true);

    const result = await homePage.checkLinkIsClickable(homePage.getLoginSignupLink(), 'Login Link');
    expect(result.isClickable).toBe(true);

});