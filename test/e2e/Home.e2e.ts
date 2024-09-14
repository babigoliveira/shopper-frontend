import { expect, test } from "@playwright/test";

require("@next/env").loadEnvConfig(process.cwd());

test.describe("Home page", () => {
  test("should pass", async ({ page }) => {
    expect(true).toBe(true);
  });
});
