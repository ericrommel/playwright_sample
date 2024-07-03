import { Page } from '@playwright/test';

export default class ListComputersPage {
  private page: Page;
  private _url = '/computers'
  private selectors = {
    computerCreationAlert: '#main > div.alert-message.warning',
    pageName: '#main > h1',
    paginationActiveLink: '.pagination li.active a',
    searchBox: '#searchbox',
    searchSubmitButton: '#searchsubmit',
  };

  constructor(page: Page) {
    this.page = page;
  }

  async load() {
    await this.page.goto(this._url);
  }

  async checkAlertComputerCreated(computerName: string) {
    const expectedMessage = `Done !  Computer ${computerName} has been created`; // ToDo: Register UI bug: too many spaces
    await this.page.waitForSelector(this.selectors.computerCreationAlert);
    const alertText = await this.page.textContent(this.selectors.computerCreationAlert);

    if (!alertText?.includes(computerName)) {
      throw new Error(`Expected alert message to contain '${computerName}', but got '${alertText}'`);
    }
    
    if (alertText !== expectedMessage) {
      throw new Error(`Expected full alert message to be '${expectedMessage}', but got '${alertText}'`);
    }
  }

  async getNumberOfComputersRegistered(): Promise<number> {
    const countText: string = await this.page.textContent(this.selectors.pageName) || '';
    return parseInt(countText.trim().split(' ')[0]);
  }

  async searchComputerByName(name: string) {
    await this.page.fill(this.selectors.searchBox, name);
    await this.page.click(this.selectors.searchSubmitButton);
  }

  async waitForComputerInList(computerName: string) {
    await this.page.waitForSelector(`text=${computerName}`);
  }

  async validateSearchComputer(computerName: string) {
    await this.page.waitForSelector(`text=${computerName}`);
    const computerElement = await this.page.locator(`text=${computerName}`);

    if (!computerElement) {
      throw new Error(`Computer '${computerName}' not found in the list.`);
    }
  }
}
