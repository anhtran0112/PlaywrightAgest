import { expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { ProductActionPage } from '../pages/product.action.page';
import { CartActionPage } from '../pages/cart.action.page';

export class PaymentExpect {
    private cartAction: CartActionPage;
    private productAction: ProductActionPage;

    constructor(private page: Page) {
        this.cartAction = new CartActionPage(page);
        this.productAction = new ProductActionPage(page);
    }

    async verifyProductDescription(productPage: ProductActionPage): Promise<void> {
        await expect(productPage.productTitle).toBeVisible();
        const description = await productPage.getProductTitle();
        expect(description.trim().length).toBeGreaterThan(0);
    }

    async verifyRemoveItemSuccessful(productName: string): Promise<boolean> {
        await this.page.waitForTimeout(1000);
        const cartEmptyMessage = this.page.getByText('Your basket is currently empty.');
        if (await cartEmptyMessage.count() > 0) {
            console.log(`Product "${productName}" successfully removed from cart - Cart is empty`);
            return true;
        }
        const productRow = await this.cartAction.findProductInCart(productName);
        if (!productRow) {
            console.log(`Product "${productName}" successfully removed from cart`);
            return true;
        }
        console.log(`Product "${productName}" still exists in cart`);
        return false;
    }

    async verifyUpdateSuccessful(productName: string, expectedQuantity: number): Promise<boolean> {
        const productRow = await this.cartAction.findProductInCart(productName);
        if (!productRow) {
            console.log(`Product "${productName}" not found in cart`);
            return false;
        }
        // Kiem tra so luong
        const quantityInput = productRow.locator('td.product-quantity input.qty');
        const actualQuantity = await quantityInput.getAttribute('value');

        if (parseInt(actualQuantity || '0') !== expectedQuantity) {
            console.log(`Quantity mismatch. Expected: ${expectedQuantity}, Actual: ${actualQuantity}`);
            return false;
        }
        // Kiem tra gia
        const productPriceElement = productRow.locator('td.product-price .woocommerce-Price-amount');
        const subtotalElement = productRow.locator('td.product-subtotal .woocommerce-Price-amount');
        const priceText = await productPriceElement.textContent();
        const subtotalText = await subtotalElement.textContent();
        if (priceText && subtotalText) {
            const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
            const subtotal = parseFloat(subtotalText.replace(/[^\d.]/g, ''));
            const expectedSubtotal = price * expectedQuantity;

            if (Math.abs(subtotal - expectedSubtotal) > 0.01) {
                console.log(`Subtotal mismatch. Expected: ${expectedSubtotal}, Actual: ${subtotal}`);
                return false;
            }
        }
        console.log(`Product "${productName}" successfully updated to quantity ${expectedQuantity}`);
        return true;
    }

    async verifyItemExistInCart(productName: string): Promise<boolean> {
        const productRow = await this.cartAction.findProductInCart(productName);
        if (productRow) {
            console.log(`✓ Product "${productName}" exists in cart`);
            return true;
        } else {
            console.log(`✗ Product "${productName}" does not exist in cart`);
            return false;
        }
    }

    async verifyThankYouMessage(): Promise<void> {
        const thankYouMessage = this.page.locator('.woocommerce-thankyou-order-received');
        await expect(thankYouMessage).toBeVisible();
        await expect(thankYouMessage).toHaveText('Thank you. Your order has been received.');
        console.log('Thank you message existed');
    }

    async verifyProductDisplayCorrectly(expectedTitle: string, expectedPrice: number): Promise<void> {
        // Verify product title
        await expect(this.productAction.productTitle).toBeVisible();
        await expect(this.productAction.productTitle).toHaveText(expectedTitle);
        console.log(`Product title is correct: "${expectedTitle}"`);

        // Verify product price
        await expect(this.productAction.productPrice).toBeVisible();
        const actualPriceText = await this.productAction.productPrice.textContent();
        const actualPriceValue = parseFloat(actualPriceText!.replace(/[^\d.]/g, ''));
        expect(actualPriceValue).toBe(expectedPrice);
        console.log(`Product price is correct: ${expectedPrice}`);

        // Verify quantity = 1
        await expect(this.productAction.quantityInputLocator).toBeVisible();
        await expect(this.productAction.quantityInputLocator).toHaveValue('1');
        console.log('Quantity is correct: 1');

        // Verify Add to Basket button is visible
        await expect(this.productAction.addToCartButton).toBeVisible();
        console.log('Add to Basket button is visible');
        console.log('Product displayed correctly with all verified elements');
    }
}