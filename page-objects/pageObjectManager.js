/*
 * Class  : Created Pageobject Manager
 * Author : vaibhavs
 */

const {loginPage} = require('./loginPage');
const {claimPage} = require('./claimPage');

class pageObjectManager{
    constructor(page){
        this.page = page;
        this.loginpage = new loginPage(this.page);
        this.claimpage = new claimPage(this.page);
    }

    // here descritption is property. Only small difference between is 
    // get description() and getLoginPage() is space after get word, which makes 
    // one as property and another as method() 
    get description(){
        return "Page Object Manager is created to avoid multiple const for required classes. only one PageObjectManger const is enough";
    } 

    //getLoginpage is actual method, not the property
    getLoginPage(){
        return this.loginpage;
    }

    getClaimPage(){
        return this.claimpage;
    }

}
module.exports={pageObjectManager};