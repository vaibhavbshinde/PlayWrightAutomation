/*
 * Class  : claimPage
 * Author : vaibhavs
 */

class claimPage{
    // constuctor  
     constructor(page){
        this.page = page;
        this.claimlink=page.getByRole('link', { name: 'Claim' });
        this.addClaimButton =page.getByRole('button',{ name: ' Assign Claim' });
        this.employeeName = page.getByPlaceholder('Type for hints...');
        this.employeeFullName =page.getByText('Peter Mac Anderson');
        this.eventName = page.getByText('+empEventName+');
        this.currencyArrow = page.locator("oxd-icon bi-caret-down-fill oxd-select-text--arrow");
        this.currencyName =  page.getByRole('option',{name:'Algerian Dinar'}); 
        this.remark = page.locator('textarea');
        this.createClaim = page.getByRole('button', { name: 'Create' });
        this.empName =  page.getByRole('option', { name: 'Peter Mac Anderson' });

        this.eventName101 = page.locator('form i').first();
        this.eventName102 = page.getByRole('option', { name: 'Medical Reimbursement' });

        this.currencyName101 = page.locator('form i').nth(1);
        this.currencyName102 = page.getByText('Algerian Dinar');

        this.searchPageEvent=page.getByText('-- Select --').first();
        this.searchPageEventSelect= page.getByRole('option', { name: 'Accommodation' }).locator('span');
        this.searchPageEventButton = page.getByRole('button', { name: 'Search' });

     }

//Click on the Claim menu option
async clickClaimLink()
     {
        await this.claimlink.click();       
     }   

//Click on Add claim button which on the claim page     
async addClaim(){
    await this.addClaimButton.click();
    
}

//type and select employee name   
async addEmployeeName(employeeName){
  await this.employeeName.click();
  await this.employeeName.pressSequentially(employeeName);
  await page.waitForTimeout(1000);
 // await this.employeeName.press('Enter');

  await this.employeeFullName.click();
 //  await this.employeeName.click();
 //   await this.employeeName.pressSequentially(employeeName);
 //   await this.empName.click();
}


//select event from the dropdown  
async selectEvent(empEventName){
  //  page.locator('form i').first().page.getByRole('option', { name: 'Accommodation' });
  //  await this.eventName(empEventName).click();

  await this.eventName101.click();
  await this.eventName102.click();
}

//select currency from the dropdown  
async selectCurrency(){
    await this.currencyName101.click();
    await this.currencyName102.click();
}

//add remark in the textbox  
async addRemark(remarkText){
    await this.remark.click();
    await this.remark.fill(remarkText);
}

//click on the submit claim button
async doClaim(){
   await this.createClaim.click();
}

//Select event value from dropdown to search claim
async searchByEvent(){
  await this.searchPageEvent.click();
  await this.searchPageEventSelect.click();
}

//click on the search button
async searchClick(){
this.searchPageEventButton.click();
}

}
module.exports={claimPage};