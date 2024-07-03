import { test, expect } from '@playwright/test';
import ListComputersPage from '../../support/pages/list-computer.page';
import NewComputerPage from '../../support/pages/new-computer.page';
import { testData } from '../../support/utils/test-data';

test.describe('Scenario 1: Add a new computer successfully', () => {
  let newComputerPage: NewComputerPage;
  let listComputersPage: ListComputersPage;

  test.beforeEach(async ({ page }) => {
    // .Arrange
    listComputersPage = new ListComputersPage(page);
    newComputerPage = new NewComputerPage(page);
    await listComputersPage.load();
  });

  async function stepsToCreateANewComputer() {
    await newComputerPage.load();
    await newComputerPage.setNewComputerName(testData.computerName);
    await newComputerPage.setIntroducedDate(testData.introducedDate);
    await newComputerPage.setDiscontinuedDate(testData.discontinuedDate);
    await newComputerPage.selectCompanyName();
    await newComputerPage.createANewComputer();
  }

  test('TC001: Verify Alert Message for Successful Addition', async () => {
    // .Act
    await stepsToCreateANewComputer();

    // .Assert
    await listComputersPage.checkAlertComputerCreated(testData.computerName);
  });

  // ToDo: ISSUE-005. Test case skipped until the functionality is implemented/fixed
  test.skip('TC002: Verify Database Persistence', async () => {
    // .Arrange
    const initialCount = await listComputersPage.getNumberOfComputersRegistered();

    // .Act
    await stepsToCreateANewComputer();
    const newCount = await listComputersPage.getNumberOfComputersRegistered();
    
    // .Assert
    expect(newCount).toBe(initialCount);

    // .Act
    await listComputersPage.searchComputerByName(testData.computerName);

    // .Assert
    await listComputersPage.validateSearchComputer(testData.computerName);
  });
});
