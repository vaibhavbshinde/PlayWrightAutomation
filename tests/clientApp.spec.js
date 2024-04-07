//@ts-check
const {test,expect} = require('@playwright/test');

/*
const {loginPage} = require('../page-objects/loginPage');
const {dashboardPage} = require('../page-objects/dashboardPage');
const dataset = JSON.parse(JSON.stringify(require('../utils/testDataUtils.json')));
*/

test('Client Application demo', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("mytesting@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();

    // if not working any reason as discarded
    await page.waitForLoadState('networkidle');

    await page.locator(".card-body b").first().waitFor();
    
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

  });


  // Test case for static dropdown value selection

  test('static dropdown option value selection',async({page})=> {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator('#username');
  const signIn = page.locator('#signInbtn');
  
  const documentBlink= page.locator("[href*='documents-request']"); 

  // dropdown values
  const dropdown =page.locator("select.form-control");
  await dropdown.selectOption("consult");

  // radio button variable selection
  await page.locator(".radiotextsty").nth(1).click();
  await page.locator("#okayBtn").click();

  // to check radio button is checked or not
  console.log(await page.locator(".radiotextsty").last().isChecked());
  // OR
  await expect (page.locator(".radiotextsty").last()).toBeChecked();


  // checkbox verification steps 
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();

  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  //blinking text verification
  await expect(documentBlink).toHaveAttribute("class","blinkingText");



  // to tempararzy pause the page
  // await page.pause();

  });



  // how to handel the child window tab when user clicks links to open in the another tab using promise all
  test('Another tab handel functionality',async({browser})=>
  {
   const context = await browser.newContext();
   const page =  await context.newPage();
   
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const documentBlink= page.locator("[href*='documents-request']"); 
   
   // this is the important thing where promise work parallely
   const [newtabPage] = await Promise.all([
      context.waitForEvent('page'),
      documentBlink.click(),
   ])
   const text = await newtabPage.locator(".red").textContent();
   // @ts-ignore
   const arraytexttext= text.split("@")
   const domain = arraytexttext[1].split(" ")[0]
   console.log(domain);


  });

   // dynamically search and add to cart and auto suggestion value selection from dropdown
   test('Dynamically search and add to cart',async({page})=>{
   const productName = 'ADIDAS ORIGINAL';
   const products= page.locator('.card-body');
   const email ="mytesting@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
 
     await page.locator(".card-body b").first().waitFor();

     const titles = await page.locator(".card-body b").allTextContents();
     console.log(titles);

     const count = await products.count();
     
     for (let i=0; i<count; ++i)
     {
      if (await products.nth(i).locator("b").textContent() === productName)
      {
         // add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
     }
   
     await page.locator("[routerlink*='cart']").click();
     await page.locator("div li").first().waitFor();
     const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
     expect(bool).toBeTruthy();

    //value selection from the suggestion dropdown
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("India");
    const dropdown =   page.locator(".ta-results");
    await dropdown.waitFor();
    const optionCounts = await dropdown.locator("button").count();

    for(let i=0; i < optionCounts; ++i)
    {
      const text = await dropdown.locator("button").nth(i).textContent();
      if(text === " India"){
         await dropdown.locator("button").nth(i).click();
         break;
      }
    }
    expect( page.locator(".user__name>label").first()).toHaveText(email);
    await page.locator(".action__submit").click();
  
   await expect( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
 const rows = await page.locator("tbody tr");

 for(let i =0; i< await rows.count(); ++i) {
    const rowOrderId =  await rows.nth(i).locator("th").textContent();
    if(orderId.includes(rowOrderId)){
      await rows.nth(i).locator("button").first().click();
      break;
   }
}
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy;

   });