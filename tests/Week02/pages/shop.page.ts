import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ShopPage extends BasePage {

    private productItems: Locator;
    private wishlistButton: Locator;
    private cartNotification: Locator;
    private cartCount: Locator;
    private addProductToCartButton: Locator;
    private selectProductFromProductPagetButton: Locator;
    private addProductDetailsToCartButton: Locator;
    constructor(page: Page) {
        // Gọi constructor của class cha (Base page)
        super(page);
        this.productItems = page.locator("//div[@class='product-item']");
        this.wishlistButton = page.locator("// 'UpdateSau')]");
        this.cartNotification = page.locator('.et-notify')
            .filter({ hasText: 'Product added.' });
        this.cartCount = page.locator("div.header-wrapper a[href] span.et-cart-quantity:not(.mobile-header-wrapper)");
        this.addProductToCartButton = page.locator('a.add_to_cart_button')
            .filter({ hasText: 'Add to cart' })
            .filter({ has: page.locator('[data-product_name="AirPods"]') });
        this.selectProductFromProductPagetButton = page.locator('.product-title a')
            .filter({ hasText: 'AirPods' });
        this.addProductDetailsToCartButton = page.getByRole('button', { name: 'Add to cart' });
    }


    public async getCartCountNumber(): Promise<number> {
        try {
            await this.cartCount.waitFor({ state: 'visible', timeout: 5000 });
            const countText = await this.cartCount.textContent();
            //Giữ ParseInt để convert về number
            return parseInt(countText?.trim() || '0', 10);
        } catch (error) {
            console.log('Does not found any item in cart');
            return 0;
        }
    }

    public async selectProductDetails(productName: string): Promise<void> {
        const selectProductFromProductPageButton = this.page.locator('.product-title a')
            .filter({ hasText: productName });
        try {
            await selectProductFromProductPageButton.waitFor({ state: 'visible', timeout: 10000 });
            await selectProductFromProductPageButton.click();
            console.log(`Successfully selected product "${productName}"`);
        } catch (error) {
            console.log(`Failed to select product "${productName}": ${(error as Error).message}`);
            throw error;
        }
    }

    public async addProductDetailToCart(): Promise<void> {
        try {
            await this.addProductDetailsToCartButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.addProductDetailsToCartButton.click();
            console.log('Product added to cart');
        } catch (error) {
            console.log('Failed to add product to cart:', String(error));
            throw error;
        }
    }
    public async quickAddToCart(productName: string): Promise<void> {
        const addToCartFromProductPageButton = this.page.locator(`a.add_to_cart_button[data-product_name="${productName}"]`);
        try {
            await addToCartFromProductPageButton.waitFor({ state: 'visible', timeout: 10000 });
            await addToCartFromProductPageButton.click();
            console.log(`Successfully added "${productName}" to cart`);
        } catch (error) {
            console.log(`Failed to add "${productName}" to cart: ${(error as Error).message}`);
            throw error;
        }
    }

    public async addProductToWishlist() {

    }

    // Getter methods
    // Thêm method getPage()

    public getPage(): Page {
        return this.page;
    }

    public getCartNotification(): Locator {
        return this.cartNotification;
    }

    public getCartCount(): Locator {
        return this.cartCount;
    }

    public getProductItems(): Locator {
        return this.productItems;
    }

    public async navigateToShoppage() {
        await this.page.goto('/shop/');
    }

    async isCartNotificationVisible(): Promise<boolean> {
        await this.cartNotification.waitFor({ state: 'visible', timeout: 5000 });
        return await this.cartNotification.isVisible();
    }
}