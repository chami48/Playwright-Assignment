# SwiftTranslator Test Automation

**ITPM Assignment 1 - Automated Testing with Playwright**

This project contains automated tests for the SwiftTranslator web application (https://swifttranslator.com), which converts Singlish text to Sinhala.

## What This Project Does

This test suite automates the testing of SwiftTranslator's core functionality. Instead of manually typing test cases and checking outputs, these automated tests can run through 35 different scenarios in minutes.

The tests check:
- Whether translations are accurate
- How the system handles different sentence types
- Edge cases like typos, extra spaces, and special characters
- UI behavior and real-time updates

## Test Coverage

**Functional Tests (33 cases)**
- 24 positive scenarios - things that should work correctly
- 9 negative scenarios - testing error handling and edge cases

**UI Tests (2 cases)**
- Real-time output updates
- Clear button functionality

## Project Structure

```
itpm-playwright/
├── tests/
│   └── translator.spec.js       # Main test file
├── test-data/
│   └── cases.js                 # All test cases stored here
├── playwright.config.js         # Playwright settings
├── package.json                 # Project dependencies
└── README.md                    # This file
```

## Setup Instructions

### Prerequisites

You need Node.js installed on your computer. Download it from https://nodejs.org (get the LTS version).

Check if it's installed:
```bash
node -v
npm -v
```

### Installation

1. Clone this repository
```bash
git clone <git@github.com:chami48/Playwright-Assignment.git>
cd <project-folder>
```

2. Install dependencies
```bash
npm install
```

3. Install Playwright browsers
```bash
npx playwright install
```

## Running the Tests

Run all tests:
```bash
npx playwright test --project=chromium --headed
```

Run a specific test:
```bash
npx playwright test -g "Pos_Fun_0004"
```

Run without opening browser window:
```bash
npx playwright test --project=chromium
```

## Viewing Results

After tests finish, view the HTML report:
```bash
npx playwright show-report
```

The report shows which tests passed or failed, how long they took, and any error messages.

## How It Works

All test cases are stored in `test-data/cases.js`. Each test case has:
- A unique ID (like Pos_Fun_0004)
- Input text in Singlish
- Expected output in Sinhala
- Test description

The main test file (`translator.spec.js`) loops through these cases, enters the input, waits for the output, and compares it with the expected result.

## Notes

- Need an internet connection to run these tests
- Tests use Chromium browser for consistency
- Don't close the browser manually while tests are running
- Some outputs might vary slightly due to how the translation system works

## Technologies Used

- **Playwright** - Browser automation framework
- **Node.js** - JavaScript runtime
- **Chromium** - Testing browser
- **JavaScript** - Programming language

## Author

**Student Name:** [CHAMYA N D]  
**Registration Number:** [IT23848184]  
**Module:** IT3040 - ITPM  
**Institution:** [SLIIT]

