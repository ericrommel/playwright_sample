# Playwright Sample Exercise


## Description of the Exercise

Write automated tests for the demo application available at <https://computer-database.gatling.io/computers>, focusing on the following functionality:

- Adding a new computer


### Expectations

Demonstrate Playwright knowledge


### Acceptance Criteria

- [X] Come up with at least two scenarios for automation.
- [X] Ensure that the tests cover the basic and edge cases for each functionality.


### Technical Criteria

- [X] Use Playwright and JavaScript/TypeScript to write the test scripts.
- [X] Your tests should run smoothly


## Description of the Solution

The solution was designed in the simplest way to demonstrate the use of Playwright.


### General settings

- Install and set configuration if needed for:
  - [Node.js](https://nodejs.org/en/download/) (version used: v20.10.0)
- Install dependencies

  ```batch
  npm install
  ```


### Manual execution

Run the tests:
  
  ```batch
  npm run test:e2e
  ```


### Report

After a test execution, you can see the report running the command below:

  ```batch
  npm run test:report
  ```


### CI/CD

This project uses GitHub Actions as a sample CI in [GitHub](https://github.com/ericrommel/playwright_sample/actions/workflows/playwright.yml)


### Deliverables

Check out the the documents below to learn more about the tests:

- [Test Strategy document](docs/test-strategy.md)
- [Test Plan document](docs/test-plan.md)
- Test Case documents:
  1. [Test Case: Verify Alert Message for Successful Addition](docs/test-cases/T001.md)
  2. [Test Case: Verify that the new computer is saved in the database and reflected in the list of computers.](docs/test-cases/T002.md)
  3. [Test Case: Verify Error Message for Missing Name Field](docs/test-cases/T003.md)
  4. [Test Case: Verify Error Message for Invalid Introduced Date](docs/test-cases/T004.md)
  5. [Test Case: Verify Handling of Discontinued Date Before Introduced Date](docs/test-cases/T005.md)
  6. [Test Case: Verify Maximum Character Limit for Name Field](docs/test-cases/T006.md)
