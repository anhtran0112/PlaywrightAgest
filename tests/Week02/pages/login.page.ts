import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {

    private usernameField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;
    private registerEmailField: Locator;
    private registerButton: Locator;
    private welcomeMessage: Locator;

    constructor(page: Page) {
        // Gọi constructor của class cha (Base page)
        super(page);
        // ----------------------------Initialize Locators -------------------------------
        this.usernameField = page.getByLabel('Username')
        this.passwordField = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.registerEmailField = page.locator('#reg_email');;
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.welcomeMessage = page.getByRole('heading', { name: /welcome to your account page/i });
    }

    // Thêm method getPage()
    public getPage(): Page {
        return this.page;
    }

    public getWelcomeMessage(): Locator {
        return this.welcomeMessage;
    }
    public async navigateToLoginpage() {
        await this.page.goto('/my-account/', { waitUntil: 'domcontentloaded', timeout: 90000 });
        await this.page.waitForLoadState('networkidle');
        //await this.page.waitForSelector('text=Log in');
    }

    // Method nhập email
    public async enterEmail(email: string) {
        await this.registerEmailField.fill(email);
    }


    // Method click register button
    public async clickRegisterButton() {
        await this.registerButton.click();
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
        const closePopup = this.page.locator('.sales-booster-popup-inner >> text=×');
        if (await closePopup.isVisible()) {
            await closePopup.click();
        }
        await this.page.waitForLoadState('load', { timeout: 20000 });
        if (await closePopup.isVisible()) {
            await closePopup.click();
        }
        await this.enterUsername(username);
        //await this.page.waitForTimeout(500);
        await this.enterPassword(password);
        if (await closePopup.isVisible()) {
            await closePopup.click();
        }
        //await this.page.waitForTimeout(500);
        await this.clickLoginButton();
    }

    public async registerWithValidEmail(email: string) {
        await this.page.waitForLoadState('load', { timeout: 20000 });
        await this.enterEmail(email);
        await this.page.waitForTimeout(500);
        await this.clickRegisterButton();
    }
}