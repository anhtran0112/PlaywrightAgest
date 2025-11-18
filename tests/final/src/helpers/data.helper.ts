export class DataHelper {

  static generateRandomEmail(): string {
    const timestamp = Date.now();
    return `testuser_${timestamp}@example.com`;
  }

  static generateRandomPass(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = 'Pass'; // Phần cố định

    // Thêm 4 số ngẫu nhiên
    for (let i = 0; i < 6; i++) {
      password += Math.floor(Math.random() * 10);
    }

    return password + '!'; // Thêm ký tự đặc biệt
  }
  // Output: "Pass1234!"
}