
import { MyAccountPage } from './myaccount.page';

export class MyAccountActions extends MyAccountPage {

    public async goToLostPassword(): Promise<void> {
        await super.goToLostPassword();
    }

    public async registerNewUser(): Promise<string> {
        return await this.registerWithGeneratedEmail();
    }

    public async loginUser(username: string, password: string, rememberMe: boolean = false): Promise<void> {
        await this.loginWithCredentials(username, password, rememberMe);
    }

    public async clickAddressesLink(): Promise<void> {
        await super.clickAddressesLink();
    }

    public async clickEditBillingAddressLink(): Promise<void> {
        await super.clickEditBillingAddressLink();
    }

    public async clickSaveAddressButton(): Promise<void> {
        await super.clickSaveAddressButton();
    }

}