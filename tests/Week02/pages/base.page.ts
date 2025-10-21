
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
        //this.closePopupButton = page.locator("//div[@id='popmake-5700']//button[contains(@class, 'close')]");
        this.closePopupButton = page.locator('#popmake-5700').getByRole('button', { name: 'Close' });
        //this.acceptCookiesButton = page.locator("//span[@id='cn-notice-buttons']");
        this.acceptCookiesButton = page.locator('#cn-notice-buttons').getByText('Ok');
        //this.searchInput = page.locator("//div[@class='input-row flex align-items-center ']//input[@placeholder='Type here...'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.searchInput = page.locator('div.input-row.flex.align-items-center').getByPlaceholder('Type here...')
            .filter({ hasNot: page.locator('.mobile-header-wrapper') }).first();
        //this.searchButton = page.locator("//div[@class='input-row flex align-items-center ']//button[@type='submit'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.searchButton = page.locator('div.input-row.flex.align-items-center').getByRole('button', { name: 'Search' })
            .filter({ hasNot: page.locator('.mobile-header-wrapper') }).first();
        //this.phoneNumber = page.locator("//span[contains(text(), '(+1800) 000 8808')]");
        //this.phoneNumber = page.getByText('(+1800) 000 8808');
        this.phoneNumber = page.locator('span').filter({ hasText: '(+1800) 000 8808' });
        //this.address = page.locator("//span[contains(text(), '1730 S. Amphlett Blvd')]");
        this.address = page.locator('span').filter({ hasText: '1730 S. Amphlett Blvd' });
        //this.loginSignupLink = page.locator("//div[normalize-space(@class)='header-top-wrapper']//a[@href='https://demo.testarchitect.com/my-account/'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.loginSignupLink = page.locator('div.header-top-wrapper a[href="https://demo.testarchitect.com/my-account/"]')
            .getByText(/Log in|Sign up/i)
            .first();

        // Social Media Icons
        //this.pinterestIcon = page.locator("//div[contains(@class, 'header-socials') and contains(@class, 'mob-justify-content')]//a[@data-tooltip='Pinterest'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.pinterestIcon = page.getByRole('link', { name: 'Pinterest' })
            .filter({ hasNot: page.locator('.mobile-header-wrapper') });
        this.instagramIcon = page.getByRole('link', { name: 'Instagram' })
            .filter({ hasNot: page.locator('.mobile-header-wrapper') });
        this.twitterIcon = page.getByRole('link', { name: 'Twitter' })
            .filter({ hasNot: page.locator('.mobile-header-wrapper') });
        this.facebookIcon = page.getByRole('link', { name: 'Facebook' })
            .filter({ hasNot: page.locator('.mobile-header-wrapper') })

        // Main Navigation Menu
        //this.homeMenu = page.locator("//ul[@id='menu-main-menu-1']//li[contains(normalize-space(), 'Home')]");
        this.homeMenu = page.locator('#menu-main-menu-1').getByRole('link', { name: 'Home' });
        this.aboutUsMenu = page.locator('#menu-main-menu-1').getByRole('link', { name: 'About Us' });
        this.shopMenu = page.locator('#menu-main-menu-1').getByRole('link', { name: 'Shop' });
        this.offersMenu = page.locator('#menu-main-menu-1').getByRole('link', { name: 'Offers' });
        this.blogMenu = page.locator('#menu-main-menu-1').getByRole('link', { name: 'Blog' });
        this.contactUsMenu = page.locator('#menu-main-menu-1').getByRole('link', { name: 'Contact Us' });
    }

    // ==================== COMMON METHODS ====================
    // milliseconds
    public async waitForTimeout(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }
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

    public async selectCategories(category: 'All categories' | 'Accessory Bundles' | 'Acoustic Components' | 'Air-conditioning Installation'): Promise<void> {
        const categoryDropdown = this.page.locator('//select[contains(@id, "product_cat-")]');
        await categoryDropdown.selectOption({ label: category });
    }

    // Search Functionality
    public async searchForProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName, { timeout: 1000 });
        await this.searchButton.click();
        // Chờ kết quả search load xong
        await this.page.waitForLoadState('networkidle');
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

    public async countProductsAfterSearch(productName: string): Promise<number> {
        // Locator động cho các sản phẩm theo tên
        const productLocator = this.page.locator(`//h2[@class='product-title']//a[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${productName}')]`);
        // Đếm số lượng sản phẩm và trả về
        const productCount = await productLocator.count();
        if (productCount > 0) {
            console.log(`Found ${productCount} "${productName}" product(s) on the page`);
        } else {
            console.log(`No "${productName}" products found on the page`);
        }
        return productCount;
    }
}