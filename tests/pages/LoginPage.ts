import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // 사이트 열기
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // 로그인하기
  async login(username: string, password: string) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}