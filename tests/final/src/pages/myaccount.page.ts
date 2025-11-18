import { Locator, Page, expect } from '@playwright/test';
import { DataHelper } from '../helpers/data.helper';
import { DataLoader, LoginData } from '../utils/data.loader';

export class MyAccountPage {
    readonly page: Page;
    // Login section locators
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly loginButton: Locator;
    readonly lostPasswordLink: Locator;
    readonly loginData: LoginData;
    // Register section locators
    readonly registeremailInput: Locator;
    readonly registerPasswordInput: Locator;
    readonly registerButton: Locator;
    readonly passwordStrength: Locator;
    readonly myAccountContent: Locator;

    //Edit
    readonly addressesLink: Locator;
    readonly editBillingAddressLink: Locator;
    readonly saveAddressButton: Locator;
    readonly saveAddressChangeSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginData = DataLoader.loadLoginData();
        //this.registerButton = page.locator('input[name="register"]');
        this.usernameInput = page.getByRole('textbox', { name: 'Username or email address *' })
        this.passwordInput = page.locator('#password')
        this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.lostPasswordLink = page.getByRole('link', { name: 'Lost your password?' })
        this.registeremailInput = page.locator('#reg_email');
        this.registerPasswordInput = page.locator('#reg_password');
        this.passwordStrength = page.locator('.woocommerce-password-strength');
        this.registerButton = page.getByRole('button', { name: 'Register' })
        this.myAccountContent = page.locator('.woocommerce-MyAccount-content');
        //this.addressesLink = page.locator('.woocommerce-MyAccount-navigation-link--edit-address a');
        this.addressesLink = page.getByRole('link', { name: 'Addresses', exact: true });
        //this.editBillingAddressLink = page.getByRole('link', { name: 'Edit', exact: true });
        this.editBillingAddressLink = page.locator('a.edit[href*="edit-address/billing"]');
        this.saveAddressButton = page.getByRole('button', { name: 'Save Address', exact: true });
        this.saveAddressChangeSuccessMessage = page.getByText('Address changed successfully.');
    }

    protected async goToLostPassword(): Promise<void> {
        await this.lostPasswordLink.click();
    }

    protected async clickAddressesLink(): Promise<void> {
        await this.addressesLink.click();
    }

    generateRandomEmail(): string {
        const emailTemplate = this.loginData.logindata.emailTemplate;
        const timestamp = Date.now();
        return emailTemplate.replace('{timestamp}', timestamp.toString());
    }

    protected async registerWithGeneratedEmail(): Promise<string> {
        const generatedEmail = this.generateRandomEmail();
        const password = this.loginData.logindata.password;
        await this.registeremailInput.fill(generatedEmail);
        await this.registerPasswordInput.fill(password);
        //Cho password validation
        await this.registerPasswordInput.press('Tab');
        await this.page.waitForSelector('.woocommerce-password-strength', { state: 'visible' });
        await this.page.waitForTimeout(500);
        await this.registerButton.click();
        console.log(`Registered with email: ${generatedEmail}`);
        return generatedEmail;
    }

    protected async loginWithCredentials(username: string, password: string, rememberMe: boolean = false): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        if (rememberMe) {
            await this.rememberMeCheckbox.check();
        } else {
            await this.rememberMeCheckbox.uncheck();
        }
        await this.loginButton.click();
    }

}