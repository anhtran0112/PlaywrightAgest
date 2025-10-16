
import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;

    // COMMON ELEMENTS
    protected closePopupButton: Locator;
    protected acceptCookiesButton: Locator;
    protected searchInput: Locator;
    protected searchButton: Locator;
    protected phoneNumber: Locator;
    protected address: Locator;
    protected loginSignupLink: Locator;
    protected pinterestIcon: Locator;
    protected instagramIcon: Locator;
    protected twitterIcon: Locator;
    protected facebookIcon: Locator;
    protected homeMenu: Locator;
    protected aboutUsMenu: Locator;
    protected shopMenu: Locator;
    protected offersMenu: Locator;
    protected blogMenu: Locator;
    protected contactUsMenu: Locator;

    constructor(page: Page) {
        this.page = page;

        // Header Elements
        this.closePopupButton =page.locator("//div[@id='popmake-5700']//button[contains(@class, 'close')]");
        this.acceptCookiesButton = page.locator("//span[@id='cn-notice-buttons']");
        this.searchInput = page.locator("//div[@class='input-row flex align-items-center']//input[@placeholder='Type here...'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.searchButton = page.locator("//div[@class='input-row flex align-items-center']//button[@type='submit'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.phoneNumber = page.locator("//span[contains(text(), '(+1800) 000 8808')]");
        this.address = page.locator("//span[contains(text(), '1730 S. Amphlett Blvd')]");
        this.loginSignupLink = page.locator("//div[normalize-space(@class)='header-top-wrapper']//a[@href='https://demo.testarchitect.com/my-account/'][not(contains(@class, 'mobile-header-wrapper'))]");

        // Social Media Icons
        this.pinterestIcon = page.locator("//div[contains(@class, 'header-socials') and contains(@class, 'mob-justify-content')]//a[@data-tooltip='Pinterest'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.instagramIcon = page.locator("//div[contains(@class, 'header-socials') and contains(@class, 'mob-justify-content')]//a[@data-tooltip='Instagram'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.twitterIcon = page.locator("//div[contains(@class, 'header-socials') and contains(@class, 'mob-justify-content')]//a[@data-tooltip='Twitter'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.facebookIcon = page.locator("//div[contains(@class, 'header-socials') and contains(@class, 'mob-justify-content')]//a[@data-tooltip='Facebook'][not(contains(@class, 'mobile-header-wrapper'))]");

        // Main Navigation Menu
        this.homeMenu = page.locator("//ul[@id='menu-main-menu-1']//li[contains(normalize-space(), 'Home')]");
        this.aboutUsMenu = page.locator("//ul[@id='menu-main-menu-1']//li[contains(normalize-space(), 'About Us')]");
        this.shopMenu = page.locator("//ul[@id='menu-main-menu-1']//li[contains(normalize-space(), 'Shop')]");
        this.offersMenu = page.locator("//ul[@id='menu-main-menu-1']//li//a[contains(text(), 'Offers')]");
        this.blogMenu = page.locator("//ul[@id='menu-main-menu-1']//li//a[contains(text(), 'Blog')]");
        this.contactUsMenu = page.locator("//ul[@id='menu-main-menu-1']//li//a[contains(text(), 'Contact Us')]");
    }

    // ==================== COMMON METHODS ====================

    // Navigation
    public async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    public async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    public async waitForUrl(expectedUrl: string, timeout: number = 10000): Promise<void> {
        await this.page.waitForURL(expectedUrl, { timeout });
    }

    public async goBack(): Promise<void> {
        await this.page.goBack();
    }

    public async reload(): Promise<void> {
        await this.page.reload();
    }

    // Popup & Cookies
    public async closePopup(): Promise<void> {
        await this.closePopupButton.click();
    }

    public async acceptCookies(): Promise<void> {
        await this.acceptCookiesButton.click();
    }

    // Search Functionality
    public async searchForProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName, { timeout: 15000 });
        await this.searchButton.click();
    }

    public async clearSearch(): Promise<void> {
        await this.searchInput.clear();
    }

    // Navigation Menu Clicks
    public async clickHomeMenu(): Promise<void> {
        await this.homeMenu.waitFor({ timeout: 5000 });
        await this.homeMenu.click();
    }

    public async clickAboutUsMenu(): Promise<void> {
        await this.aboutUsMenu.waitFor({ timeout: 5000 });
        await this.aboutUsMenu.click();
    }

    public async clickShopMenu(): Promise<void> {
        await this.shopMenu.waitFor({ timeout: 5000 });
        await this.shopMenu.click();
    }

    public async clickOffersMenu(): Promise<void> {
        await this.offersMenu.waitFor({ timeout: 5000 });
        await this.offersMenu.click();
    }

    public async clickBlogMenu(): Promise<void> {
        await this.blogMenu.waitFor({ timeout: 5000 });
        await this.blogMenu.click();
    }

    public async clickContactUsMenu(): Promise<void> {
        await this.contactUsMenu.waitFor({ timeout: 5000 });
        await this.contactUsMenu.click();
    }

    public async clickLoginSignupLink(): Promise<void> {
        await this.loginSignupLink.waitFor({ timeout: 5000 });
        await this.loginSignupLink.click();
    }

    // Social Media Clicks
    public async clickPinterestIcon(): Promise<void> {
        await this.pinterestIcon.click();
    }

    public async clickInstagramIcon(): Promise<void> {
        await this.instagramIcon.click();
    }

    public async clickTwitterIcon(): Promise<void> {
        await this.twitterIcon.click();
    }

    public async clickFacebookIcon(): Promise<void> {
        await this.facebookIcon.click();
    }

    // ==================== GETTER METHODS ====================

    public getPage(): Page {
        return this.page;
    }

    public getPhoneNumber(): Locator {
        return this.phoneNumber;
    }

    public getAddress(): Locator {
        return this.address;
    }

    public getSearchInput(): Locator {
        return this.searchInput;
    }

    public getSearchButton(): Locator {
        return this.searchButton;
    }

    public getLoginSignupLink(): Locator {
        return this.loginSignupLink;
    }

    // Social Media Getters
    public getPinterestIcon(): Locator {
        return this.pinterestIcon;
    }

    public getInstagramIcon(): Locator {
        return this.instagramIcon;
    }

    public getTwitterIcon(): Locator {
        return this.twitterIcon;
    }

    public getFacebookIcon(): Locator {
        return this.facebookIcon;
    }

    // Navigation Menu Getters
    public getHomeMenu(): Locator {
        return this.homeMenu;
    }

    public getAboutUsMenu(): Locator {
        return this.aboutUsMenu;
    }

    public getShopMenu(): Locator {
        return this.shopMenu;
    }

    public getOffersMenu(): Locator {
        return this.offersMenu;
    }

    public getBlogMenu(): Locator {
        return this.blogMenu;
    }

    public getContactUsMenu(): Locator {
        return this.contactUsMenu;
    }

    // ==================== UTILITY METHODS ====================

    public async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ path: `screenshots/${name}-${Date.now()}.png` });
    }

    public async getPageTitle(): Promise<string> {
        return await this.page.title();
    }
}