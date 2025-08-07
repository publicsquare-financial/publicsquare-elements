import { expect, type Page, type Locator } from '@playwright/test';

class BankVerifyJSPage {
  private page: Page;
  private bankVerificationIframe: Locator;
  private technologyToggle: Locator;
  private showElementButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.technologyToggle = page.getByTestId('js-type-button').first();
    this.bankVerificationIframe = page.locator('#publicsquare-verification-widget iframe');
    this.showElementButton = page.getByRole('button', { name: 'Open verification element' });
  }

  async goToPage() {
    await this.page.goto('/bank-verification');
    await this.technologyToggle.click();
    await this.showElementButton.click();
  }

  async isVisible() {
    await expect(await this.bankVerificationIframe).toBeVisible({ timeout: 30000 });
  }
}

class BankVerifyReactPage {
  private page: Page;
  private technologyToggle: Locator;
  private bankVerificationIframe: Locator;

  constructor(page: Page) {
    this.page = page;
    this.technologyToggle = page.getByTestId('react-type-button').first();
    this.bankVerificationIframe = page.locator('#publicsquare-verification-widget iframe');
  }

  async isVisible() {
    await expect(await this.bankVerificationIframe).toBeVisible({ timeout: 30000 });
  }

  async goToPage() {
    await this.page.goto('/bank-verification');
    await this.technologyToggle.click();
  }
}

export { BankVerifyJSPage, BankVerifyReactPage };
