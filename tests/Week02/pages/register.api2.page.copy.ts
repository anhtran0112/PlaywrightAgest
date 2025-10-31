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

  public async findEmailBySubject(subjectKeyword: string, sidToken: string): Promise<Email | null> {
    const apiUrl = 'https://api.guerrillamail.com/ajax.php';
    const requestContext = await request.newContext();
    const res = await requestContext.get(`${apiUrl}?f=get_email_list&sid_token=${sidToken}&offset=0`);
    const initialData = await res.json();
    const initialCount = initialData.list.length;
    let emails: Email[] = [];

    for (let i = 0; i < 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 120000));
      const resCheck = await requestContext.get(`${apiUrl}?f=get_email_list&sid_token=${sidToken}&offset=0`);
      const checkData = await resCheck.json();
      emails = checkData.list;
      if (emails.length > initialCount) break;
    }

    const matchedEmail = emails.find(email =>
      email.mail_subject.toLowerCase().includes(subjectKeyword.toLowerCase())
    );

    await requestContext.dispose();
    return matchedEmail || null;
  }

  public async getLinkActiveOfEmail(emailAddr: string, sidToken: string): Promise<string | null> {
    const subject = 'Your TestArchitect Sample Website account has been created!';
    const sender = 'noreply@demo.testarchitect.com';
    const email = await this.findEmailBySubject(subject, sidToken);
    if (!email || email.mail_from !== sender) return null;

    const apiUrl = 'https://api.guerrillamail.com/ajax.php';
    const requestContext = await request.newContext();

    let body = '';
    const maxRetries = 5;
    const delayMs = 10000; // 10 giây

    for (let i = 0; i < maxRetries; i++) {
      const res = await requestContext.get(`${apiUrl}?f=fetch_email&email_id=${email.mail_id}`);
      const data = await res.json();
      body = data.mail_body ?? '';

      if (body.trim()) {
        break; // đã có nội dung
      }

      console.log(`Lần ${i + 1}: mail_body chưa có nội dung, chờ thêm...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    if (!body.trim()) {
      await requestContext.dispose();
      console.log('Không lấy được nội dung email sau nhiều lần thử.');
      return null;
    }

    const linkPattern = /href="([^"]*lost-password[^"]*)"/;
    const match = body.match(linkPattern);
    const link = match ? match[1] : null;

    if (!link) {
      await requestContext.dispose();
      console.log('Không tìm thấy link trong nội dung email.');
      return null;
    }

    const response = await requestContext.get(link);
    const isValid = response.status() === 200;
    await requestContext.dispose();
    return isValid ? link : null;
  }

  public async openResetLink(page: Page, emailAddr: string, sidToken: string): Promise<void> {
    const link = await this.getLinkActiveOfEmail(emailAddr, sidToken);
    if (!link) {
      console.log('Không tìm thấy link hợp lệ.');
      return;
    }
    await page.goto(link);
  }

  public async resetPassword(page: Page, newPassword: string): Promise<void> {
    const passwordInput = page.getByRole('textbox', { name: 'Mật khẩu' });
    const passwordReInput = page.getByRole('textbox', { name: 'Mật khẩu xác nhận' });
    const savePassButton = page.getByRole('button', { name: 'Save' });
    await passwordInput.fill(newPassword);
    await passwordReInput.fill(newPassword);
    await savePassButton.click();
  }
}
