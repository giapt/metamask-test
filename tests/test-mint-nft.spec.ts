import { test, expect } from '../fixtures';
import * as metamask from '@synthetixio/synpress/commands/metamask';
import playwright from '@synthetixio/synpress/commands/playwright';

test.describe.configure({ mode: 'parallel' });
const NFT2_URL = process.env.NFT2_URL ?? 'https://stg.nft2scan.com/'

test.beforeEach(async ({ page }) => {
    // baseUrl is set in playwright.config.ts
    await page.goto(NFT2_URL);
});

test('aut nft2scan', async ({ page }) => {
    await test.step('Login Wallet', async () => {
        await metamask.addNetwork('bscTestnet');
        await page.getByRole('button', { name: 'chain Connect wallet' }).click();
        await page.click('text=Metamask');
        
        await page.locator('div').filter({ hasText: /^I read and accept the Terms of Service and Privacy Policy$/ }).locator('span').click();
        await page.getByRole('button', { name: 'Confirm' }).click();
        await metamask.acceptAccess({ allAccounts: false, signInSignature: true });
        
        // await expect.soft(
        //     page.locator('xpath=//*[@id="root"]/div/header/div[2]/button/span'),
        // ).toHaveText('0xc9D...eF63222');
    });
    
    await test.step('Deploy origin nft2 collection', async () => {
        await page.getByRole('button', { name: 'Mint NFT2.0' }).click();
        await page.getByRole('button', { name: 'Create a new collection' }).click();

        const collectionName = `at${Math.floor(Date.now()/1000)}`
        console.log("collection new", collectionName)
        await page
        .getByPlaceholder("Enter colletion name")
        .fill(collectionName);

        await page
        .getByPlaceholder("Enter colletion symbol")
        .fill(collectionName);
        

        await page.locator('div').filter({ hasText: /^Enter select network$/ }).nth(2).click();
        await page.getByText(/^(BNB chain testnet|BSC_TESTNET)$/).click();

        await page.getByRole('button', { name: 'Deploy collection contract' }).click();

        await page.getByRole('button', { name: 'Continue' }).click();
        
        const notificationPage = await playwright.switchToMetamaskNotification();
        const confirm_button = notificationPage.getByText("Confirm");
        await confirm_button.click();
        
        await page.waitForTimeout(3000);
    });
});