import { USERS } from './data/users';
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('상품을 장바구니에 담으면 아이콘에 1이 표시된다', async ({ page }) => {
  // 1. 로그인 부품을 꺼내서 로그인
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.standard.username, USERS.standard.password);

  // 2. 임의의 상품 하나를 장바구니에 담기
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // 3. 장바구니 아이콘에 1이 떴는지 확인
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});