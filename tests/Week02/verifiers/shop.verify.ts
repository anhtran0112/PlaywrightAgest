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

    public async verifyPaymentMethodSelected(paymentMethod: string): Promise<void> {
        const isSelected = await this.cartPage.isPaymentMethodSelected(paymentMethod);
        expect(isSelected).toBe(true);
    }

    public async verifyOrderPlacedSuccessfully(): Promise<void> {
        const orderStatusVisible = await this.cartPage.isOrderStatusVisible();
        expect(orderStatusVisible).toBe(true);
    }

    public async verifyOrderNumberGenerated(): Promise<void> {
        const orderNumber = await this.cartPage.getOrderNumber();
        expect(orderNumber?.length).toBeGreaterThan(0);
        console.log(`Order number generated: ${orderNumber}`);
    }

    public async verifyWishlistTableNotEmpty2(): Promise<void> {
        const productRows = (this.shopPage as any).locator('table.wishlist_table tbody tr');
        const rowCount = await productRows.count();
        expect(rowCount).toBeGreaterThan(0);
        console.log(`Wishlist has ${rowCount} item(s)`);
    }

    public async verifyWishlistTableNotEmpty(): Promise<boolean> {
        const wishlistTable = this.shopPage.getWishListTable();
        const tableMessageText = this.shopPage.getnoRecordMessage();
        const productRows = this.shopPage.getWishlistProductRows();
        const rowCount = await productRows.count();
        console.log(`Wishlist has ${rowCount} row`);
        const tableText = await wishlistTable.textContent();
        const tableMessage = await tableMessageText.textContent();
        if (rowCount >= 1 && tableText !== "" && tableMessage !== "No products added to the wishlist") {
            console.log("Wishlist table have product item");
            return true;
        } else {
            console.log("Wishlist table does not have product item");
            return false;
        }
    }
}
