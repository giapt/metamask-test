import { test, expect } from '../fixtures';
import * as metamask from '@synthetixio/synpress/commands/metamask';

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
  // baseUrl is set in playwright.config.ts
  const NFT2_URL = process.env.NFT2_URL ?? 'https://stg.nft2scan.com/'
  await page.goto(NFT2_URL);
});

test('connect wallet using default metamask account', async ({ page }) => {
  await page.getByRole('button', { name: 'chain Connect wallet' }).click();
  await page.click('text=Metamask');

  page
    .locator(
      'xpath=//html/body/div[2]/div/div[2]/div/div[2]/div/div/div/div[3]/div/label[1]/span',
    )
    .click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await metamask.acceptAccess({ allAccounts: false, signInSignature: true });
  await expect(
    page.locator('xpath=//*[@id="root"]/div/header/div[2]/button/span'),
  ).toHaveText('0xf39...Fb92266');
});

test('import private key and connect wallet using imported metamask account', async ({
  page,
}) => {
  await metamask.importAccount(
    '0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97',
  );
  await page.getByRole('button', { name: 'chain Connect wallet' }).click();
  await page.click('text=Metamask');

  page
    .locator(
      'xpath=//html/body/div[2]/div/div[2]/div/div[2]/div/div/div/div[3]/div/label[1]/span',
    )
    .click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await metamask.acceptAccess({ allAccounts: false, signInSignature: true });
  await expect(
    page.locator('xpath=//*[@id="root"]/div/header/div[2]/button/span'),
  ).toHaveText('0x236...5B21E8f');
});
