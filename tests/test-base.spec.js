/*
 * TestScenario  : Testing login with 2 different users credentials
 * Author : vaibhavs
 */
const{test, expect} = require("@playwright/test");
const{loginPage} = require('../page-objects/loginPage');
const{claimPage} = require('../page-objects/claimPage');

//*** Here creating constant for customtest fixture
const{customtest}=require('../utils/test-base');

 //*** Here test name is set as customset the way it was export
customtest("customtest Client login page : ",async({page,validUser})=>{
 const loginpage = new loginPage(page);

 await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php');
 await loginpage.loginDetails(validUser.username,validUser.password);
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(5000);
          await expect(loginpage.dashboardPage).toBeVisible();
          await page.context().storageState({path:"auth.json"});
});




