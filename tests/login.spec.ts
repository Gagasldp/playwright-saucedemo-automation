import {test, expect} from '@playwright/test';

test('Login valid', async ({page})=> {
    await locator.goto("https://partner.ur-hub.com/Login");
    await expect(locator).toBeVisible("Login");
});