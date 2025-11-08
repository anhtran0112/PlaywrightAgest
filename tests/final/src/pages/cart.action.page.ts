import { Page } from '@playwright/test';
import { CartPage } from './cart.page';
import { Country, Region, PaymentMethod, BillingField } from '../data/enum';

export class CartActionPage extends CartPage {
    constructor(page: Page) {
        super(page);
    }

    // Public - expose the protected methods from parent class
    public async findProductInCart(productName: string) {
        return await super.findProductInCart(productName);
    }

    public async updateProductInCart(productName: string, quantity: number): Promise<void> {
        return await super.updateProductInCart(productName, quantity);
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
        return await super.fillBillingInfo(billingData);
    }

    public async selectPaymentMethod(methodName: PaymentMethod): Promise<void> {
        return await super.selectPaymentMethod(methodName);
    }
}