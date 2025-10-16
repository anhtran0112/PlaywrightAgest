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
    private allDepartmentsItems: Locator;

    // Tham số truyền vào là một instance của Playwright Page
    constructor(page: Page) {
        // Gọi constructor của class cha (Base page)
        super(page);
        // Khởi tạo
        // All Departments Menu Links - chỉ có trên HomePage
        this.automobilesLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/automobiles-motorcycles/']");
        this.carElectronicsLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/car-electronics/']");
        this.mobilePhoneAccessoriesLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/mobile-phone-accessories/']");
        this.computerOfficeLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/computer-office/']");
        this.tabletAccessoriesLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/tablet-accessories/']");
        this.consumerElectronicsLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/consumer-electronics/']");
        this.electronicComponentsLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/electronic-components-supplies/']");
        this.phonesTelecomLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/phones-telecommunications/']");
        this.watchesLink = page.locator("//ul[@id='menu-all-departments-1']//a[@href='https://demo.testarchitect.com/product-category/watches/']");
        // All Category Items
        this.allCategoryItems = page.locator("//select[@id='product_cat-127']");
        this.allDepartmentsItems = page.locator('text=All departments').first();
    }

    // ==================== HOME PAGE SPECIFIC METHODS ====================
    // milliseconds
    public async waitForTimeout(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }
    // Category Navigation Methods
    public async clickAutomobilesLink(): Promise<void> {
        await this.automobilesLink.waitFor({ timeout: 10000 });
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

    public async hoverMouseAllCategoryItems(maxRetries: number = 3): Promise<void> {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            await this.allDepartmentsItems.hover();
            await this.page.waitForTimeout(300);
            if (await this.isHoverEffectVisible()) {
                return; // Success
            }
            if (attempt < maxRetries) {
                await this.page.waitForTimeout(500);
            }
        }
    }

    private async isHoverEffectVisible(): Promise<boolean> {
        const subMenu = this.page.locator('.sub-menu, .dropdown');
        return await subMenu.isVisible();
    }

    // ==================== HOME PAGE SPECIFIC GETTERS ====================

    // Thêm method getPage()
    public getPage(): Page {
        return this.page;
    }

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

    public async navigateToHomepage() {
        await this.page.goto('/');
    }

    public async navigateToLogin() {
        await this.page.goto('/my-account/');
    }

}