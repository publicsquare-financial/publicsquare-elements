import { expect, type Page, type Locator } from '@playwright/test'

class DebitCreditCardsJSPage {
  private page: Page
  private technologyToggle: Locator
  private allInOneToggle: Locator
  private cardElementForm: Locator
  private cardElement: Locator
  private cardNumberElement: Locator
  private cardExpirationDateElement: Locator
  private cardVerificationCodeElement: Locator
  private successModal: Locator

  constructor(page: Page) {
    this.page = page
    this.technologyToggle = page.getByTestId('js-type-button')
    this.allInOneToggle = page.getByTestId('all-in-one-toggle')
    this.cardElementForm = page.locator('form[name="js-form-cardelement"]')
    this.cardElement = this.cardElementForm.locator('#card-element')
    this.cardNumberElement = this.cardElementForm.locator(
      '#card-number-element'
    )
    this.cardExpirationDateElement = this.cardElementForm.locator(
      '#card-expiration-date-element'
    )
    this.cardVerificationCodeElement = this.cardElementForm.locator(
      '#card-verification-code-element'
    )
    this.successModal = page.getByTestId('capture-modal')
  }

  async goToPage() {
    await this.page.goto('/debit-credit-cards')
    await this.technologyToggle.click()
  }

  async isVisible() {
    await expect(await this.cardElementForm).toBeVisible()
  }

  async toggleAllInOne() {
    await this.allInOneToggle.click()
    await expect(await this.cardElementForm).toBeVisible()
  }

  async elementsAllInOneReady() {
    await expect(
      await this.cardElement
        .frameLocator('iframe')
        .locator('#cardNumber')
        .innerHTML()
    ).toBeDefined()
    await expect(await this.cardElement.innerHTML()).toBeDefined()
  }

  async elementsIndividualReady() {
    await expect(
      await this.cardElement
        .frameLocator('iframe')
        .locator('#cardNumber')
        .innerHTML()
    ).toBeDefined()
    await expect(await this.cardElement.innerHTML()).toBeDefined()
    await expect(await this.cardNumberElement.innerHTML()).toBeDefined()
    await expect(
      await this.cardVerificationCodeElement.innerHTML()
    ).toBeDefined()
    await expect(await this.cardExpirationDateElement.innerHTML()).toBeDefined()
  }

  getCardElementNameInput() {
    return this.cardElementForm.locator('input[name="cardholder_name"]')
  }

  async fillCardElementNameInput(value: string) {
    const input = await this.getCardElementNameInput()
    await input.fill(value)
    await expect(await input.inputValue()).toEqual(value)
  }

  getCardElementsNameInput() {
    return this.cardElementForm.locator('input[name="cardholder_name"]')
  }

  async fillCardElementsNameInput(value: string) {
    const input = await this.getCardElementsNameInput()
    await input.fill(value)
    await expect(await input.inputValue()).toEqual(value)
  }

  async fillCardElementInput(input: {
    number: string
    expiration_month: string
    expiration_year: string
    cvc: string
  }) {
    const iframe = await this.cardElement.frameLocator('iframe')
    await iframe.locator('#cardNumber').fill(input.number)
    await iframe
      .locator('#expirationDate')
      .fill(
        `${input.expiration_month}/${input.expiration_year.slice(
          input.expiration_year.length - 2
        )}`
      )
    await iframe.locator('#cvc').fill(input.cvc)
  }

  async submitCardElementForm() {
    await this.cardElementForm.locator('button[type="submit"]').click()
  }

  async fillCardElementsInput(input: {
    number: string
    expiration_month: string
    expiration_year: string
    cvc: string
  }) {
    await this.cardNumberElement
      .frameLocator('iframe')
      .locator('#cardNumber')
      .fill(input.number)
    await this.cardExpirationDateElement
      .frameLocator('iframe')
      .locator('#expirationDate')
      .fill(
        `${input.expiration_month}/${input.expiration_year.slice(
          input.expiration_year.length - 2
        )}`
      )
    await this.cardVerificationCodeElement
      .frameLocator('iframe')
      .locator('#cvc')
      .fill(input.cvc)
  }

  async submitCardElementsForm() {
    await this.cardElementForm.locator('button[type="submit"]').click()
  }

  async expectSuccessModalIsVisible() {
    await expect(await this.successModal).toBeVisible()
  }
}

class DebitCreditCardsReactPage {
  private page: Page
  private technologyToggle: Locator
  private allInOneToggle: Locator
  private successModal: Locator
  private cardElementForm: Locator
  private cardElement: Locator
  private cardNumberElement: Locator
  private cardExpirationDateElement: Locator
  private cardVerificationCodeElement: Locator

  constructor(page: Page) {
    this.page = page
    this.technologyToggle = page.getByTestId('react-type-button')
    this.allInOneToggle = page.getByTestId('all-in-one-toggle')
    this.cardElementForm = page.locator('form[name="react-form-cardelement"]')
    this.cardElement = page.locator('#react-card-element')
    this.cardNumberElement = page.locator('#react-card-number-element')
    this.cardExpirationDateElement = page.locator(
      '#react-card-expiration-date-element'
    )
    this.cardVerificationCodeElement = page.locator(
      '#react-card-verification-code-element'
    )
    this.successModal = page.getByTestId('capture-modal')
  }

  async goToPage() {
    await this.page.goto('/debit-credit-cards')
    await this.technologyToggle.click()
  }

  async isVisible() {
    await expect(await this.cardElementForm).toBeVisible()
  }

  async toggleAllInOne() {
    await this.allInOneToggle.click()
    await expect(await this.cardElementForm).toBeVisible()
  }

  async elementsAllInOneReady() {
    await expect(
      await this.cardElement
        .frameLocator('iframe')
        .locator('#cardNumber')
        .innerHTML()
    ).toBeDefined()
    await expect(await this.cardElement.innerHTML()).toBeDefined()
  }

  async elementsIndividualReady() {
    await expect(
      await this.cardElement
        .frameLocator('iframe')
        .locator('#cardNumber')
        .innerHTML()
    ).toBeDefined()
    await expect(await this.cardElement.innerHTML()).toBeDefined()
    await expect(await this.cardNumberElement.innerHTML()).toBeDefined()
    await expect(
      await this.cardVerificationCodeElement.innerHTML()
    ).toBeDefined()
    await expect(await this.cardExpirationDateElement.innerHTML()).toBeDefined()
  }

  getCardElementNameInput() {
    return this.cardElementForm.locator('input[name="cardholder_name"]')
  }

  async fillCardElementNameInput(value: string) {
    const input = await this.getCardElementNameInput()
    await input.fill(value)
    await expect(await input.inputValue()).toEqual(value)
  }

  getCardElementsNameInput() {
    return this.cardElementForm.locator('input[name="cardholder_name"]')
  }

  async fillCardElementsNameInput(value: string) {
    const input = await this.getCardElementsNameInput()
    await input.fill(value)
    await expect(await input.inputValue()).toEqual(value)
  }

  async fillCardElementInput(input: {
    number: string
    expiration_month: string
    expiration_year: string
    cvc: string
  }) {
    const iframe = await this.cardElement.frameLocator('iframe')
    await iframe.locator('#cardNumber').fill(input.number)
    await iframe
      .locator('#expirationDate')
      .fill(
        `${input.expiration_month}/${input.expiration_year.slice(
          input.expiration_year.length - 2
        )}`
      )
    await iframe.locator('#cvc').fill(input.cvc)
  }

  async submitCardElementForm() {
    await this.cardElementForm.locator('button[type="submit"]').click()
  }

  async fillCardElementsInput(input: {
    number: string
    expiration_month: string
    expiration_year: string
    cvc: string
  }) {
    await this.cardNumberElement
      .frameLocator('iframe')
      .locator('#cardNumber')
      .fill(input.number)
    await this.cardExpirationDateElement
      .frameLocator('iframe')
      .locator('#expirationDate')
      .fill(
        `${input.expiration_month}/${input.expiration_year.slice(
          input.expiration_year.length - 2
        )}`
      )
    await this.cardVerificationCodeElement
      .frameLocator('iframe')
      .locator('#cvc')
      .fill(input.cvc)
  }

  async submitCardElementsForm() {
    await this.cardElementForm.locator('button[type="submit"]').click()
  }

  async expectSuccessModalIsVisible() {
    await expect(await this.successModal).toBeVisible()
  }
}

export { DebitCreditCardsJSPage, DebitCreditCardsReactPage }
