import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {

    private cartItems: Locator;
    private quantityInput: Locator;
    private updateCartButton: Locator;
    private clearCartButton: Locator;
    private proceedToCheckoutButton: Locator;
    private emptyCartMessage: Locator;
    private cartTotal: Locator;

    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private companyNameInput: Locator;
    private countryInput: Locator;
    private addressInput: Locator;
    private cityInput: Locator;
    private postcodeInput: Locator;
    private stateInput: Locator;
    private phoneInput: Locator;
    private emailInput: Locator;
    private createAccCheckbox: Locator;
    private placeOrderButton: Locator;
    private confirmOrderButton: Locator;
    private errorMessagesNotification: Locator;
    private orderConfirmation: Locator;
    private orderNumber: Locator;


    constructor(page: Page) {
        // Gọi constructor của class cha (Base page)
        super(page);
        this.firstNameInput = page.locator("//input[@id='billing_first_name']");
        this.lastNameInput = page.locator("//input[@id='billing_last_name']");
        this.companyNameInput = page.locator("//input[@id='billing_company']");
        this.countryInput = page.locator("//span[@id='select2-billing_country-container']");
        this.addressInput = page.locator("//input[@id='billing_address_1']");
        this.cityInput = page.locator("//input[@id='billing_city']");
        this.stateInput = page.locator("//span[@id='select2-billing_state-container']");
        this.postcodeInput = page.locator("//input[@id='billing_postcode']");
        this.phoneInput = page.locator("//input[@id='billing_phone']");
        this.emailInput = page.locator("//input[@id='billing_email']");
        this.createAccCheckbox = page.locator("//input[@id='createaccount']");
        this.placeOrderButton = page.locator("//button[@id='place_order']");

        this.confirmOrderButton = page.locator("//button[contains(text(), 'Confirm Order')]");
        this.errorMessagesNotification = page.locator('ul.woocommerce-error');
        //this.errorMessagesNotification = page.locator('ul.woocommerce-error')
        //    .filter({ has: page.locator('[role="alert"]') });
        this.orderConfirmation = page.locator("//div[contains(@class, 'order-confirmation')]");
        this.orderNumber = page.locator("//span[@class='order-number']");

        this.cartItems = page.locator("//table[@class='cart-table']//tr");
        this.quantityInput = page.locator("//input[@type='number']");
        this.updateCartButton = page.locator("//button[contains(text(), 'Update Cart')]");
        this.clearCartButton = page.locator("//button[contains(text(), 'Clear Cart')]");
        this.proceedToCheckoutButton = page.locator("//div[@class='wc-proceed-to-checkout']//a[@href='https://demo.testarchitect.com/checkout/']");
        this.emptyCartMessage = page.locator("//h2[contains(text(), 'YOUR SHOPPING CART IS EMPTY')]");
        this.cartTotal = page.locator("//span[@class='cart-total']");
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async updateQuantity(newQuantity: number) {
        await this.quantityInput.first().fill(newQuantity.toString());
        await this.updateCartButton.click();
    }

    async clearCart() {
        await this.clearCartButton.click();
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    // Getter methods
    getEmptyCartMessage(): Locator {
        return this.emptyCartMessage;
    }

    getCartTotal(): Locator {
        return this.cartTotal;
    }

    getCartItems(): Locator {
        return this.cartItems;
    }

    public async fillDataIntoBillingOrder(orderData: {
        firstName: string;
        lastName: string;
        company: string;
        country: string;
        address: string;
        city: string;
        postcode: string;
        state: string;
        phone: string;
        email: string;
    }): Promise<void> {
        // Fill required fields
        await this.firstNameInput.fill(orderData.firstName);
        await this.lastNameInput.fill(orderData.lastName);
        await this.companyNameInput.fill(orderData.company);
        await this.countryInput.click(); // Click để mở dropdown
        await this.page.locator(`li:has-text("${orderData.country}")`).first().click();
        await this.addressInput.fill(orderData.address);
        await this.cityInput.fill(orderData.city);
        await this.stateInput.click();
        await this.page.locator(`li:has-text("${orderData.state}")`).first().click();
        await this.postcodeInput.fill(orderData.postcode);
        await this.phoneInput.fill(orderData.phone);
        await this.emailInput.fill(orderData.email);

        // Fill optional company field
        if (orderData.company) {
            await this.companyNameInput.fill(orderData.company);
        }
    }

    public async clickPlaceOrder(): Promise<void> {
        await this.placeOrderButton.click();
    }

    public async isErrorMessagesVisible(): Promise<boolean> {
        await this.errorMessagesNotification.waitFor({ state: 'visible', timeout: 5000 });
        return await this.errorMessagesNotification.isVisible();
    }


}