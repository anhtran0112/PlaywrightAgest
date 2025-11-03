import { request } from '@playwright/test';
import { Page } from '@playwright/test';

interface Email {
  mail_id: string;
  mail_from: string;
  mail_subject: string;
  mail_excerpt: string;
  mail_timestamp: number;
  mail_read: number;
  mail_date: string;
}

export class RegisterAPIPage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async getValidEmailFromGuerrillaMail(): Promise<{ email: string; sidToken: string }> {
    const apiUrl = 'https://api.guerrillamail.com/ajax.php?f=get_email_address';
    const requestContext = await request.newContext();
    const response = await requestContext.get(apiUrl);
    const data = await response.json();
    await requestContext.dispose();
    return {
      email: data.email_addr,
      sidToken: data.sid_token
    };
  }

  public async findEmailBySubject(subjectKeyword: string, sidToken: string, emailAddr: string): Promise<Email | null> {
    const apiUrl = 'https://api.guerrillamail.com/ajax.php';
    const requestContext = await request.newContext();
    await requestContext.get(`${apiUrl}?f=set_email_user&email_user=${emailAddr.split('@')[0]}&domain=${emailAddr.split('@')[1]}`);
    const res = await requestContext.get(`${apiUrl}?f=get_email_list&sid_token=${sidToken}&offset=0`);
    const initialData = await res.json();
    const initialCount = initialData.list.length;
    // List email ban dau
    console.log(`Initial email count: ${initialCount}`);
    console.log(`Initial emails:`, initialData.list.map((email: Email) => ({
      subject: email.mail_subject,
      from: email.mail_from
    })));

    let emails: Email[] = [];

    for (let i = 0; i < 3; i++) {
      console.log(`Check ${i + 1}/3 - Waiting 5 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      // List email hien tai
      const resCheck = await requestContext.get(`${apiUrl}?f=get_email_list&sid_token=${sidToken}&offset=0`);
      const checkData = await resCheck.json();
      emails = checkData.list;

      console.log(`Check ${i + 1}: Found ${emails.length} emails`);
      console.log(`Current emails:`, emails.map((email: Email) => ({
        subject: email.mail_subject,
        from: email.mail_from
      })));
    }

    const matchedEmail = emails.find(email =>
      email.mail_subject.toLowerCase().includes(subjectKeyword.toLowerCase())
    );

    if (matchedEmail) {
      console.log(`Found matching email:`, {
        subject: matchedEmail.mail_subject,
        from: matchedEmail.mail_from
      });
    } else {
      console.log(`No email found with subject containing: "${subjectKeyword}"`);
    }
    await requestContext.dispose();
    return matchedEmail || null;
  }

  public async getLinkActiveOfEmail(emailAddr: string, sidToken: string): Promise<string | null> {
    const subject = 'Your TestArchitect Sample Website account has been created';
    const sender = 'noreply@demo.testarchitect.com';
    const email = await this.findEmailBySubject(subject, sidToken, emailAddr);

    // Check xem co tim thay email ko
    if (!email || email.mail_from !== sender) {
      return null;
    }
    // Khoi tao API request de lay boday cua email
    const apiUrl = 'https://api.guerrillamail.com/ajax.php';
    const requestContext = await request.newContext();
    let body = '';
    const maxRetries = 2;
    const delayMs = 2000;

    // Get body cua email
    for (let i = 0; i < maxRetries; i++) {
      // Call API de set email user
      await requestContext.get(`${apiUrl}?f=set_email_user&email_user=${emailAddr.split('@')[0]}&domain=${emailAddr.split('@')[1]}`);
      // Goi API de get body email
      const res = await requestContext.get(`${apiUrl}?f=fetch_email&email_id=${email.mail_id}&sid_token=${sidToken}`);
      // Parse response thành JSON
      const data = await res.json();
      body = data.mail_body ?? '';

      // Nếu có nội dung email thì thoát vòng lặp
      if (body.trim()) {
        break;
      }
      // Wait
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    const linkPatterns = [
      // tim lost-password
      /href="([^"]*lost-password[^"]*)"/,
      // tim testarchitect
      /href="(https:\/\/demo\.testarchitect\.com[^"]*)"/
    ];

    // Tim link va check
    for (const pattern of linkPatterns) {
      const match = body.match(pattern);
      if (match && match[1]) {
        // match[1] = "https://demo.testarchitect.com/lost-password/?action=reset&amp;key=ABC123&amp;login=user"
        const link = match[1].replace(/&amp;/g, '&');
        await requestContext.dispose();
        return link;
      }
    }

    // Nếu không tìm thấy link nào khớp
    await requestContext.dispose(); // Giải phóng tài nguyên request
    return null; // Trả về null
  }

  public async openResetLink(page: Page, emailAddr: string, sidToken: string): Promise<void> {
    console.log(`Opening reset link for: ${emailAddr}`);
    const link = await this.getLinkActiveOfEmail(emailAddr, sidToken);

    if (!link) {
      throw new Error('No valid activation link found in email');
    }
    await page.goto(link, {
      timeout: 90000,
      waitUntil: 'domcontentloaded'
    });
    console.log(`Successfully navigated to: ${link}`);
  }

  public async resetPassword(page: Page, newPassword: string): Promise<void> {
    console.log('Resetting password');
    await this.page.waitForLoadState('load', { timeout: 20000 });
    
    const closePopup = this.page.locator('.sales-booster-popup-inner >> text=×');
    const passwordInput = page.getByRole('textbox', { name: "New password" }).first();
    const passwordReInput = page.getByRole('textbox', { name: "Re-enter new password" });
    const savePassButton = page.getByRole('button', { name: "save" });

    await passwordInput.fill(newPassword);
    await this.page.waitForTimeout(500);
    await passwordReInput.fill(newPassword);
    if (await closePopup.isVisible()) {
      await closePopup.click();
    }
    await this.page.waitForTimeout(500);
    //const box = await savePassButton.boundingBox();
    //console.log('Vị trí nút Save:', box);
    await savePassButton.click();
    console.log('Password reset completed');
  }
}