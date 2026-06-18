import { expect, type Page, type Locator, type FrameLocator } from '@playwright/test'

export type Flow = 'iframe' | 'redirect'

type CardInput = {
  number: string
  expiration_month: string
  expiration_year: string
  cvc: string
}

type TechConfig = {
  toggleTestId: string
  formName: (flow: Flow) => string
  idPrefix: (flow: Flow) => string
}

const TECH_CONFIG: Record<'js' | 'react', TechConfig> = {
  js: {
    toggleTestId: 'js-type-button',
    formName: () => 'js-3ds-form',
    idPrefix: () => 'js-threeds',
  },
  react: {
    toggleTestId: 'react-type-button',
    formName: (flow) => `react-3ds-${flow}-form`,
    idPrefix: (flow) => `threeds-${flow}`,
  },
}

class ThreeDSPage {
  protected page: Page
  protected cfg: TechConfig
  private technologyToggle: Locator
  private iframeTab: Locator
  private redirectTab: Locator
  private allInOneToggle: Locator

  constructor(page: Page, tech: 'js' | 'react') {
    this.page = page
    this.cfg = TECH_CONFIG[tech]
    this.technologyToggle = page.getByTestId(this.cfg.toggleTestId).first()
    this.iframeTab = page.getByTestId('threeds-iframe-tab')
    this.redirectTab = page.getByTestId('threeds-redirect-tab')
    this.allInOneToggle = page.getByTestId('all-in-one-toggle')
  }

  async goToPage() {
    await this.page.goto('/three-ds')
    await this.technologyToggle.click()
  }

  async selectFlow(flow: Flow) {
    await (flow === 'iframe' ? this.iframeTab : this.redirectTab).click()
    await expect(this.form(flow)).toBeVisible()
  }

  async toggleAllInOne() {
    await this.allInOneToggle.click()
  }

  form(flow: Flow): Locator {
    return this.page.locator(`form[name="${this.cfg.formName(flow)}"]`)
  }

  cardElement(flow: Flow): Locator {
    return this.page.locator(`#${this.cfg.idPrefix(flow)}-card-element`)
  }

  private cardElementFrame(flow: Flow): FrameLocator {
    return this.cardElement(flow).frameLocator('iframe')
  }

  async expectFormVisible(flow: Flow) {
    await expect(this.form(flow)).toBeVisible()
  }

  async expectCardElementReady(flow: Flow) {
    await expect(this.cardElementFrame(flow).locator('#cardNumber')).toBeVisible({
      timeout: 30000,
    })
  }

  async fillName(flow: Flow, value: string) {
    const input = this.form(flow).locator('input[name="cardholder_name"]')
    await input.fill(value)
    await expect(input).toHaveValue(value)
  }

  async fillCard(flow: Flow, input: CardInput) {
    const frame = this.cardElementFrame(flow)
    await frame.locator('#cardNumber').fill(input.number)
    await frame
      .locator('#expirationDate')
      .fill(`${input.expiration_month}/${input.expiration_year.slice(-2)}`)
    await frame.locator('#cvc').fill(input.cvc)
  }

  async submit(flow: Flow) {
    await this.form(flow).locator('button[type="submit"]').click()
  }

  async expectComplete() {
    await expect(this.page.getByText(/Flow complete|Frictionless/)).toBeVisible({
      timeout: 30000,
    })
  }

  async expectError() {
    await expect(this.page.getByText('Error:')).toBeVisible({ timeout: 30000 })
  }

  async expectChallengeVisible() {
    await expect(this.page.getByText('3DS Challenge')).toBeVisible({ timeout: 30000 })
  }
}

class ThreeDSJSPage extends ThreeDSPage {
  constructor(page: Page) {
    super(page, 'js')
  }
}

class ThreeDSReactPage extends ThreeDSPage {
  constructor(page: Page) {
    super(page, 'react')
  }
}

export { ThreeDSJSPage, ThreeDSReactPage }
