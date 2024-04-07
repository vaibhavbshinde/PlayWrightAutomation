/*
 * TestScenario  : Add the claim and search the claim
 * Author : vaibhavs
 */
//*** */ Here i am extending fixture and create new with multiple attributes
// so default fixtures are page,browser and also we can create custom fixtures

const base = require("@playwright/test");

exports.customtest = base.test.extend(
{
  validUser :  {
    "username" : "Admin",
    "password" : "admin123"
    }


})
