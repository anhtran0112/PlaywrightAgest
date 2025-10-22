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
    private updateCartButton: Locator;
    private updateCartAlert: Locator;

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
        this.updateCartButton = page.getByRole('button', { name: 'Update cart' });
        //this.updateCartAlert = page.getByRole('alert', { name: /^\s*Cart updated\.\s*$/i }).first();
        this.updateCartAlert = page.locator('.woocommerce-message', { hasText: 'Cart updated.' });
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
        //dsajdqwd
    }

    public async updateCart() {
        await this.updateCartButton.click();
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

    public async navigateToCartpage() {
        await this.page.goto('/cart/');
    }

    async isCartNotificationVisible(): Promise<boolean> {
        await this.cartNotification.waitFor({ state: 'visible', timeout: 5000 });
        return await this.cartNotification.isVisible();
    }

    public async isCartUpdateAlertVisible(): Promise<boolean> {
        await this.updateCartAlert.waitFor({ state: 'visible', timeout: 5000 });
        return await this.updateCartAlert.isVisible();
    }
    // Demo code
    public async findProductInCart(productName: string) {
        // Lấy toàn bộ row chứa sản phẩm trong cart
        const productRows = this.page.locator('tr.woocommerce-cart-form__cart-item.cart_item.st-item-meta');
        const rowCount = await productRows.count();
        console.log(`Found ${rowCount} products in cart`);
        for (let i = 0; i < rowCount; i++) {
            const currentRow = productRows.nth(i);
            // Tìm product title trong td.product-details
            const productTitleElement = currentRow.locator('td.product-details .product-title');
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

    public async updateProductInCart(productName: string, quantity: number): Promise<void> {
        // Tìm sản phẩm trong cart
        const productRow = await this.findProductInCart(productName);
        if (!productRow) {
            throw new Error(`Product "${productName}" not found in cart`);
        }
        // Tìm quantity input trong td thứ 4 (product-quantity)
        const quantityInput = productRow.locator('td.product-quantity input.qty');
        // Clear và nhập quantity mới
        await quantityInput.clear();
        await quantityInput.fill(quantity.toString());
        await this.page.waitForTimeout(2000);
    }

}