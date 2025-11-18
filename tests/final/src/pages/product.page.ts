import { Page, Locator } from '@playwright/test';
import { BasePage } from '../common/base.page';

export abstract class ProductPage extends BasePage {
    // LOCATORS
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly productImage: Locator;
    readonly addToCartButton: Locator;

    readonly quantityInputLocator: Locator;
    readonly categoryLocator: Locator;
    readonly tagLocator: Locator;
    readonly originalPrice: Locator;
    readonly salePrice: Locator;
    // Individual categories
    readonly androidCategory: Locator;
    readonly htmlCategory: Locator;
    readonly javascriptCategory: Locator;
    readonly seleniumCategory: Locator;

    constructor(page: Page) {
        super(page);

        this.androidCategory = page.locator('#woocommerce_product_categories-2 a[href*="android"]');
        this.htmlCategory = page.locator('#woocommerce_product_categories-2 a[href*="html"]');
        this.javascriptCategory = page.locator('#woocommerce_product_categories-2 a[href*="javascript"]');
        this.seleniumCategory = page.locator('#woocommerce_product_categories-2 a[href*="selenium"]');
        this.androidCategory = page.getByRole('link', { name: 'Android', exact: true })
        this.productTitle = page.locator('.product_title.entry-title');
        //this.productTitle = page.getByRole('heading', { name: /.*/ }).first();
        this.productPrice = page.locator('.price .woocommerce-Price-amount').first();
        this.originalPrice = page.locator('.price del .woocommerce-Price-amount');
        this.salePrice = page.locator('.price ins .woocommerce-Price-amount');
        this.addToCartButton = page.getByRole('button', { name: 'Add to basket' });
        this.productImage = page.getByRole('img', { name: /.*/ }).first();
        this.quantityInputLocator = page.getByRole('spinbutton');
        this.categoryLocator = page.locator('.posted_in a[rel="tag"]');
        this.tagLocator = page.locator('.tagged_as a[rel="tag"]');
    }

    // PROTECTED METHODS - chỉ actions và getters
    protected async getProductTitle(): Promise<string> {
        return await this.productTitle.textContent() || '';
    }

    protected async isProductImageClickable(): Promise<boolean> {
        return await this.productImage.isEnabled();
    }

    protected async clickAddToCart(): Promise<void> {
        await this.addToCartButton.click();
        await this.waitForTimeout(2000);
    }

    protected async getProductPrice(): Promise<string> {
        return await this.productPrice.textContent() || '';
    }

    protected async getSalePrice(): Promise<string> {
        return await this.salePrice.textContent() || '';
    }

    protected async getPriceCurrency(): Promise<string> {
        return await this.originalPrice.first().textContent() || '';
    }

    protected async getCategory(): Promise<string> {
        return await this.categoryLocator.textContent() || '';
    }

    protected async getQuantity(): Promise<string> {
        return await this.quantityInputLocator.getAttribute('value') || '';
    }

    protected async setQuantity(quantity: number): Promise<void> {
        await this.quantityInputLocator.fill(quantity.toString());
    }

    protected async addProductToCart(quantity?: number): Promise<void> {
        if (quantity) {
            await this.setQuantity(quantity);
        }
        await this.clickAddToCart();
    }

    protected async selectProduct(name?: string): Promise<void> {
        // Tìm container và danh sách sản phẩm
        const loopsWrapper = this.page.locator('#loops-wrapper');
        const productArticles = loopsWrapper.locator('article.product');
        const productCount = await productArticles.count();
        if (name) {
            let productFound = false;
            for (let i = 0; i < productCount; i++) {
                const product = productArticles.nth(i);
                const productTitle = product.locator('h2.post-title a');
                const titleText = await productTitle.textContent();
                if (titleText && titleText.toLowerCase().includes(name.toLowerCase())) {
                    console.log(`Selecting product: "${titleText}"`);
                    await productTitle.click();
                    productFound = true;
                    break;
                }
            }
            if (!productFound) {
                console.log(`Product with name containing "${name}" not found. Selecting first product instead.`);
            }
        } else {
            console.log(`Missing product name`);
        }
        await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 });
        console.log('Product page loaded successfully');
    }
}