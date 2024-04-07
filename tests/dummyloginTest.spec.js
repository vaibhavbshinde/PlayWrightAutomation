/*
 * Test  : loginPage
 * Author : vaibhavs
 */
/*
const{test, expect} = require("@playwright/test");
const{loginPage} = require('../page-objects/loginPage');
const{claimPage} = require('../page-objects/claimPage');
const dataset = JSON.parse(JSON.stringify(require('../utils/testDataUtils.json')));
let webContext;

// Login with valid user and store the session details
test.beforeAll("dummy Client login page",async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const loginpage = new loginPage(page);

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php');
    await loginpage.loginDetails(dataset.username,dataset.password);
    await page.waitForLoadState('networkidle');
    await expect(loginpage.dashboardPage).toBeVisible();
    await context.storageState({path : 'auth.json'});
    webContext = await browser.newContext({storageState:'auth.json'});
});


test("dummy Add Claim", async({})=>{

  const page = await webContext.newPage();

  await page.goto('/');
  const claimpage = new claimPage(page);
  await page.waitForTimeout(5000);
  await claimpage.clickClaimLink();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  await claimpage.addClaim();
  await page.waitForLoadState('networkidle');
 // await claimpage.addEmployeeName('Peter');
 // await page.waitForTimeout(5000);
  await claimpage.selectEvent('Accommodation');
  await claimpage.selectCurrency();
  await claimpage.addRemark('Accommodataion claim is added'); 
  await claimpage.doClaim();
});


test("dummy Search Claim", async({})=>{

  const page = await webContext.newPage();
  await page.goto('/');
  const claimpage = new claimPage(page);
  await page.waitForTimeout(5000);
  await claimpage.clickClaimLink();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  await claimpage.searchByEvent();
  await claimpage.searchClick();

});

*/