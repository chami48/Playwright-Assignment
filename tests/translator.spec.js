const { test, expect } = require("@playwright/test");
const cases = require("../test-data/cases");

// Global timeout
test.setTimeout(120000);

// Run only in chromium (optional: if you have config, you can remove this)
test.use({ browserName: "chromium" });

async function openSite(page) {
  // Open the exact Singlish → Sinhala page
  await page.goto("https://www.swifttranslator.com/singlish-to-sinhala", {
    waitUntil: "domcontentloaded",
    timeout: 90000,
  });

  // Wait for input to be ready
  await page.getByRole("textbox").first().waitFor({ state: "visible", timeout: 30000 });
}

// working output selector (kept)
function getOutputLocator(page) {
  return page
    .getByText("Sinhala", { exact: true })
    .locator("..")
    .locator("div")
    .nth(1);
}

test.describe("SwiftTranslator - Automated Test Cases", () => {
  for (const tc of cases) {
    test(`${tc.id} | ${tc.name}`, async ({ page }) => {
      await openSite(page);

      const inputBox = page.getByRole("textbox").first();
      const outputBox = getOutputLocator(page);

      // Make sure elements are visible (prevents "element not visible" errors)
      await inputBox.scrollIntoViewIfNeeded();
      await expect(inputBox).toBeVisible();
      await expect(inputBox).toBeEnabled();

      // Output may be lower on page
      await outputBox.scrollIntoViewIfNeeded();
      await expect(outputBox).toBeVisible({ timeout: 30000 });

      // Capture output BEFORE typing (so we can detect change)
      const before = (await outputBox.innerText().catch(() => "")).trim();

      //  Clear and type input
      await inputBox.fill("");
      await inputBox.type(tc.input, { delay: 30 });

      //  Wait until output changes and becomes non-empty
      await expect.poll(
        async () => {
          const txt = (await outputBox.innerText().catch(() => "")).trim();
          return txt;
        },
        { timeout: 30000 }
      ).not.toBe(before);

      const actual = (await outputBox.innerText()).trim();

      console.log(`\n${tc.id}\nINPUT: ${tc.input}\nACTUAL OUTPUT: ${actual}\n`);

      // Validation
      if (tc.expected && tc.expected.trim() !== "") {
        expect(actual).toBe(tc.expected.trim());
      } else {
        expect(actual.length).toBeGreaterThan(0);
      }
    });
  }
});

// Run with: npx playwright test
