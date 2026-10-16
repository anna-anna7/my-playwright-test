import { USERS } from './data/users';
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('로그인하면 상품 목록에 상품이 6개 보인다', async ({ page }) => {
  // 1. 로그인
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.standard.username, USERS.standard.password);

  // 2. 상품이 6개인지 확인
  await expect(page.locator('.inventory_item')).toHaveCount(6);
});