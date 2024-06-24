import { expect, type Page, type Locator } from '@playwright/test'

class HomePage {
  private page: Page
  private cardElementForm: Locator
  private cardElementsForm: Locator
  private cardElement: Locator
  private cardNumberElement: Locator
  private cardExpirationDateElement: Locator
  private cardVerificationCodeElement: Locator
  private successModal: Locator

  constructor(page: Page) {
    this.page = page
    this.cardElementForm = page.locator('form[name="js-form-cardelement"]')
    this.cardElementsForm = page.locator('form[name="js-form-cardelements"]')
    this.cardElement = this.cardElementForm.locator('#card-element')
    this.cardNumberElement = this.cardElementsForm.locator(
      '#card-number-element'
    )
    this.cardExpirationDateElement = this.cardElementsForm.locator(
      '#card-expiration-date-element'
    )
    this.cardVerificationCodeElement = this.cardElementsForm.locator(
      '#card-verification-code-element'
    )
    this.successModal = page.getByTestId('success-modal')
  }

  async goToPage() {
    await this.page.goto('/')
  }

  async isVisible() {
    expect(await this.cardElementForm).toBeVisible()
    expect(await this.cardElementsForm).toBeVisible()
  }

  async jsElementsReady() {
    expect(
      await this.cardElement
        .frameLocator('iframe')
        .locator('#cardNumber')
        .innerHTML()
    ).toBeDefined()
    expect(await this.cardElement).toBeVisible()
    expect(await this.cardNumberElement).toBeVisible()
    expect(await this.cardVerificationCodeElement).toBeVisible()
    expect(await this.cardExpirationDateElement).toBeVisible()
  }

  getCardElementNameInput() {
    return this.cardElementForm.locator('input[name="cardholder_name"]')
  }

  async fillCardElementNameInput(value: string) {
    const input = await this.getCardElementNameInput()
    await input.fill(value)
    expect(await input.inputValue()).toEqual(value)
  }

  getCardElementsNameInput() {
    return this.cardElementsForm.locator('input[name="cardholder_name"]')
  }

  async fillCardElementsNameInput(value: string) {
    const input = await this.getCardElementsNameInput()
    await input.fill(value)
    expect(await input.inputValue()).toEqual(value)
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
    await this.cardElementsForm.locator('button[type="submit"]').click()
  }

  async expectSuccessModalIsVisible() {
    await this.page.waitForTimeout(1)
    expect(await this.successModal).toBeVisible()
  }
}

export { HomePage }
