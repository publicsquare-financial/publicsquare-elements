import test from '@playwright/test';
import { BankVerifyJSPage, BankVerifyReactPage } from '../pages/BankVerify.page';

test.describe('js', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new BankVerifyJSPage(page);
    await homePage.goToPage();
  });

  test('should show Verification iframe', async ({ page }) => {
    const homePage = new BankVerifyJSPage(page);
    await homePage.isVisible();
  });
});

test.describe('react', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new BankVerifyReactPage(page);
    await homePage.goToPage();

    await homePage.isVisible();
  });

  test('should show Verification iframe', async ({ page }) => {
    const homePage = new BankVerifyReactPage(page);
    await homePage.isVisible();
  });
});
