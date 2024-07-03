import { test, expect } from '@playwright/test';
import NewComputerPage from '../../support/pages/new-computer.page';
import { testData } from '../../support/utils/test-data';

test.describe('Scenario 2: Error handling for adding a new computer', () => {
  let newComputerPage: NewComputerPage;

  test.beforeEach(async ({ page }) => {
    newComputerPage = new NewComputerPage(page);
    await newComputerPage.load();
  });

  test('TC003: Verify Error Message for Missing Name Field', async () => {
    // .Act
    await newComputerPage.setIntroducedDate(testData.introducedDate);
    await newComputerPage.setDiscontinuedDate(testData.discontinuedDate);
    await newComputerPage.selectCompanyName();
    await newComputerPage.createANewComputer();

    // .Assert
    await expect(newComputerPage.getAlertError()).toContainText(testData.errorMessages.errorComputerNameMsg);
  });

  test('TC004: Verify Error Message for Invalid Introduced Date', async () => {
    // .Act
    await newComputerPage.setNewComputerName(testData.computerName);
    await newComputerPage.setIntroducedDate(testData.now.toFormat('dd-MM-yyyy'));
    await newComputerPage.setDiscontinuedDate(testData.discontinuedDate);
    await newComputerPage.selectCompanyName();
    await newComputerPage.createANewComputer();

    // .Assert
    await expect(newComputerPage.getAlertError()).toContainText(testData.errorMessages.errorIntroducedDataInvalidMsg);
  });

  test('TC005: Verify Handling of Discontinued Date Before Introduced Date', async () => {
    // .Act
    await newComputerPage.setNewComputerName(testData.computerName);
    await newComputerPage.setIntroducedDate(testData.introducedDate);
    await newComputerPage.setDiscontinuedDate(testData.discontinuedBeforeIndroducedDate);
    await newComputerPage.selectCompanyName();
    await newComputerPage.createANewComputer();

    // .Assert
    await expect(newComputerPage.getAlertError()).toContainText(testData.errorMessages.errorDiscontinuedDateBeforeIntroducedDateMsg);
  });

  // ToDo: ISSUE-004. Test case skipped until the functionality is implemented/fixed
  test.skip('TC006: Verify Maximum Character Limit for Name Field', async () => {
    // .Act
    await newComputerPage.setNewComputerName(null, 300); // Exceeds maximum character limit
    await newComputerPage.setIntroducedDate(testData.introducedDate);
    await newComputerPage.setDiscontinuedDate(testData.discontinuedDate);
    await newComputerPage.selectCompanyName();
    await newComputerPage.createANewComputer();

    // .Assert
    await expect(newComputerPage.getAlertError()).toContainText(testData.errorMessages.errorMaximumCharacterLimitExceededMsg);
  });
});
