import { test } from '../fixtures';
import * as metamask from '@synthetixio/synpress/commands/metamask';

// metamask add and changeNetwork to ('Polygon Network');

test('connect wallet using default metamask account', async ({ page }) => {
  await page.goto('https://ace-frontend.prominencegames.io/signin');
  await page.getByLabel('Email').type(process.env.EMAIL ?? "ighmazcool@gmail.com");
  await page.getByLabel('Password').type(process.env.PASSWORD ?? "iamighmaz1234");
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.getByRole('button', { name: 'Connect Wallet' }).click();
  await page.click('text=MetaMask');
  
  await metamask.acceptAccess();
  await page.waitForTimeout(6000);
});
