import { Page, Locator } from '@playwright/test';

export class HomePage {
    private page: Page;
    private closePopupButton: Locator;
    private acceptCookiesButton: Locator;
    private searchInput: Locator;
    private searchButton: Locator;
    private phoneNumber: Locator;
    private address: Locator;
    private loginSignupLink: Locator;
    private pinterestIcon: Locator;
    private instagramIcon: Locator;
    private twitterIcon: Locator;
    private facebookIcon: Locator;
    private homeMenu: Locator;
    private aboutUsMenu: Locator;
    private shopMenu: Locator;
    private offersMenu: Locator;
    private blogMenu: Locator;
    private contactUsMenu: Locator;
    private allDepartmentsMenu: Locator;
    private categoryItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.closePopupButton = page.locator("//div[@id='popmake-5700']//button[contains(@class, 'close')]");
        this.acceptCookiesButton = page.locator("//span[@id='cn-notice-buttons']");
        this.searchInput = page.locator("//div[@class='input-row flex align-items-center ']//input[@placeholder='Type here...'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.searchButton = page.locator("//div[@class='input-row flex align-items-center ']//button[@type='submit'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.phoneNumber = page.locator("//span[contains(text(), '(+1800) 000 8808')]");
        this.address = page.locator("//span[contains(text(), '1730 S. Amphlett Blvd')]");
        this.loginSignupLink = page.locator("//div[normalize-space(@class)='header-top-wrapper']//a[@href='https://demo.testarchitect.com/my-account/'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.pinterestIcon = page.locator("//div[contains(@class, 'header-socials') and contains(@class, 'mob-justify-content')]//a[@data-tooltip='Pinterest'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.instagramIcon = page.locator("//div[contains(@class, 'header-socials') and contains(@class, 'mob-justify-content')]//a[@data-tooltip='Instagram'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.twitterIcon = page.locator("//div[contains(@class, 'header-socials') and contains(@class, 'mob-justify-content')]//a[@data-tooltip='Twitter'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.facebookIcon = page.locator("//div[contains(@class, 'header-socials') and contains(@class, 'mob-justify-content')]//a[@data-tooltip='Facebook'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.homeMenu = page.locator("//ul[@id='menu-main-menu-1']//li[contains(normalize-space(), 'Home')]");
        this.aboutUsMenu = page.locator("//ul[@id='menu-main-menu-1']//li[contains(normalize-space(), 'About Us')]");
        this.shopMenu = page.locator("//ul[@id='menu-main-menu-1']//li[contains(normalize-space(), 'Shop')]");
        this.offersMenu = page.locator("//ul[@id='menu-main-menu-1']//li//a[contains(text(), 'Offers')]");
        this.blogMenu = page.locator("//ul[@id='menu-main-menu-1']//li//a[contains(text(), 'Blog')]");
        this.contactUsMenu = page.locator("//ul[@id='menu-main-menu-1']//li//a[contains(text(), 'Contact Us')]");
        this.allDepartmentsMenu = page.locator("//div[@class='secondary-title']//span[contains(normalize-space(), 'All departments')]");
        this.categoryItems = page.locator("//ul[@class='submenu']//li");
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async closePopup() {
        await this.closePopupButton.click();
    }

    async acceptCookies() {
        await this.acceptCookiesButton.click();
    }

    async searchForProduct(productName: string) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async verifyHeaderElements() {
        await this.phoneNumber.waitFor({ state: 'visible' });
        await this.address.waitFor({ state: 'visible' });
    }

    async verifySocialMediaIcons(): Promise<boolean> {
        const pinterestVisible = await this.pinterestIcon.isVisible();
        const instagramVisible = await this.instagramIcon.isVisible();
        const twitterVisible = await this.twitterIcon.isVisible();
        const facebookVisible = await this.facebookIcon.isVisible();
        return pinterestVisible && instagramVisible && twitterVisible && facebookVisible;
    }

    async hoverAllDepartments() {
        await this.allDepartmentsMenu.hover();
    }

    async getCategoryNames(): Promise<string[]> {
        const categories: string[] = [];
        const count = await this.categoryItems.count();
        for (let i = 0; i < count; i++) {
            const text = await this.categoryItems.nth(i).textContent();
            if (text) categories.push(text.trim());
        }
        return categories;
    }

    // Getter
    getHomeMenu(): Locator {
        return this.homeMenu;
    }

    getShopMenu(): Locator {
        return this.shopMenu;
    }

    getAboutUsMenu(): Locator {
        return this.aboutUsMenu;
    }

    getOffersMenu(): Locator {
        return this.offersMenu;
    }

    getBlogMenu(): Locator {
        return this.blogMenu;
    }

    getContactUsMenu(): Locator {
        return this.contactUsMenu;
    }

    getLoginSignupLink(): Locator {
        return this.loginSignupLink;
    }

    // Có thể merge luôn khi check visible khi có time optimize
    public async checkLinkIsClickable(locator: Locator, linkName: string = 'Link'): Promise<{ isClickable: boolean; error?: string }> {
        try 
        {
            // Kiểm tra phần tử có đang hiển thị trên trang hay ko
            if (!(await locator.isVisible())) {
                return { isClickable: false, error: `${linkName} không hiển thị` };
            }
            // Kiểm tra phần tử có enabled hay ko
            if (!(await locator.isEnabled())) {
                return { isClickable: false, error: `${linkName} không thể click` };
            }

            console.log(`${linkName} có thể click`);
            return { isClickable: true };
        } 
        catch (error) 
        {
            return { isClickable: false, error: `Lỗi kiểm tra ${linkName}: ${error}` };
        }
    }
}