// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// My first example
test('first title', async({ page }) => {

 const username = page.locator('#username');
 const signIn =  page.locator("#signInBtn");
 const cardTitles = page.locator(".card-body a");

await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
console.log(await page.title());
await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

// CSS
await username.fill("rahulshetty");
await page.locator("[type='password']").fill("learning");
await signIn.click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
await username.fill("rahulshettyacademy");
await signIn.click();

console.log(await cardTitles.first().textContent());
console.log(await cardTitles.nth(1).textContent());

const allTitles = await cardTitles.allTextContents();
console.log(allTitles);

});

// user creation test case -- not working for now
test('User Create', async({page}) => {

  const registerHere = page.locator('.text-reset');
  const firstName = page.locator('#firstName');
  const lastName =  page.locator("#lastName");
  const userEmail = page.locator("#userEmail");
  const userMobile = page.locator("#userMobile");
  const occupation = page.locator('.custom-select ng-valid ng-dirty ng-touched:nth-of-type(1)');
  const userPassword = page.locator('.userPassword');
  const confirmPassword = page.locator('.confirmPassword');
  const ageCheckbox = page.locator("input[class='ng-dirty ng-valid ng-touched'][type='checkbox']");
  const register = page.locator('#login'); 

  await page.goto('https://rahulshettyacademy.com/client');
  console.log("URL launched.");
 // await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

 // await registerHere.click();
  await firstName.fill('firstuser');
  await lastName.fill('lastuser');
  await userEmail.fill('first.last@abc.com');
  await userMobile.fill('1235');
  await userPassword.fill('learning');
  await confirmPassword.fill('learning');
  await ageCheckbox.click();
  await register.click();

});

