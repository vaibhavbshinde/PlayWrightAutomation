/*
 * Class  : loginPage
 * Author : vaibhavs
 */

class loginPage {
  // constuctor  
  constructor(page){
    this.page    = page;
    this.userName= page.getByPlaceholder('Username');
    this.password= page.getByPlaceholder('Password');
    this.loginButton= page.getByRole('button', { name: 'Login' });
    this.dashboardPage = page.getByRole('heading', { name: 'Dashboard' });
  }


  //goto URL set
  async goto() {
       // await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
       await this.page.goto('/');
  }
   
  //user input entered
 async loginDetails(userName,password){
     await this.userName.fill(userName);
     await this.password.fill(password);
     await this.loginButton.click();
     console.log("login successfully for user : ",userName);
 }
  
 // when user is valid, then return the Dashboard page
 async expectUserValidation(){
        return this.dashboardPage;
 }

}
//Exporting the class to module
module.exports ={loginPage}; 

