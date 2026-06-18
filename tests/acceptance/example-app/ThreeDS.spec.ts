import test, { expect, type Page } from '@playwright/test'
import { ThreeDSJSPage, ThreeDSReactPage } from '../pages/ThreeDS.page'

const card = {
  number: '4242424242424242',
  expiration_month: '12',
  expiration_year: `${new Date().getFullYear() + 1}`,
  cvc: '123',
}

const fakeCard = {
  id: 'card_test_3ds',
  token: 'tok_test_3ds',
  account_id: 'acc_test',
  environment: 'test',
  cardholder_name: 'Jane Doe',
  last4: card.number.slice(-4),
  exp_month: card.expiration_month,
  exp_year: card.expiration_year,
}

const ACS_REDIRECT_URL = 'https://acs.example.test/challenge?apiKey=key_test_pub'

async function mockRedirectFlow(page: Page) {
  await page.route('https://api.test.basistheory.com/proxy', (route) =>
    route.fulfill({ json: fakeCard })
  )
  await page.route('**/api/payment-intents', (route) =>
    route.fulfill({ json: { id: 'pmt_int_test', status: 'requires_confirmation' } })
  )
  await page.route('**/api/payment-intents/*/confirm', (route) =>
    route.fulfill({
      json: {
        id: 'pmt_int_test',
        status: 'requires_action',
        next_action: {
          type: 'three_d_secure',
          three_d_secure: {
            session_id: 'tds_test',
            redirect_url: ACS_REDIRECT_URL,
            transport: 'redirect',
          },
        },
      },
    })
  )
  await page.route('https://acs.example.test/**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<html><body>ACS challenge stub</body></html>',
    })
  )
}

const techs = [
  { name: 'js', makePage: (page: Page) => new ThreeDSJSPage(page) },
  { name: 'react', makePage: (page: Page) => new ThreeDSReactPage(page) },
] as const

for (const { name, makePage } of techs) {
  test.describe(name, () => {
    test.beforeEach(async ({ page }) => {
      const threeDs = makePage(page)
      await threeDs.goToPage()
    })

    test('iframe tab shows the form and card element', async ({ page }) => {
      const threeDs = makePage(page)
      await threeDs.selectFlow('iframe')
      await threeDs.expectFormVisible('iframe')
      await threeDs.expectCardElementReady('iframe')
    })

    test('redirect tab shows the form and card element', async ({ page }) => {
      const threeDs = makePage(page)
      await threeDs.selectFlow('redirect')
      await threeDs.expectFormVisible('redirect')
      await threeDs.expectCardElementReady('redirect')
    })

    test('redirect flow navigates to the ACS challenge URL', async ({ page }) => {
      await mockRedirectFlow(page)

      const threeDs = makePage(page)
      await threeDs.selectFlow('redirect')
      await threeDs.expectCardElementReady('redirect')
      await threeDs.fillName('redirect', 'Jane Doe')
      await threeDs.fillCard('redirect', card)
      await threeDs.submit('redirect')

      await expect(page).toHaveURL(/acs\.example\.test/, { timeout: 30000 })
    })

    test.fixme('iframe flow completes after the 3DS challenge', async ({ page }) => {
      const threeDs = makePage(page)
      await threeDs.selectFlow('iframe')
      await threeDs.expectCardElementReady('iframe')
      await threeDs.fillName('iframe', 'Jane Doe')
      await threeDs.fillCard('iframe', card)
      await threeDs.submit('iframe')
      await threeDs.expectChallengeVisible()
      await threeDs.expectComplete()
    })
  })
}
