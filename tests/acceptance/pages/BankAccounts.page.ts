import { expect, type Page, type Locator } from '@playwright/test'

class BankAccountsJSPage {
  private page: Page
  private technologyToggle: Locator
  private allInOneToggle: Locator
  private successModal: Locator
  private elementForm: Locator
  private routingNumberElement: Locator
  private accountNumberElement: Locator

  constructor(page: Page) {
    this.page = page
    this.technologyToggle = page.getByTestId('js-type-button')
    this.allInOneToggle = page.getByTestId('all-in-one-toggle')
    this.elementForm = page.locator('form[name="js-form-bank-account-element"]')
    this.routingNumberElement = page.locator(
      '#psq-ach-routing-number-container>.publicsquare-element-input'
    )
    this.accountNumberElement = page.locator(
      '#psq-ach-account-number-container>.publicsquare-element-input'
    )
    this.successModal = page.getByTestId('success-modal')
  }

  async goToPage() {
    await this.page.goto('/bank-accounts')
    await this.technologyToggle.click()
  }

  async isVisible() {
    await expect(await this.elementForm).toBeVisible()
  }

  async toggleAllInOne() {
    await this.allInOneToggle.click()
    await expect(await this.elementForm).toBeVisible()
  }

  async elementsAllInOneReady() {
    await expect(await this.routingNumberElement.innerHTML()).toBeDefined()
    await expect(await this.accountNumberElement.innerHTML()).toBeDefined()
  }

  async elementsIndividualReady() {
    await expect(await this.routingNumberElement.innerHTML()).toBeDefined()
    await expect(await this.accountNumberElement.innerHTML()).toBeDefined()
  }

  async fillElementInput(input: {
    routing_number: string
    account_number: string
  }) {
    await this.routingNumberElement.fill(input.routing_number)
    await this.accountNumberElement.fill(input.account_number)
  }

  async submitElementForm() {
    await this.elementForm.locator('button[type="submit"]').click()
  }

  async fillElementsInput(input: {
    routing_number: string
    account_number: string
  }) {
    await this.routingNumberElement.fill(input.routing_number)
    await this.accountNumberElement.fill(input.account_number)
  }

  async submitElementsForm() {
    await this.elementForm.locator('button[type="submit"]').click()
  }

  async expectSuccessModalIsVisible() {
    await expect(await this.successModal).toBeVisible()
  }
}

class BankAccountsReactPage {
  private page: Page
  private technologyToggle: Locator
  private allInOneToggle: Locator
  private successModal: Locator
  private elementForm: Locator
  private routingNumberElement: Locator
  private accountNumberElement: Locator

  constructor(page: Page) {
    this.page = page
    this.technologyToggle = page.getByTestId('react-type-button')
    this.allInOneToggle = page.getByTestId('all-in-one-toggle')
    this.elementForm = page.locator(
      'form[name="react-form-bank-account-element"]'
    )
    this.routingNumberElement = page.locator(
      '#psq-ach-routing-number-container>.publicsquare-element-input'
    )
    this.accountNumberElement = page.locator(
      '#psq-ach-account-number-container>.publicsquare-element-input'
    )
    this.successModal = page.getByTestId('success-modal')
  }

  async goToPage() {
    await this.page.goto('/bank-accounts')
    await this.technologyToggle.click()
  }

  async isVisible() {
    await expect(await this.elementForm).toBeVisible()
  }

  async toggleAllInOne() {
    await this.allInOneToggle.click()
    await expect(await this.elementForm).toBeVisible()
  }

  async elementsAllInOneReady() {
    await expect(await this.routingNumberElement.innerHTML()).toBeDefined()
    await expect(await this.accountNumberElement.innerHTML()).toBeDefined()
  }

  async elementsIndividualReady() {
    await expect(await this.routingNumberElement.innerHTML()).toBeDefined()
    await expect(await this.accountNumberElement.innerHTML()).toBeDefined()
  }

  getElementNameInput() {
    return this.elementForm.locator('input[name="cardholder_name"]')
  }

  async fillElementNameInput(value: string) {
    const input = await this.getElementNameInput()
    await input.fill(value)
    await expect(await input.inputValue()).toEqual(value)
  }

  getElementsNameInput() {
    return this.elementForm.locator('input[name="cardholder_name"]')
  }

  async fillElementsNameInput(value: string) {
    const input = await this.getElementsNameInput()
    await input.fill(value)
    await expect(await input.inputValue()).toEqual(value)
  }

  async fillElementInput(input: {
    routing_number: string
    account_number: string
  }) {
    await this.routingNumberElement.fill(input.routing_number)
    await this.accountNumberElement.fill(input.account_number)
  }

  async submitElementForm() {
    await this.elementForm.locator('button[type="submit"]').click()
  }

  async fillElementsInput(input: {
    routing_number: string
    account_number: string
  }) {
    await this.routingNumberElement.fill(input.routing_number)
    await this.accountNumberElement.fill(input.account_number)
  }

  async submitElementsForm() {
    await this.elementForm.locator('button[type="submit"]').click()
  }

  async expectSuccessModalIsVisible() {
    await expect(await this.successModal).toBeVisible()
  }
}

export { BankAccountsJSPage, BankAccountsReactPage }
