// myaccount.expect.ts
import { expect } from '@playwright/test';
import { MyAccountPage } from '../pages/myaccount.page';

export class MyAccountExpect extends MyAccountPage {

    async verifyLoginSuccess2(username: string): Promise<void> {
        await expect(this.myAccountContent).toBeVisible();

        const usernameElement = this.myAccountContent.locator('strong');
        await expect(usernameElement).toHaveText(username);

        const welcomeText = await this.myAccountContent.locator('p:first-child').textContent();
        expect(welcomeText).toContain(`Hello ${username}`);
    }

    async verifyLoginSuccess(identifier: string): Promise<void> {
        await expect(this.myAccountContent).toBeVisible();
        const usernameElement = this.myAccountContent.locator('strong');
        const actualUsername = await usernameElement.textContent();
        // Kiểm tra xem identifier là email hay username
        if (identifier.includes('@')) {
            const expectedUsername = identifier.split('@')[0];
            expect(actualUsername).toBe(expectedUsername);
        } else {
            expect(actualUsername).toBe(identifier);
        }
        const welcomeText = await this.myAccountContent.locator('p:first-child').textContent();
        expect(welcomeText).toContain(`Hello ${actualUsername}`);
    }

    async verifyMessageUpdateBillingSuccess(): Promise<boolean> {
        const isMessageVisible = await this.saveAddressChangeSuccessMessage.isVisible();
        if (!isMessageVisible) {
            console.log('Success message is not visible');
            return false;
        }
        const messageText = await this.saveAddressChangeSuccessMessage.textContent();
        if (messageText?.trim() === 'Address changed successfully.') {
            console.log('Address changed successfully');
            return true;
        } else {
            console.log(`Unexpected message text: "${messageText}"`);
            return false;
        }
    }

    async verifyUpdateDataBillingSuccess(billingData: {
        companyName: string;
        firstName: string;
        lastName: string;
        address: string;
        town: string;
        postcode: string;
        country: string;
    }): Promise<void> {
        const addressContent = await this.page.locator('.woocommerce-Address:has-text("Billing Address")').textContent();
        expect(addressContent, 'Address element should not be empty').toBeTruthy();
        const normalizedContent = addressContent!.replace(/\s+/g, ' ').trim().toUpperCase();

        // Verify First Name + Last Name
        const fullName = `${billingData.firstName} ${billingData.lastName}`.toUpperCase();
        expect(normalizedContent, `Should contain full name: ${fullName}`).toContain(fullName);
        console.log(`✅ Full name verified: ${fullName}`);

        // Verify Address
        const normalizedAddress = billingData.address.toUpperCase();
        expect(normalizedContent, `Should contain address: ${billingData.address}`).toContain(normalizedAddress);
        console.log(`✅ Address verified: ${billingData.address}`);

        // Verify Company Name
        const normalizedCompanyName = billingData.companyName.toUpperCase();
        expect(normalizedContent, `Should contain company name: ${billingData.companyName}`).toContain(normalizedCompanyName);
        console.log(`✅ Company name verified: ${billingData.companyName}`);

        // Verify Town / City
        const normalizedTown = billingData.town.toUpperCase();
        expect(normalizedContent, `Should contain town/city: ${billingData.town}`).toContain(normalizedTown);
        console.log(`✅ Town / City verified: ${billingData.town}`);

        // Verify Postcode / ZIP
        expect(normalizedContent, `Should contain postcode: ${billingData.postcode}`).toContain(billingData.postcode);
        console.log(`✅ Postcode / ZIP verified: ${billingData.postcode}`);

        // Verify Country
        const normalizedCountry = billingData.country.toUpperCase();
        expect(normalizedContent, `Should contain country: ${billingData.country}`).toContain(normalizedCountry);
        console.log(`✅ Country verified: ${billingData.country}`);
        console.log('✅ All billing address data verified successfully');

    }
}