/*
 * TestScenario  : Testing login with 2 different users credentials
 * Author : vaibhavs
 */
const{test, expect} = require("@playwright/test");
const{loginPage} = require('../page-objects/loginPage');
const{claimPage} = require('../page-objects/claimPage');

//*** */ here the arrayDataUtils.json file have 2 user credentials
const dataset = JSON.parse(JSON.stringify(require('../utils/arrayDataUtils.json')));

//****Using for loop to run the test case for multiple times
for(const data of dataset) {

      //*** Here test name is generating randomly to avoid conflict
      test(`Client login page : ${data.username}`,async({page})=>{
          const loginpage = new loginPage(page);

          await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php');
          await loginpage.loginDetails(data.username,data.password);
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(5000);
          await expect(loginpage.dashboardPage).toBeVisible();
          await page.context().storageState({path:"auth.json"});
      });

}


