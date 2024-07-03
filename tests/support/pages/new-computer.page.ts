import { Page, Locator } from '@playwright/test';

export default class NewComputerPage {
  private page: Page;
  private _url = '/computers/new'
  private selectors = {
    nameInput: '#name',
    introducedDateInput: '#introduced',
    discontinuedDateInput: '#discontinued',
    companySelect: '#company',
    submitButton: 'input[type="submit"]',
    alertMessage: '#main > form > fieldset > div.clearfix.error > div > span',
  };

  constructor(page: Page) {
    this.page = page;
  }

  async load() {
    await this.page.goto(this._url);
  }

  async setNewComputerName(name: string | null, numOfChars?: number) {
    const computerName = numOfChars ? 'a'.repeat(numOfChars) : name;
    await this.page.fill(this.selectors.nameInput, computerName || '');
  }

  async setIntroducedDate(date: string) {
    await this.page.fill(this.selectors.introducedDateInput, date);
  }

  async setDiscontinuedDate(date: string) {
    await this.page.fill(this.selectors.discontinuedDateInput, date);
  }

  async selectCompanyName(companyValue: string = '1') { // Default value or pass a specific value
    await this.page.selectOption(this.selectors.companySelect, companyValue);
  }

  async createANewComputer() {
    await this.page.click(this.selectors.submitButton);
  }

  getAlertError(): Locator {
    return this.page.locator(this.selectors.alertMessage);
  }
}
