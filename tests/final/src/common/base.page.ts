import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    protected page: Page;
    readonly shopMenu: Locator;
    readonly myAccountMenu: Locator;
    readonly cartIcon: Locator;
    readonly searchInput: Locator;
    readonly searchIcon: Locator;
    readonly homeMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        //this.shopMenu = page.locator('#main-nav a:has-text("Shop")');
        this.shopMenu = page.getByRole('link', { name: 'Shop', exact: true });
        //this.myAccountMenu = page.locator('#main-nav a:has-text("My Account")');
        this.myAccountMenu = page.getByRole('link', { name: 'My Account', exact: true });
        this.cartIcon = page.locator('#wpmenucartli a');
        this.searchInput = this.page.locator('input[title="Search"]');
        this.searchIcon = this.page.locator('.icon-search');
        this.homeMenu = page.getByRole('link', { name: 'Automation Practice Site' }).first();
    }

    public async waitForTimeout(timeout: number): Promise<void> {
        await this.page.waitForTimeout(timeout);
    }

    public async waitForLoadState(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    public locator(selector: string): Locator {
        return this.page.locator(selector);
    }

    public async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }

    // Navigation methods sử dụng baseURL
    public async goToHomePage(): Promise<void> {
        await this.page.goto('/');
        await this.waitForLoadState();
    }

    public async goToMyAccountPage(): Promise<void> {
        await this.page.goto('/my-account/');
        await this.waitForLoadState();
    }

    public async goToCartPage(): Promise<void> {
        await this.page.goto('/basket/');
        await this.waitForLoadState();
    }

    public async goToShopPage(): Promise<void> {
        await this.page.goto('/shop/');
        await this.page.waitForLoadState('domcontentloaded');
    }

    public async goToCheckoutPage(): Promise<void> {
        await this.page.goto('/checkout/');
        await this.waitForLoadState();
    }

    public async clickShopMenu(): Promise<void> {
        await this.shopMenu.click();
        await this.waitForLoadState();
    }

    public async clickHomeMenu(): Promise<void> {
        await this.homeMenu.click();
        await this.waitForLoadState();
    }

    public async searchProduct(productName: string): Promise<void> {
        await this.searchIcon.click({ force: true });
        await this.searchInput.fill(productName);
        await this.searchInput.press('Enter');
        await this.page.waitForLoadState('networkidle');
    }

    public async closeAutoBanner(): Promise<void> {
        const banner = this.page.locator('.ns-nbvke-l-banner-vanilla');
        await banner.waitFor({ state: 'visible', timeout: 2000 });
        //const closeButton = this.page.locator('g.down');
        const closeButton = this.page.locator('xpath=//path[contains(translate(normalize-space(@style), "\"\"", ""), "dropShadowTop")]');
        await closeButton.click();
    }
}