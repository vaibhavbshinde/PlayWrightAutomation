import {test,expect} from '@playwright/test';

// or
// //@ts-check
// const {test,expect} = require('@playwright/test');

// Speial Locator available in the playwright
test('Playwright special locator', async({page}) =>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");

    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button",{name : 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    expect(page.getByText("Success! The Form has been submitted successfully!.").isVisible()).toBeTruthy();
    
    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button",{name:"Add"}).click();
    await page.locator(".nav-link.btn.btn-primary").click();

});

// Date pick from calendar
test('Date Pick from calendar', async({page}) =>{
 
    const usrInputMonth= "6";
    const usrInputDay ="15";
    const usrInputYear="2027";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(usrInputYear).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(usrInputMonth)-1).click();
    await page.locator("//abbr[text()='"+usrInputDay+"']").click();


});

// How to handel hover and javascript dialog box
 test.only("Handling mouser hover and javascript dialog", async({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();

// this is for to listen the listener when javascript popup displayed on screen
page.on('dialog',dailog => dailog.accept());
await page.locator("#confirmbtn").click();



// mouse hover functionality
await page.getByRole("button",{name:"Mouse Hover"}).hover();
await page.getByRole("link",{name:"Top"}).click();



// how to hadle and automate frames with Playwright
const pageFrame = page.frameLocator("#courses-iframe");
await pageFrame.locator("li a[href*='lifetime-access']:visible").click();
const textcheck=await pageFrame.locator(".text h2").textContent();
console.log(textcheck.split(" ")[1]);

});