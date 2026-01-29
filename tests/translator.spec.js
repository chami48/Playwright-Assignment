const { test, expect } = require("@playwright/test");
const cases = require("../test-data/cases");

test.setTimeout(60000);

test.describe("SwiftTranslator - Data Driven Tests", () => {
  for (const tc of cases) {
    test(`${tc.id} | ${tc.name}`, async ({ page }) => {

      // 1️⃣ Open site
      await page.goto("https://www.swifttranslator.com/singlish-to-sinhala", {
        waitUntil: "domcontentloaded",
      });

      // 2️⃣ Get input textarea
      const inputBox = page.locator("textarea").first();
      await expect(inputBox).toBeVisible();

      // 3️⃣ Type input
      await inputBox.fill(tc.input);

      // 4️⃣ Wait for real-time conversion
      await page.waitForTimeout(3000);

      // 5️⃣ Get output from LAST textarea
      const textareas = await page.locator("textarea").all();
      const outputBox = textareas[textareas.length - 1];
      const actual = (await outputBox.inputValue()).trim();

      // 6️⃣ Print output
      console.log(`\n${tc.id}\nINPUT: ${tc.input}\nACTUAL OUTPUT: ${actual}\n`);

      // 7️⃣ Validation
      expect(actual.length).toBeGreaterThan(0);
    });
  }
});
