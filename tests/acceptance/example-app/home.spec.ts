import test, { expect } from '@playwright/test'

test.describe('home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should show 4 js elements', async ({ page }) => {
    const cardElement = await page.locator('#card-element')
    const cardNumberElement = await page.locator('#card-number-element')
    const cardExpirationDateElement = await page.locator(
      '#card-expiration-date-element'
    )
    const cardVerificationCodeElement = await page.locator(
      '#card-verification-code-element'
    )

    expect(cardElement).toBeDefined()
    expect(cardNumberElement).toBeDefined()
    expect(cardExpirationDateElement).toBeDefined()
    expect(cardVerificationCodeElement).toBeDefined()
  })

  test('should show 4 react elements', async ({ page }) => {
    const cardElement = await page.locator('#react-card-element')
    const cardNumberElement = await page.locator('#react-card-number-element')
    const cardExpirationDateElement = await page.locator(
      '#react-card-expiration-date-element'
    )
    const cardVerificationCodeElement = await page.locator(
      '#react-card-verification-code-element'
    )

    expect(cardElement).toBeDefined()
    expect(cardNumberElement).toBeDefined()
    expect(cardExpirationDateElement).toBeDefined()
    expect(cardVerificationCodeElement).toBeDefined()
  })
})
