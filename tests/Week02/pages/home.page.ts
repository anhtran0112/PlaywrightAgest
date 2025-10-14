// pages/home.page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {

    // HOME PAGE SPECIFIC ELEMENTS
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

    // Tham số truyền vào là một instance của Playwright Page
    constructor(page: Page) {
        // Gọi constructor của class cha (Base page)
        super(page);
        // Khởi tạo
        // All Departments Menu Links - chỉ có trên HomePage
        this.automobilesLink = this.page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/automobiles-motorcycles/']");
        this.carElectronicsLink = this.page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/car-electronics/']");
        this.mobilePhoneAccessoriesLink = this.page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/mobile-phone-accessories/']");
        this.computerOfficeLink = this.page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/computer-office/']");
        this.tabletAccessoriesLink = this.page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/tablet-accessories/']");
        this.consumerElectronicsLink = this.page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/consumer-electronics/']");
        this.electronicComponentsLink = this.page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/electronic-components-supplies/']");
        this.phonesTelecomLink = this.page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/phones-telecommunications/']");
        this.watchesLink = this.page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/watches/']");
        // All Category Items
        this.allCategoryItems = this.page.locator("//select[@id='product_cat-127']");
    }

    // ==================== HOME PAGE SPECIFIC METHODS ====================

    // Category Navigation Methods
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

    // ==================== HOME PAGE SPECIFIC GETTERS ====================

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

    public getAllCategoryItems(): Locator {
        return this.allCategoryItems;
    }
}