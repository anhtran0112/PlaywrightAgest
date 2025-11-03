import { test, expect } from '@playwright/test';
import { RegisterAPIPage } from '../pages/register.api.page';
import { LoginPage } from '../pages/login.page';
import { LoginVerify } from '../verifiers/login.verify';

test('TC_01 - Register account and set password via email', async ({ page }) => {
    const registerAPI = new RegisterAPIPage(page);
    const loginPage = new LoginPage(page);
    const loginVerify = new LoginVerify(loginPage);

    // Step 1: Truy cập trang và click "Log in / Sign up"
    await loginPage.navigateToLoginpage();
    await loginPage.acceptCookies();

    // Step 2: Lấy email hợp lệ từ GuerrillaMail
    const { email, sidToken } = await registerAPI.getValidEmailFromGuerrillaMail();
    
    // Step 3: Đăng ký với email vừa lấy
    await loginPage.registerWithValidEmail(email);

    // Step 4: Kiểm tra email để lấy link đặt mật khẩu
    const resetLink = await registerAPI.getLinkActiveOfEmail(email, sidToken);
    expect(resetLink).not.toBeNull();

    // Step 5: Truy cập link và đặt mật khẩu
    await registerAPI.openResetLink(page, email, sidToken);
    await registerAPI.resetPassword(page, 'Test@123456');

    // Step 6: Đăng nhập với tài khoản vừa tạo
    await loginPage.navigateToLoginpage();
    await loginPage.loginWithValidCredentials(email, 'Test@123456');

    // Step 7: Xác nhận đăng nhập thành công
    await loginVerify.verifyWelcomeMessage();
});
