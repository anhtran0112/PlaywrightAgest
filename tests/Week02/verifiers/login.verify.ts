import { BasePage } from '../pages/base.page';
import { LoginPage } from '../pages/login.page';
import { expect } from '@playwright/test';

export class LoginVerify {
    private loginPage: LoginPage;
    private basePage: BasePage;

    constructor(loginPage: LoginPage) {
        // Nhận LoginPage instance từ bên ngoài
        // Tạo ra một đối tượng ShopPage mới từ bản thiết kế ShopPage. 
        this.loginPage = loginPage;
        // Tạo BasePage từ page của HomePage thông qua getter
        this.basePage = new BasePage(loginPage.getPage());
    }

    // VERIFICATION METHODS

    public async verifyWelcomeMessage() {
        await expect(this.loginPage.getWelcomeMessage()).toContainText('Welcome to your account page');
    }
}