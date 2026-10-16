import { USERS } from './data/users';
import { LoginPage } from './pages/LoginPage';
import { test, expect } from '@playwright/test';

test('로그아웃하면 로그인 화면으로 돌아온다', async ({ page }) => {
  // 1. 로그인
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.standard.username, USERS.standard.password);

  // 2. 좌측 상단 햄버거 메뉴 클릭
  await page.getByRole('button', { name: 'Open Menu' }).click();

  // 3. 메뉴가 열릴 때까지 기다린 뒤 Logout 클릭
  const logout = page.locator('[data-test="logout-sidebar-link"]');
  await expect(logout).toBeVisible();
  await logout.click();

  // 4. 로그인 화면으로 돌아왔는지 확인
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByPlaceholder('Username')).toBeVisible();
});