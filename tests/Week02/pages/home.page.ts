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
        // All Departments Menu Links - chỉ có trên HomePage
        const allLinksInMenu = page.locator('#menu-all-departments-1');
        this.automobilesLink = allLinksInMenu.locator('a', { hasText: /Automobiles & Motorcycles/i })
            .filter({ hasNot: page.locator('div.mobile-header-wrapper') })
            .first();

        this.carElectronicsLink = allLinksInMenu.locator('a', { hasText: /Car Electronics/i })
            .filter({ hasNot: page.locator('div.mobile-header-wrapper') })
            .first();

        this.mobilePhoneAccessoriesLink = allLinksInMenu.locator('a', { hasText: /Mobile Phone Accessories/i })
            .filter({ hasNot: page.locator('div.mobile-header-wrapper') })
            .first();

        this.computerOfficeLink = allLinksInMenu.locator('a', { hasText: /Computer & Office/i })
            .filter({ hasNot: page.locator('div.mobile-header-wrapper') })
            .first();

        this.tabletAccessoriesLink = allLinksInMenu.locator('a', { hasText: /Tablet Accessories/i })
            .filter({ hasNot: page.locator('div.mobile-header-wrapper') })
            .first();

        this.consumerElectronicsLink = allLinksInMenu.locator('a', { hasText: /Consumer Electronics/i })
            .filter({ hasNot: page.locator('div.mobile-header-wrapper') })
            .first();

        this.electronicComponentsLink = allLinksInMenu.locator('a', { hasText: /Electronic Components & Supplies/i })
            .filter({ hasNot: page.locator('div.mobile-header-wrapper') })
            .first();

        this.phonesTelecomLink = allLinksInMenu.locator('a', { hasText: /Phones & Telecommunications/i })
            .filter({ hasNot: page.locator('div.mobile-header-wrapper') })
            .first();

        this.watchesLink = allLinksInMenu.locator('a', { hasText: /Watches/i })
            .filter({ hasNot: page.locator('div.mobile-header-wrapper') })
            .first();

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
        await this.automobilesLink.waitFor({ timeout: 30000 });
        await this.automobilesLink.click();
    }

    public async clickCarElectronicsLink(): Promise<void> {
        await this.carElectronicsLink.waitFor({ timeout: 30000 });
        await this.carElectronicsLink.click();
    }

    public async clickMobilePhoneAccessoriesLink(): Promise<void> {
        await this.mobilePhoneAccessoriesLink.waitFor({ timeout: 30000 });
        await this.mobilePhoneAccessoriesLink.click();
    }

    public async clickComputerOfficeLink(): Promise<void> {
        await this.computerOfficeLink.waitFor({ timeout: 30000 });
        await this.computerOfficeLink.click();
    }

    public async clickTabletAccessoriesLink(): Promise<void> {
        await this.tabletAccessoriesLink.waitFor({ timeout: 30000 });
        await this.tabletAccessoriesLink.click();
    }

    public async clickConsumerElectronicsLink(): Promise<void> {
        await this.consumerElectronicsLink.waitFor({ timeout: 30000 });
        await this.consumerElectronicsLink.click();
    }

    public async clickElectronicComponentsLink(): Promise<void> {
        await this.electronicComponentsLink.waitFor({ timeout: 30000 });
        await this.electronicComponentsLink.click();
    }

    public async clickPhonesTelecomLink(): Promise<void> {
        await this.phonesTelecomLink.waitFor({ timeout: 30000 });
        await this.phonesTelecomLink.click();
    }

    public async clickWatchesLink(): Promise<void> {
        await this.watchesLink.waitFor({ timeout: 30000 });
        await this.watchesLink.click();
    }

    public async hoverMouseAllCategoryItems(): Promise<void> {
        await this.allDepartmentsItems.hover();
        await this.page.waitForTimeout(300);
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