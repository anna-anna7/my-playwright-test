import { LoginPage } from './pages/LoginPage';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test('올바른 계정으로 로그인하면 상품 목록이 보인다', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.inventory_item')).toHaveCount(6);
});

test('틀린 비밀번호는 에러 메시지를 띄운다', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username and password do not match');
});

test('상품을 담으면 장바구니 배지가 1로 바뀐다', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});