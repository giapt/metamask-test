import { test, expect } from '../fixtures';
import * as metamask from '@synthetixio/synpress/commands/metamask';
import playwright from '@synthetixio/synpress/commands/playwright';

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
  // baseUrl is set in playwright.config.ts
  const NFT2_URL = process.env.NFT2_URL ?? 'https://nft2scan-stg.dareplay.io/'
  await page.goto(NFT2_URL);
});

test('connect wallet using default metamask account', async ({ page }) => {
    await metamask.addNetwork('bscTestnet')
    await page.getByRole('button', { name: 'chain Connect wallet' }).click();
    await page.click('text=Metamask');

    page
    .locator(
        'xpath=//html/body/div[2]/div/div[2]/div/div[2]/div/div/div/div[3]/div/label[1]/span',
    )
    .click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await metamask.acceptAccess({ allAccounts: false, signInSignature: true });

    await page.getByRole('button', { name: 'Mint NFT2.0' }).click();

    await page
    .locator(
        'xpath=//html/body/div[2]/div/div[2]/div/div[2]/div/div/div/div[4]/div/div/div',
    )
    .click();

    await page.getByRole('button', { name: 'SELECT' }).click();

    await page
    .getByPlaceholder("Enter name")
    .fill("hell1");

    await page
    .getByPlaceholder("Enter description")
    .fill("hell1");
    
    await page
    .getByPlaceholder("Trait name")
    .fill("strength");

    await page
    .getByPlaceholder("Value")
    .fill("100");

    const fileChooserPromise = page.waitForEvent('filechooser');

    await page.locator('xpath=//*[@id="root"]/div/div/div/div[4]/div[2]/form/div[1]/div/div[1]/div[1]/div').click();

    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('avatar.avif');
    
    await page.waitForTimeout(2000);

    await page.getByRole('button', { name: 'Mint NFTs' }).click();

    await page.getByRole('button', { name: 'Mint Nft2' }).click();

    await page.getByRole('button', { name: 'Continue' }).click();

    await page.waitForTimeout(2000);

    await metamask.confirmDataSignatureRequest();
    
    // const notificationPage = await playwright.switchToMetamaskNotification();
    // const confirm_button = notificationPage.getByText("Confirm");
    // await confirm_button.click();
    
    expect(page.getByText('NFTs Minted Successfully!')).toBeTruthy()
    
    await page.pause()
    
});