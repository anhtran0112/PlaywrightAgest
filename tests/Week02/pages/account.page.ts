import { Page, Locator } from '@playwright/test';

export class AccountPage {
    private page: Page;
    private registerEmailInput: Locator;
    private registerButton: Locator;
    private loginEmailInput: Locator;
    private loginPasswordInput: Locator;
    private loginButton: Locator;
    private accountDashboard: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerEmailInput = page.locator("//input[@name='register_email']");
        this.registerButton = page.locator("//button[contains(text(), 'Register')]");
        this.loginEmailInput = page.locator("//input[@name='login_email']");
        this.loginPasswordInput = page.locator("//input[@name='login_password']");
        this.loginButton = page.locator("//button[contains(text(), 'Login')]");
        this.accountDashboard = page.locator("//div[contains(@class, 'account-dashboard')]");
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async register(email: string) {
        await this.registerEmailInput.fill(email);
        await this.registerButton.click();
    }

    async login(email: string, password: string) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }

    // Getter methods
    getAccountDashboard(): Locator {
        return this.accountDashboard;
    }
}