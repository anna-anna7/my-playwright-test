import { USERS } from './data/users';
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('장바구니 화면 진입 후 그 상품이 1개 있는지 확인하기', async ({ page }) => {
    // 1. 로그인
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    // 2. 임의의 상품 하나를 장바구니에 담기
    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    // 3. 장바구니 아이콘에 1이 떴는지 확인
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // 4. 장바구니 아이콘 클릭
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 5. 장바구니 화면으로 이동했는지 확인
    await expect(page).toHaveURL(/cart/);

    // 6. 장바구니 화면에 그 상품이 1개 있는지 확인
    await expect(page.locator('.cart_item')).toHaveCount(1);

});3