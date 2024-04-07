/*
 * TestScenario  : Add the claim and search the claim
 * Author : vaibhavs
 */
const { test, expect } = require("@playwright/test");
const { loginPage } = require('../page-objects/loginPage');
const { claimPage } = require('../page-objects/claimPage');
const dataset = JSON.parse(JSON.stringify(require('../utils/testDataUtils.json')));

test.describe.configure('Test Suite', { mode: 'serial' });
test.describe('Test Suite', () => {

  // Login with valid user and store the session details
  test("Client login page", async ({ page }) => {
    const loginpage = new loginPage(page);

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php');
    await loginpage.loginDetails(dataset.username, dataset.password);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(35000);
    await expect(loginpage.dashboardPage).toBeVisible();
    await page.context().storageState({ path: "auth.json" });
  });

  // Add Claim
  test("Add Claim", async ({ browser }) => {
    const context = await browser.newContext({ storageState: "auth.json" });
    const page = await context.newPage();

    await page.goto('/');
    const claimpage = new claimPage(page);
    await claimpage.clickClaimLink();
    await page.waitForLoadState('load');
    await page.waitForTimeout(35000);
    await claimpage.addClaim();
    await page.waitForLoadState('networkidle');
    // await claimpage.addEmployeeName('Peter');
    // await page.waitForTimeout(5000);
    await claimpage.selectEvent('Accommodation');
    await claimpage.selectCurrency();
    await claimpage.addRemark('Accommodataion claim is added');
    await claimpage.doClaim();
  });

  //search claim
  test("Search Claim", async ({ browser }) => {

    const context = await browser.newContext({ storageState: "auth.json" });
    const page = await context.newPage();

    await page.goto('/');
    const claimpage = new claimPage(page);
    await claimpage.clickClaimLink();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(35000);
    await claimpage.searchByEvent();
    await claimpage.searchClick();

  });


});

