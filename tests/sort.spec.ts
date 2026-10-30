import { test, expect, Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { USERS } from './data/users';
import { SORT } from './data/sortOptions';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.standard.username, USERS.standard.password);
});

test('가격 낮은 순으로 정렬하면 오름차순으로 표시된다', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption(SORT.priceAsc);

  const prices = await getPrices(page);
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

test('가격 높은 순으로 정렬하면 내림차순으로 표시된다', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption(SORT.priceDesc);

  const prices = await getPrices(page);
  expect(prices).toEqual([...prices].sort((a, b) => b - a));
});

test('이름 A to Z로 정렬하면 가나다순으로 표시된다', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption(SORT.nameAsc);

  const names = await getNames(page);
  expect(names).toEqual([...names].sort());
});

test('이름 Z to A로 정렬하면 역순으로 표시된다', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption(SORT.nameDesc);

  const names = await getNames(page);
  expect(names).toEqual([...names].sort().reverse());
});

// 가격 목록을 숫자로 가져오기
async function getPrices(page: Page) {
  const texts = await page.locator('[data-test="inventory-item-price"]').allTextContents();
  return texts.map(t => Number(t.replace('$', '')));
}

// 상품명 목록 가져오기
async function getNames(page: Page) {
  return await page.locator('[data-test="inventory-item-name"]').allTextContents();
}