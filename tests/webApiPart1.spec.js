
const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../page-objects/APIUtils");

const loginPayLoad = { userEmail: "mytesting@gmail.com", userPassword: "Iamking@000" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6607ecf1a86f8f74dcb18034" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };


let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiutils = new APIUtils(apiContext, loginPayLoad);
    response = await apiutils.createOrder(orderPayLoad);
});


test('Place the order', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.waitForLoadState("networkidle");
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy;

});




test('fake response testing', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.waitForLoadState("networkidle");
    await page.goto("https://rahulshettyacademy.com/client/");

    /// here we are generating the fake response using route method. 
    /// it should alway exact before where we want to make a fake
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca",
        async route => {
            const response = await page.request.fetch(route.response());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,
                }
            )
        }
    );

    // when we get error like ,something disposed then add below line
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    /// 

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy;

});