import test from '@playwright/test';
import { BankAccountsJSPage, BankAccountsReactPage } from '../pages/BankAccounts.page';

const fakeBankAccountInputData = {
  account_holder_name: 'John Doe',
  account_holder_type: 'individual',
  account_type: 'individual',
  routing_number: '123456789',
  account_number: '1234567891011',
  customer_id: 'cus_7Ay5mcUXAxwrN6wQEQUVEHBCJ',
  billing_details: {
    address_line_1: '111 Colorado Ave.',
    address_line_2: 'Apt 403',
    city: 'Des Moines',
    state: 'IA',
    postal_code: '51111',
    country: 'US',
  },
};

const fakeBankAccount = (data) => ({
  id: 'ba_7Ay5mcUXAxwrN6wQEQUVEHBCJ',
  account_id: 'acc_B518niGwGYKzig6vtrRVZGGGV',
  environment: 'test',
  customer_id: data.customer_id,
  billing_details: data.billing_details,
  created_at: '2024-06-30T01:02:29.212Z',
  modified_at: '2024-06-30T01:02:29.212Z',
  account_holder_name: data.account_holder_name,
  account_holder_type: data.account_holder_type,
  account_type: data.account_type,
  routing_number: data.routing_number,
  account_number_last4: data.account_number.slice(-4),
});

test.describe('js', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new BankAccountsJSPage(page);
    await homePage.goToPage();

    await homePage.isVisible();

    await homePage.elementsAllInOneReady();
  });

  test('should show 4 js elements', async ({ page }) => {
    const homePage = new BankAccountsJSPage(page);

    await homePage.elementsAllInOneReady();
  });

  test('should submit the JS Create Bank Account form', async ({ page }) => {
    const data = fakeBankAccountInputData;
    await page.route(
      'https://api.publicsquare.com/payment-methods/bank-accounts',
      async (route) => {
        const json = fakeBankAccount(data);
        await route.fulfill({ json });
      },
    );

    const homePage = new BankAccountsJSPage(page);

    await homePage.fillElementInput({
      routing_number: data.routing_number,
      account_number: data.account_number,
    });

    await homePage.submitElementForm();

    await homePage.expectSuccessModalIsVisible();
  });

  test('should submit the AllInOne JS Create Bank Account form', async ({ page }) => {
    const data = fakeBankAccountInputData;
    await page.route(
      'https://api.publicsquare.com/payment-methods/bank-accounts',
      async (route) => {
        const json = fakeBankAccount(data);
        await route.fulfill({ json });
      },
    );

    const homePage = new BankAccountsJSPage(page);

    await homePage.toggleAllInOne();

    await homePage.fillElementsInput({
      routing_number: data.routing_number,
      account_number: data.account_number,
    });

    await homePage.submitElementForm();

    await homePage.expectSuccessModalIsVisible();
  });
});

test.describe('react', () => {
  test.beforeEach(async ({ page }) => {
    const homePageReact = new BankAccountsReactPage(page);
    await homePageReact.goToPage();

    await homePageReact.isVisible();

    await homePageReact.elementsAllInOneReady();
  });

  test('should show 4 react elements', async ({ page }) => {
    const homePage = new BankAccountsReactPage(page);

    await homePage.elementsAllInOneReady();
  });

  test('should submit the React Create Bank Account form', async ({ page }) => {
    const data = fakeBankAccountInputData;
    await page.route(
      'https://api.publicsquare.com/payment-methods/bank-accounts',
      async (route) => {
        const json = fakeBankAccount(data);
        await route.fulfill({ json });
      },
    );

    const homePage = new BankAccountsReactPage(page);

    await homePage.fillElementInput({
      routing_number: data.routing_number,
      account_number: data.account_number,
    });

    await homePage.submitElementForm();

    await homePage.expectSuccessModalIsVisible();
  });

  test('should submit the AllInOne React Create Bank Account form', async ({ page }) => {
    const data = fakeBankAccountInputData;
    await page.route(
      'https://api.publicsquare.com/payment-methods/bank-accounts',
      async (route) => {
        const json = fakeBankAccount(data);
        await route.fulfill({ json });
      },
    );

    const homePage = new BankAccountsReactPage(page);

    await homePage.toggleAllInOne();

    await homePage.fillElementsInput({
      routing_number: data.routing_number,
      account_number: data.account_number,
    });

    await homePage.submitElementForm();

    await homePage.expectSuccessModalIsVisible();
  });
});
