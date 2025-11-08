import { Page, Locator } from '@playwright/test';
import { BasePage } from '../common/base.page';

export abstract class HomePage extends BasePage {
    // LOCATORS
    readonly products: Locator;
    readonly productItems: Locator;
    readonly addToCartButtons: Locator;
    readonly productImages: Locator;

    constructor(page: Page) {
        super(page);

        this.products = this.locator('.products');
        this.productItems = this.locator('.products li');
        this.addToCartButtons = this.locator('.products li .add_to_cart_button');
        this.productImages = this.locator('.products li a.woocommerce-LoopProduct-link img');
    }

    protected async clickArrivalImageByName(productName: string): Promise<void> {
        const itemCount = await this.productItems.count();

        for (let i = 0; i < itemCount; i++) {
            const currentItem = this.productItems.nth(i);
            const name = await currentItem.locator('h3').textContent();

            if (name?.trim() === productName) {
                const image = currentItem.locator('img');
                await image.click();
                console.log(`Clicked on arrival image: ${productName}`);
                return;
            }
        }
        console.log(`Product with name "${productName}" not found in arrivals`);
    }
}