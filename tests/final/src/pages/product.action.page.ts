import { Page } from '@playwright/test';
import { ProductPage } from './product.page';

export class ProductActionPage extends ProductPage {

    constructor(page: Page) {
        super(page);
    }

    // INHERITED METHODS
    public async getProductTitle(): Promise<string> {
        return super.getProductTitle();
    }

    public async getProductPrice(): Promise<string> {
        return super.getProductPrice();
    }

    public async isProductImageClickable(): Promise<boolean> {
        return super.isProductImageClickable();
    }

    public async clickAddToCart(): Promise<void> {
        return super.clickAddToCart();
    }

    public async getSalePrice(): Promise<string> {
        return super.getSalePrice();
    }

    public async getPriceCurrency(): Promise<string> {
        return super.getPriceCurrency();
    }

    public async getCategory(): Promise<string> {
        return super.getCategory();
    }

    public async getQuantity(): Promise<string> {
        return super.getQuantity();
    }

    public async setQuantity(quantity: number): Promise<void> {
        return super.setQuantity(quantity);
    }

    public async addProductToCart(quantity?: number): Promise<void> {
        return super.addProductToCart(quantity);
    }

    public async searchProduct(productName: string): Promise<void> {
        await super.searchProduct(productName);
    }

    public async selectProduct(productName: string): Promise<void> {
        await super.selectProduct(productName);
    }

}