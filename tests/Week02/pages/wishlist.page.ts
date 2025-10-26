import { Page, Locator } from '@playwright/test';

export class WishlistPage {
    private page: Page;
    private wishlistItems: Locator;
    private wishlistCount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.wishlistItems = page.locator("//div[@class='wishlist-items']");
        this.wishlistCount = page.locator("//span[@class='wishlist-count']");
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async getWishlistCount(): Promise<number> {
        const countText = await this.wishlistCount.textContent();
        return parseInt(countText || '0');
    }

    // Getter methods
    getWishlistItems(): Locator {
        return this.wishlistItems;
    }
}