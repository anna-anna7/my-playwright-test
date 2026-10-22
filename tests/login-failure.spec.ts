import { USERS } from './data/users';
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('차단된 계정으로 로그인하면 차단 메시지가 뜬다', async ({ page }) => {
    // 1. 차단된 계정으로 로그인 시도
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);

    // 2. 차단 메시지가 뜨는지 확인ㅇㅇㅇ
    await expect(page.locator('[data-test="error"]'))
        .toHaveText('Epic sadface: Sorry, this user has been locked out.');

    // 3. 로그인되지 않고 로그인 화면에 머물러 있는지 확인
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});