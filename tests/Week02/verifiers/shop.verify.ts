import { ShopPage } from '../pages/shop.page';
import { BasePage } from '../pages/base.page';
import { CartPage } from '../pages/cart.page';
import { expect } from '@playwright/test';

export class ShopVerify {
    private shopPage: ShopPage;
    private basePage: BasePage;
    private cartPage: CartPage;

    constructor(shopPage: ShopPage) {
        // Nhận ShopPage instance từ bên ngoài
        // Tạo ra một đối tượng ShopPage mới từ bản thiết kế ShopPage. 
        this.shopPage = shopPage;

        // Tạo BasePage từ page của HomePage thông qua getter
        this.basePage = new BasePage(shopPage.getPage());

        this.cartPage = new CartPage(shopPage.getPage());
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
        if (isVisible === true) {
            console.log("Cart updated");
        } else {
            console.log("Cart did not update");
        }
    }

    public async verifyErrorMessagesExist(): Promise<void> {
        const isVisible = await this.cartPage.isErrorMessagesVisible();
        if (isVisible) {
            console.log("Error messages exist");
        } else {
            console.log("Error messages do not exist");
        }
    }
}
