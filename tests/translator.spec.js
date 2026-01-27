const { test, expect } = require("@playwright/test");
const cases = require("../test-data/cases");

// Run only chromium safely
test.setTimeout(120000);

async function openSite(page) {
  await page.goto("https://swifttranslator.com", {
    waitUntil: "domcontentloaded",
    timeout: 90000,
  });

  await page.getByRole("textbox").first().waitFor({ timeout: 30000 });
}

// 🔥 Working Output Selector (from your successful test)
function getOutputLocator(page) {
  return page
    .getByText("Sinhala", { exact: true })
    .locator("..")
    .locator("div")
    .nth(1);
}

test.describe("SwiftTranslator - 34 Automated Test Cases", () => {
  for (const tc of cases) {
    test(`${tc.id} | ${tc.name}`, async ({ page }) => {
      await openSite(page);

      const inputBox = page.getByRole("textbox").first();
      const outputBox = getOutputLocator(page);

      // Clear and type input
      await inputBox.fill("");
      await inputBox.type(tc.input, { delay: 30 });

      // Wait until translation appears
      await expect(outputBox).toHaveText(/.+/, { timeout: 30000 });

      const actual = (await outputBox.innerText()).trim();

      console.log(
        `\n${tc.id}\nINPUT: ${tc.input}\nACTUAL OUTPUT: ${actual}\n`
      );

      // ✅ Validation
      if (tc.expected && tc.expected.trim() !== "") {
        // Exact comparison if expected exists
        expect(actual).toBe(tc.expected.trim());
      } else {
        // Baseline run – only verify output exists
        expect(actual.length).toBeGreaterThan(0);
      }
    });
  }
});

// Run with: npx playwright test