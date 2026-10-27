import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { USERS } from './data/users';

test('First Name을 비우고 Continue하면 안내 문구가 뜬다', async ({ page }) => {
  // 1. 로그인
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.standard.username, USERS.standard.password);

  // 2. 상품 담고 장바구니로 이동
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('[data-test="shopping-cart-link"]').click();

  // 3. Checkout 클릭
  await page.locator('[data-test="checkout"]').click();

  // 4. First Name만 비운 채 나머지 입력 후 Continue
  await page.locator('[data-test="lastName"]').fill('유');
  await page.locator('[data-test="postalCode"]').fill('06234');
  await page.locator('[data-test="continue"]').click();

  // 5. 안내 문구 확인
  await expect(page.locator('[data-test="error"]'))
    .toHaveText('Error: First Name is required');

  // 6. 다음 화면으로 넘어가지 않았는지 확인
  await expect(page).toHaveURL(/checkout-step-one/);
});