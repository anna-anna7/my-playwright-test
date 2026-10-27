import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { USERS } from './data/users';

// 알려진 버그: 빈 장바구니에서도 Checkout이 진행됨
// 수정되면 이 테스트가 통과로 바뀜
test.fail();

test('빈 장바구니에서는 결제 화면으로 넘어갈 수 없다', async ({ page }) => {
  // 1. 로그인
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.standard.username, USERS.standard.password);

  // 2. 장바구니로 이동
  await page.locator('[data-test="shopping-cart-link"]').click();

  // 3. 사전 준비 확인 — 장바구니가 비어 있어야 함
  await expect(page.locator('.cart_item')).toHaveCount(0);

  // 4. Checkout 클릭
  await page.locator('[data-test="checkout"]').click();

  // 5. 결제 정보 입력 화면으로 넘어가지 않아야 함
  await expect(page).not.toHaveURL(/checkout-step-one/);
});