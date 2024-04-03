import { chromium, expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  const isClerkReady = await page.evaluate(() => {
    return window.Clerk && window.Clerk.isReady();
  });
  expect(isClerkReady).toBeTruthy();

  // Clear cookies
  await page.context().clearCookies();

  const signInResult = await page.evaluate(async () => {
    const testEmail = "ismaeljarias@gmail.com";
    const testPassword = "1234";
    return await window.Clerk.client.signIn.create({
      identifier: testEmail,
      password: testPassword,
    });
  });
});

test.describe("Chat", () => {
  test("should send messages", async ({ page }) => {});
});
