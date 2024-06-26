import test from '@playwright/test'
import { HomePageJS, HomePageReact } from '../pages/home.page'

const fakeCardInputData = {
  cardholder_name: 'Test Person',
  card: {
    number: '4242424242424242',
    expiration_month: '12',
    expiration_year: `${new Date().getFullYear() + 1}`,
    cvc: '123',
  },
}

const fakeCard = (data) => ({
  id: 'card_Nv2w5mjHFSVQcbq3caHAhE',
  account_id: 'acc_HeBBapsdKxXxxCiur1jApZ',
  environment: 'test',
  cardholder_name: data.cardholder_name,
  last4: data.card.number.slice(data.card.number.length - 4),
  exp_month: data.card.cvc,
  exp_year: data.card.expiration_year,
  fingerprint: '5vFj1H8zK9enBAXFp9Er1tbwr6XUJYKRqFw8bJBTYLxh',
  created_at: '2024-06-24T13:51:24.9801189+00:00',
  modified_at: '2024-06-24T13:51:24.9801189+00:00',
})

test.describe('home', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePageJS(page)
    const homePageReact = new HomePageReact(page)
    await homePage.goToPage()

    await homePage.isVisible()
    await homePageReact.isVisible()

    await homePage.elementsReady()
    await homePageReact.elementsReady()
  })

  test('should show 4 js elements', async ({ page }) => {
    const homePage = new HomePageJS(page)

    await homePage.elementsReady()
  })

  test('should show 4 react elements', async ({ page }) => {
    const homePage = new HomePageReact(page)

    await homePage.elementsReady()
  })

  test('should submit the JS CardElement form', async ({ page }) => {
    const data = fakeCardInputData
    await page.route('https://api.basistheory.com/proxy', async (route) => {
      const json = fakeCard(data)
      await route.fulfill({ json })
    })

    const homePage = new HomePageJS(page)

    await homePage.fillCardElementNameInput(data.cardholder_name)

    await homePage.fillCardElementInput(data.card)

    await homePage.submitCardElementForm()

    await homePage.expectSuccessModalIsVisible()
  })

  test('should submit the JS CardElements form', async ({ page }) => {
    const data = fakeCardInputData
    await page.route('https://api.basistheory.com/proxy', async (route) => {
      const json = fakeCard(data)
      await route.fulfill({ json })
    })

    const homePage = new HomePageJS(page)

    await homePage.fillCardElementsNameInput(data.cardholder_name)

    await homePage.fillCardElementsInput(data.card)

    await homePage.submitCardElementsForm()

    await homePage.expectSuccessModalIsVisible()
  })

  test('should submit the React CardElement form', async ({ page }) => {
    const data = fakeCardInputData
    await page.route('https://api.basistheory.com/proxy', async (route) => {
      const json = fakeCard(data)
      await route.fulfill({ json })
    })

    const homePage = new HomePageReact(page)

    await homePage.fillCardElementNameInput(data.cardholder_name)

    await homePage.fillCardElementInput(data.card)

    await homePage.submitCardElementForm()

    await homePage.expectSuccessModalIsVisible()
  })

  test('should submit the React CardElements form', async ({ page }) => {
    const data = fakeCardInputData
    await page.route('https://api.basistheory.com/proxy', async (route) => {
      const json = fakeCard(data)
      await route.fulfill({ json })
    })

    const homePage = new HomePageReact(page)

    await homePage.fillCardElementsNameInput(data.cardholder_name)

    await homePage.fillCardElementsInput(data.card)

    await homePage.submitCardElementsForm()

    await homePage.expectSuccessModalIsVisible()
  })
})
