import { ShopPage } from '../pages/shop.page';
import { BasePage } from '../pages/base.page';
import { expect } from '@playwright/test';

export class ShopVerify {
    private shopPage: ShopPage;
    private basePage: BasePage;

    constructor(shopPage: ShopPage) {
        // Nhận ShopPage instance từ bên ngoài
        // Tạo ra một đối tượng ShopPage mới từ bản thiết kế ShopPage. 
        this.shopPage = shopPage;
        // Tạo BasePage từ page của HomePage thông qua getter
        this.basePage = new BasePage(shopPage.getPage());
    }

    // VERIFICATION METHODS

    async verifyProductAddedNotification(): Promise<void> {
        const isVisible = await this.shopPage.isCartNotificationVisible();
        expect(isVisible).toBe(true);
    }

    async verifyCartIconUpdate(beforeCount: number, afterCount: number, shouldIncrease: boolean = true): Promise<void> {
        if (shouldIncrease) {
            expect(afterCount).toBeGreaterThan(beforeCount);
        } else {
            expect(afterCount).toBeLessThan(beforeCount);
        }
    }

    async verifyCartProductAlert(): Promise<void> {
        const isVisible = await this.shopPage.isCartUpdateAlertVisible();
        if (isVisible===true) {
            console.log("Cart updated");
        } else {
            console.log("Cart dit not update");
        }
    }
}
