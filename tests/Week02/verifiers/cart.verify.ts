import { CartPage } from '../pages/cart.page';
import { expect } from '@playwright/test';

export class CartVerify {
    private cartPage: CartPage;

    constructor(cartPage: CartPage) {
        // Nhận CartPage instance từ bên ngoài
        // Tạo ra một đối tượng cartPage mới từ bản thiết kế CartPage. 
        this.cartPage = cartPage;
    }

    // VERIFICATION METHODS
    async verifyCartProductExistInCart(productName: string): Promise<void> {
        const isVisible = await this.cartPage.isProductInCart(productName);
        if (isVisible === true) {
            console.log(`"${productName}" exists in cart`);
        } else {
            console.log(`"${productName}" does not exist in cart`);
        }
    }

    public async verifyCartIsEmpty() {
        const productRows = this.cartPage.getPage().locator('tr.woocommerce-cart-form__cart-item.cart_item.st-item-meta');
        const rowCount = await productRows.count();
        if (rowCount === 0) {
            console.log('Shopping cart is empty');
        } else {
            throw new Error(`Cart is not empty. Still has ${rowCount} products`);
        }
    }

        /* Method verify với expect (dùng trong test)
    public async expectCartToBeEmpty(): Promise<void> {
        const itemCount = await this.getCartItemCount();
        expect(itemCount, 'Cart should be empty').toBe(0);
    }*/
   
    public async getCartItemCount(): Promise<number> {
        const productRows = this.cartPage.getPage().locator('tr.woocommerce-cart-form__cart-item.cart_item.st-item-meta');
        return await productRows.count();
    }

    public async verifyCartItemCount(expectedCount: number): Promise<void> {
        const actualCount = await this.getCartItemCount();
        if (actualCount === expectedCount) {
            console.log(`Cart has ${expectedCount} items`);
        } else {
            throw new Error(`Expected ${expectedCount} items in cart, but found ${actualCount}`);
        }
    }
}
