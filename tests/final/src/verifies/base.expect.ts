import { expect } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class BasePageExpect extends BasePage {

    async verifyNavigatePageSuccessfully(pageTitle?: string): Promise<void> {
        if (pageTitle) {
            await expect(this.page).toHaveTitle(new RegExp(pageTitle, 'i'));
        }
    }

    async verifyHomePageLoaded(): Promise<void> {
        await this.verifyNavigatePageSuccessfully('Automation Practice Site');
        await expect(this.page).toHaveURL('/');
        await expect(this.shopMenu).toBeVisible();
        await expect(this.myAccountMenu).toBeVisible();
    }

    async verifyProductPageLoaded(): Promise<void> {
        await this.verifyNavigatePageSuccessfully('Products – Automation Practice Site');
        await expect(this.page).toHaveURL(/\/shop/);
    }

    async verifyMyAccountPageLoaded(): Promise<void> {
        await this.verifyNavigatePageSuccessfully('My Account – Automation Practice Site');
        await expect(this.page).toHaveURL(/\/my-account/);
    }

    async verifyCartPageLoaded(): Promise<void> {
        await this.verifyNavigatePageSuccessfully('Basket – Automation Practice Site');
        await expect(this.page).toHaveURL(/\/basket/);
    }

    async verifyCheckoutPageLoaded(): Promise<void> {
        await this.verifyNavigatePageSuccessfully('Checkout – Automation Practice Site');
        await expect(this.page).toHaveURL(/\/checkout/);
    }

    async verifySearchResults(productName: string): Promise<void> {
        // Wait for search results to load
        const loopsWrapper = this.page.locator('#loops-wrapper');
        await expect(loopsWrapper).toBeVisible();

        // Get all product articles
        const productArticles = loopsWrapper.locator('article.product');
        const productCount = await productArticles.count();

        expect(productCount).toBeGreaterThan(0);

        let foundMatch = false;
        for (let i = 0; i < productCount; i++) {
            const product = productArticles.nth(i);
            const productTitle = product.locator('h2.post-title a');
            await expect(productTitle).toBeVisible();
            const titleText = await productTitle.textContent();
            if (titleText && titleText.toLowerCase().includes(productName.toLowerCase())) {
                foundMatch = true;
                break;
            }
        }
        expect(foundMatch).toBe(true);
    }

    async verifyThreeArrivalsExistOnHomePage(): Promise<boolean> {
        const productItems = this.page.locator('.products li.product');
        const itemCount = await productItems.count();
        console.log(`Found ${itemCount} product items in new arrivals section`);
        // Verify có đúng 3 items
        if (itemCount !== 3) {
            console.log(`Expected 3 arrivals, but found ${itemCount}`);
            return false;
        }
        console.log('All 3 arrivals exist on homepage');
        return true;
    }
}