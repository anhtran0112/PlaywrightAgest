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
    // LOCATORS CHO ALL DEPARTMENTS MENU
    private automobilesLink: Locator;
    private carElectronicsLink: Locator;
    private mobilePhoneAccessoriesLink: Locator;
    private computerOfficeLink: Locator;
    private tabletAccessoriesLink: Locator;
    private consumerElectronicsLink: Locator;
    private electronicComponentsLink: Locator;
    private phonesTelecomLink: Locator;
    private watchesLink: Locator;
    private allCategoryItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.closePopupButton = page.locator("//div[@id='popmake-5700']//button[contains(@class, 'close')]");
        this.acceptCookiesButton = page.locator("//span[@id='cn-notice-buttons']");
        this.searchInput = page.locator("//div[@class='input-row flex align-items-center']//input[@placeholder='Type here...'][not(contains(@class, 'mobile-header-wrapper'))]");
        this.searchButton = page.locator("//div[@class='input-row flex align-items-center']//button[@type='submit'][not(contains(@class, 'mobile-header-wrapper'))]");
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
        // All Departments Menu Links
        this.automobilesLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/automobiles-motorcycles/']");
        this.carElectronicsLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/car-electronics/']");
        this.mobilePhoneAccessoriesLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/mobile-phone-accessories/']");
        this.computerOfficeLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/computer-office/']");
        this.tabletAccessoriesLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/tablet-accessories/']");
        this.consumerElectronicsLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/consumer-electronics/']");
        this.electronicComponentsLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/electronic-components-supplies/']");
        this.phonesTelecomLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/phones-telecommunications/']");
        this.watchesLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/watches/']");

        // All Category Items Links
        this.allCategoryItems = page.locator("//select[@id='product_cat-127']");

    }

    public async navigateTo(url: string) {
        await this.page.goto(url);
    }

    public async closePopup() {
        await this.closePopupButton.click();
    }

    public async acceptCookies() {
        await this.acceptCookiesButton.click();
    }

    public async searchForProduct(productName: string) {
        await this.searchInput.fill(productName, { timeout: 15000 });
        //await expect(this.searchInput).toHaveValue(productName);
        await this.searchButton.click();
    }

    /*
    public async verifyHeaderElements() {
        await this.phoneNumber.waitFor({ state: 'visible' });
        await this.address.waitFor({ state: 'visible' });
    }
   await expect(homePage.getHomeMenu()).toBeVisible();
       await expect(homePage.getAboutUsMenu()).toBeVisible();
       await expect(homePage.getShopMenu()).toBeVisible();
       await expect(homePage.getOffersMenu()).toBeVisible();
       await expect(homePage.getBlogMenu()).toBeVisible();
       await expect(homePage.getContactUsMenu()).toBeVisible();
       await expect(homePage.getLoginSignupLink()).toBeVisible();
*/
    public async clickHomeMenu(): Promise<void> {
        await this.homeMenu.click();
    }

    public async clickAboutUsMenu(): Promise<void> {
        await this.aboutUsMenu.click();
    }

    public async clickShopMenu(): Promise<void> {
        await this.shopMenu.click();
    }

    public async clickOffersMenu(): Promise<void> {
        await this.offersMenu.click();
    }

    public async clickContactUsMenu(): Promise<void> {
        await this.contactUsMenu.click();
    }

    public async clickBlogMenu(): Promise<void> {
        await this.blogMenu.click();
    }

    public async clickLoginSignupLink(): Promise<void> {
        await this.loginSignupLink.click();
    }

    public async clickPinterestIcon(): Promise<void> {
        await this.pinterestIcon.click();
    }

    public async clickAutomobilesLink(): Promise<void> {
        await this.automobilesLink.click();
    }

    public async clickCarElectronicsLink(): Promise<void> {
        await this.carElectronicsLink.click();
    }

    public async clickMobilePhoneAccessoriesLink(): Promise<void> {
        await this.mobilePhoneAccessoriesLink.click();
    }

    public async clickComputerOfficeLink(): Promise<void> {
        await this.computerOfficeLink.click();
    }

    public async clickTabletAccessoriesLink(): Promise<void> {
        await this.tabletAccessoriesLink.click();
    }

    public async clickConsumerElectronicsLink(): Promise<void> {
        await this.consumerElectronicsLink.click();
    }

    public async clickElectronicComponentsLink(): Promise<void> {
        await this.electronicComponentsLink.click();
    }

    public async clickPhonesTelecomLink(): Promise<void> {
        await this.phonesTelecomLink.click();
    }

    public async clickWatchesLink(): Promise<void> {
        await this.watchesLink.click();
    }

    // Getter
    public getPhoneNumber(): Locator {
        return this.phoneNumber;
    }
    public getAddress(): Locator {
        return this.address;
    }

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

    public getHomeMenu(): Locator {
        return this.homeMenu;
    }

    public getShopMenu(): Locator {
        return this.shopMenu;
    }

    public getAboutUsMenu(): Locator {
        return this.aboutUsMenu;
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

    public getLoginSignupLink(): Locator {
        return this.loginSignupLink;
    }

    // Getter methods để verification class có thể truy cập locators của All Departments Menu
    public getAutomobilesLink(): Locator {
        return this.automobilesLink;
    }

    public getCarElectronicsLink(): Locator {
        return this.carElectronicsLink;
    }

    public getMobilePhoneAccessoriesLink(): Locator {
        return this.mobilePhoneAccessoriesLink;
    }

    public getComputerOfficeLink(): Locator {
        return this.computerOfficeLink;
    }

    public getTabletAccessoriesLink(): Locator {
        return this.tabletAccessoriesLink;
    }

    public getConsumerElectronicsLink(): Locator {
        return this.consumerElectronicsLink;
    }

    public getElectronicComponentsLink(): Locator {
        return this.electronicComponentsLink;
    }

    public getPhonesTelecomLink(): Locator {
        return this.phonesTelecomLink;
    }

    public getWatchesLink(): Locator {
        return this.watchesLink;
    }

    public getPage(): Page {
        return this.page;
    }

    public getCurrentUrl(): string {
        return this.page.url();
    }

    public async waitForUrl(expectedUrl: string, timeout: number = 10000): Promise<void> {
        await this.page.waitForURL(expectedUrl, { timeout });
    }
}