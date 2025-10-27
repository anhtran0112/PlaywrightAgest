
import { Page, Locator } from '@playwright/test';

export class RegisterEmailPage {
    protected page: Page;

    // COMMON ELEMENTS
    protected closePopupButton: Locator;
    protected acceptCookiesButton: Locator;
    protected editNameOfEmailButton: Locator;
    protected editNameOfEmailField: Locator;
    protected setButton: Locator;
    protected scrambleButton: Locator;
    protected emailField: Locator;
    protected emailContentLocator: Locator;
    protected myAccountLinkConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.editNameOfEmailButton = page.locator('#inbox-id');
        this.editNameOfEmailField = page.locator('#inbox-id input[type="text"]');
        this.setButton = page.getByRole('button', { name: 'Set' });
        this.scrambleButton = page.getByText('Scramble Address');
        this.emailField = page.locator('#email-widget');
        this.emailContentLocator = page.locator('tr:has-text("Your TestArchitect Sample Website account has been created!")');
        this.myAccountLinkConfirm = page.getByRole('link', { name: 'Click here to set your new password.' });
    }

    // ==================== COMMON METHODS ====================
    // milliseconds
    public async waitForTimeout(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }
    // Navigation
    public async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    public async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    public async reload(): Promise<void> {
        await this.page.reload();
    }

    // Popup & Cookies
    public async closePopup(): Promise<void> {
        await this.closePopupButton.click();
    }

    // Method creatEmailName (tra ra emailName)
    // Click this button //this.editNameOfEmailButton = page.locator('#inbox-id');
    //Fill value //this.editNameOfEmailField = page.locator('#inbox-id input[type="text"]');
    //Click set button //this.setButton = page.getByRole('button', { name: 'Set' });
    //Click button // this.scrambleButton = page.getByText('Scramble Address');
    //Get email name sau khi fill this.emailField = page.locator('#email-widget');

    private async generateData(dataName: string): Promise<string> {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const dateTimeString = `${hours}${minutes}${seconds}`;
        const newDataName = `${dataName}-${dateTimeString}`;
        return newDataName;
    }

    private async createEmailName(newEmailName: string): Promise<string> {
        // Locators:
        const editNameOfEmailButton = this.page.locator('#inbox-id');
        const editNameOfEmailField = this.page.locator('#inbox-id input[type="text"]');
        const setButton = this.page.getByRole('button', { name: 'Set' });
        const scrambleButton = this.page.getByText('Scramble Address');
        const emailField = this.page.locator('#email-widget');

        // Click editNameOfEmailButton de chinh sua
        await editNameOfEmailButton.click();
        // Nhap name
        await editNameOfEmailField.fill(newEmailName);
        // Click set de luu name
        await setButton.click();
        // Click Scramble button
        await scrambleButton.click();
        // Wait email dc cap nhat
        await emailField.waitFor({ state: 'visible' });
        // Get email
        const updatedEmailName = await emailField.textContent();
        if (updatedEmailName !== null) {
            return updatedEmailName.trim();
        }
        throw new Error("Khong the tao dc email");
    }

    public async clickToSetNewAccountPass(): Promise<void> {
        await this.myAccountLinkConfirm.click();
    }
}