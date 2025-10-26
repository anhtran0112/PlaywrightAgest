import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {

    private usernameField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;
    constructor(page: Page) {
        // Gọi constructor của class cha (Base page)
        super(page);
        // ----------------------------Initialize Locators -------------------------------
        this.usernameField = page.getByLabel('Username')
        this.passwordField = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }

    public async navigateToLoginpage() {
        await this.page.goto('/my-account/');
    }

    // Method nhập username
    public async enterUsername(username: string) {
        await this.usernameField.fill(username);
    }

    // Method nhập password
    public async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    // Method click login button
    public async clickLoginButton() {
        await this.loginButton.click();
    }

    // Method login với valid credentials (có tham số)
    public async loginWithValidCredentials(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
        await this.page.waitForLoadState('networkidle');
    }
}