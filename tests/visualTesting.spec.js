/*
 * TestScenario  : Visual testing with playwright, (i.e. screen to screen visulation testing)
 * Author : vaibhavs
 */

const {test, expect } = require("@playwright/test");
const{pageObjectManager} = require('../page-objects/pageObjectManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/testDataUtils.json")));


test("Visual Testing",async({page})=>{
    // here created the object from pageObjectManager class
    const pageobjManager =new pageObjectManager(page);
    const loginpage =pageobjManager.getLoginPage()

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php');
    await loginpage.loginDetails(dataset.username,dataset.password);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    await expect(loginpage.dashboardPage).toBeVisible();

    // To take specific locator screenshot , then we do this aswell.
    await loginpage.dashboardPage.screenshot({path:'partialScreenshot.png'});

    // here taking complete page screenshot , to compare and matching as visual testing
    expect(await page.screenshot()).toMatchSnapshot('landingpage.png');

});