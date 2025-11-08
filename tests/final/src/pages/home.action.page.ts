import { Page } from '@playwright/test';
import { HomePage } from './home.page';

export class HomeActionPage extends HomePage {
    constructor(page: Page) {
        super(page);
    }
    async clickArrivalImageByName(productName: string): Promise<void> {
        return await super.clickArrivalImageByName(productName);
    }

}