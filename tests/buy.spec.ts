import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { USERS } from './data/users';

test('상품을 구매하면 주문 완료 화면이 나온다', async ({ page }) => {
  // 1. 로그인
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.standard.username, USERS.standard.password);

  // 2. 상품 하나를 장바구니에 담기
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // 3. 장바구니로 이동
  await page.locator('[data-test="shopping-cart-link"]').click();

  // 4. Checkout 클릭
  await page.locator('[data-test="checkout"]').click();

  // 5. 배송 정보 입력 후 Continue
  await page.locator('[data-test="firstName"]').fill('안나');
  await page.locator('[data-test="lastName"]').fill('유');
  await page.locator('[data-test="postalCode"]').fill('06234');
  await page.locator('[data-test="continue"]').click();

  // 6. 주문 요약 화면에서 Finish 클릭
  await page.locator('[data-test="finish"]').click();

  // 7. 주문 완료 확인
  await expect(page).toHaveURL(/checkout-complete/);
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
  await expect(page.locator('[data-test="complete-text"]'))
    .toContainText('Your order has been dispatched');
});