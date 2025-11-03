import { Page, Locator } from '@playwright/test';

export class BugReporter {
  public static async report(page: Page, description: string): Promise<void> {
    const url = await page.url();
    const timestamp = new Date().toISOString();
    console.warn(`[Bug] ${description}\nURL: ${url}\nTime: ${timestamp}`);
  }
}

