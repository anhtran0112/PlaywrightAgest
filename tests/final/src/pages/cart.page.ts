import { Page, Locator } from '@playwright/test';
import { BasePage } from '../common/base.page';
import { Country, Region, PaymentMethod, BillingField } from '../data/enum';

export abstract class CartPage extends BasePage {

    // LOCATORS
    readonly checkOutButton: Locator;
    readonly addToCartButtons: Locator;

    // Billing info locators
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly addressInput: Locator;
    readonly apartmentInput: Locator;
    readonly townInput: Locator;
    readonly postcodeInput: Locator;
    readonly paymentMethods: Locator;
    readonly continueToPaymentButton: Locator;

    readonly countryDropdown: Locator;
    readonly countrySearchInput: Locator;
    readonly countryOptions: Locator;
    readonly selectedCountry: Locator;

    readonly stateDropdown: Locator;
    readonly stateSearchInput: Locator;
    readonly stateOptions: Locator;
    readonly selectedState: Locator;

    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        this.checkOutButton = page.locator('//a[contains(@class,"checkout-button")]');
        this.addToCartButtons = page.getByRole('button', { name: 'Update Basket' });

        // Billing info locators
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name *' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name *' });
        this.companyNameInput = page.getByRole('textbox', { name: 'Company Name' });
        this.emailInput = page.getByRole('textbox', { name: 'Email Address *' });
        this.phoneInput = page.getByRole('textbox', { name: 'Phone *' });

        this.countryDropdown = page.locator('#s2id_billing_country');
        this.countrySearchInput = page.locator('.select2-input.select2-focused');
        this.countryOptions = page.locator('.select2-results .select2-result-label');
        this.selectedCountry = page.locator('#s2id_billing_country .select2-chosen');

        this.addressInput = page.getByRole('textbox', { name: 'Address *', exact: true });
        this.apartmentInput = page.getByRole('textbox', { name: 'Apartment, suite, unit etc. (' });
        this.townInput = page.getByRole('textbox', { name: 'Town / District *' });

        this.stateDropdown = page.locator('#s2id_billing_state');
        this.stateSearchInput = page.locator('.select2-input.select2-focused');
        this.stateOptions = page.locator('.select2-results .select2-result-label');
        this.selectedState = page.locator('#s2id_billing_state .select2-chosen');

        this.postcodeInput = page.getByRole('textbox', { name: 'Postcode / ZIP' });
        this.paymentMethods = page.locator('.payment_methods');
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' });

        // Các locators khác sử dụng enum
        this.firstNameInput = page.getByRole('textbox', { name: BillingField.FIRST_NAME });
        this.lastNameInput = page.getByRole('textbox', { name: BillingField.LAST_NAME });
        this.companyNameInput = page.getByRole('textbox', { name: BillingField.COMPANY_NAME });
        this.emailInput = page.getByRole('textbox', { name: BillingField.EMAIL });
        this.phoneInput = page.getByRole('textbox', { name: BillingField.PHONE });
        this.addressInput = page.getByRole('textbox', { name: BillingField.ADDRESS, exact: true });
        this.apartmentInput = page.getByRole('textbox', { name: BillingField.APARTMENT });
        this.townInput = page.getByRole('textbox', { name: BillingField.TOWN });
        this.postcodeInput = page.getByRole('textbox', { name: BillingField.POSTCODE });
        this.paymentMethods = page.locator('.payment_methods');
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' });
        this.placeOrderButton = page.getByRole('button', { name: 'Place order' });
    }

    protected async findProductInCart(productName: string) {
        // Lấy toàn bộ row chứa sản phẩm trong cart
        const productRows = this.page.locator('tr.cart_item');
        const rowCount = await productRows.count();
        console.log(`Found ${rowCount} products in cart`);

        for (let i = 0; i < rowCount; i++) {
            const currentRow = productRows.nth(i);
            // Tìm product title trong td.product-name
            const productTitleElement = currentRow.locator('td.product-name a');

            if (await productTitleElement.count() > 0) {
                const actualProductName = await productTitleElement.textContent();
                if (actualProductName && actualProductName.trim() === productName) {
                    console.log(`Found product: "${productName}" at row ${i + 1}`);
                    return currentRow;
                }
            }
        }
        console.log(`Product "${productName}" not found in cart`);
        return null;
    }

    protected async updateProductInCart(productName: string, quantity: number): Promise<void> {
        // Tìm sản phẩm trong cart
        const productRow = await this.findProductInCart(productName);
        if (!productRow) {
            throw new Error(`Product "${productName}" not found in cart`);
        }
        // Tìm quantity input trong td.product-quantity
        const quantityInput = productRow.locator('td.product-quantity input.qty');
        await quantityInput.clear();
        await quantityInput.fill(quantity.toString());
        const updateBasketBtn = this.page.locator('input[name="update_cart"]');
        await updateBasketBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async selectCountry(countryName: string): Promise<void> {
        console.log(`Selecting country: ${countryName}`);
        await this.countryDropdown.click();
        await this.page.locator(`.select2-result-label:has-text("${countryName}")`).click();
        console.log(`Country selected: ${countryName}`);
    }

    async selectState(stateName: string): Promise<void> {
        console.log(`Selecting state: ${stateName}`);
        await this.stateDropdown.click();
        await this.page.locator(`.select2-result-label:has-text("${stateName}")`).click();
        console.log(`State selected: ${stateName}`);
    }

    public async fillBillingInfo(billingData: {
        firstName: string;
        lastName: string;
        companyName?: string;
        email: string;
        phone: string;
        country: Country;
        address: string;
        apartment?: string;
        town: string;
        region: Region;
        postcode: string;
    }): Promise<void> {
        console.log('Filling billing information');
        // Fill basic information
        await this.firstNameInput.fill(billingData.firstName);
        await this.lastNameInput.fill(billingData.lastName);
        if (billingData.companyName) {
            await this.companyNameInput.fill(billingData.companyName);
        }
        await this.emailInput.fill(billingData.email);
        await this.phoneInput.fill(billingData.phone);

        // Fill country using Select2 dropdown với enum
        await this.selectCountry(billingData.country);
        await this.addressInput.fill(billingData.address);
        if (billingData.apartment) {
            await this.apartmentInput.fill(billingData.apartment);
        }
        await this.townInput.fill(billingData.town);
        // Fill region/state using Select2 dropdown với enum
        await this.selectState(billingData.region);
        await this.postcodeInput.fill(billingData.postcode);
        console.log('Billing information filled successfully');
    }

    // Payment method selection với enum
    public async selectPaymentMethod(methodName: PaymentMethod): Promise<void> {
        console.log(`Selecting payment method: ${methodName}`);
        const paymentMethod = this.page.getByText(methodName);
        await paymentMethod.click();
        console.log(`Payment method "${methodName}" selected`);
    }
}