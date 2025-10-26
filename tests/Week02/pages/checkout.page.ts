import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    private page: Page;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private addressInput: Locator;
    private cityInput: Locator;
    private postcodeInput: Locator;
    private phoneInput: Locator;
    private emailInput: Locator;
    private confirmOrderButton: Locator;
    private errorMessages: Locator;
    private orderConfirmation: Locator;
    private orderNumber: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator("//input[@name='first_name']");
        this.lastNameInput = page.locator("//input[@name='last_name']");
        this.addressInput = page.locator("//input[@name='address']");
        this.cityInput = page.locator("//input[@name='city']");
        this.postcodeInput = page.locator("//input[@name='postcode']");
        this.phoneInput = page.locator("//input[@name='phone']");
        this.emailInput = page.locator("//input[@name='email']");
        this.confirmOrderButton = page.locator("//button[contains(text(), 'Confirm Order')]");
        this.errorMessages = page.locator("//div[contains(@class, 'error-message')]");
        this.orderConfirmation = page.locator("//div[contains(@class, 'order-confirmation')]");
        this.orderNumber = page.locator("//span[@class='order-number']");
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async fillBillingDetails(details: any) {
        if (details.firstName) await this.firstNameInput.fill(details.firstName);
        if (details.lastName) await this.lastNameInput.fill(details.lastName);
        if (details.address) await this.addressInput.fill(details.address);
        if (details.city) await this.cityInput.fill(details.city);
        if (details.postcode) await this.postcodeInput.fill(details.postcode);
        if (details.phone) await this.phoneInput.fill(details.phone);
        if (details.email) await this.emailInput.fill(details.email);
    }

    async confirmOrder() {
        await this.confirmOrderButton.click();
    }

    // Getter methods
    getErrorMessages(): Locator {
        return this.errorMessages;
    }

    getOrderConfirmation(): Locator {
        return this.orderConfirmation;
    }

    getOrderNumber(): Locator {
        return this.orderNumber;
    }
}