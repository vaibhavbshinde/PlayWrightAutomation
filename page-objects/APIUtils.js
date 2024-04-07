const { expect } = require("@playwright/test");
class APIUtils {

   constructor(apiContext, loginPayLoad) {
      this.apiContext = apiContext;
      this.loginPayLoad = loginPayLoad;
   }

   //generate token
   async getToken() {
      const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
         {
            data: this.loginPayLoad
         });

      // here checking response 200, 201 (i.e. successful response)
      expect(loginResponse.ok()).toBeTruthy();

      const loginResponseJson = await loginResponse.json();
      const token = loginResponseJson.token;
      console.log(token);

      return token;
   }

   async createOrder(orderPayLoad) {
      let response = {};
      response.token = await this.getToken();

      const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
         {
            data: orderPayLoad,
            header: {
               'Authorization': response.token,
               'Content-Type': 'application/json'
            },
         });

      const orderResponseJson = await orderResponse.json();
      console.log("order json :", orderResponseJson);
      const orderId = orderResponseJson.orders[0];
      response.orderId = orderId;

      return response;
   }


}
module.exports = { APIUtils };