function CostingTabPO () {
    //elements section
    this.addClientCountryButton = element(by.buttonText("Add Client Country"));
    this.saveButton =  element(by.buttonText("Save"));
    this.addBusinessButton = element(by.buttonText("Add Business"));

    //add client country function
    this.addClientCountry = function(country) {
        var countryCSSSelector = "a[title="+country+"]";
        var countryNameField = element(by.xpath("//input[@name=\"clientCountry\"]"));
        this.addClientCountryButton.click();
        countryNameField.click();
        element(by.css(countryCSSSelector)).click();
        this.saveButton.click();
        browser.sleep(2010);
    }

    //add structure with commodity

    this.addStructureL3_L9fromSelectedL2 = function(country, l3, l4, l5, l6, l7, l8, commodityGroupNumber, commodityType, commodityName){
        var countryToSelect = element(by.xpath("//span[text()="+"'"+country+"'"+"][ancestor::div[@class ='tree-container']]"));
        countryToSelect.click();
        this.addBusinessButton.click();
        element(by.xpath("//input[@placeholder='Select Business']")).click();
        element(by.css("a[title="+l3+"]")).click();
        browser.sleep(10);
        element(by.buttonText("Add Family")).click();
        element(by.css("a[title="+"'"+l4+"'"+"]")).click();
        browser.sleep(10);
        element(by.buttonText("Add Product")).click();
        element(by.css("a[title="+"'"+l5+"'"+"]")).click();
        browser.sleep(10);
        element(by.buttonText("Add Service")).click();
        element(by.css("input[placeholder='Enter Service Name']")).sendKeys(l6);
        element(by.buttonText("Add Activity")).click();
        element(by.css("input[placeholder='Enter Activity Name']")).sendKeys(l7);
        element(by.buttonText("Add Feature")).click();
        element(by.css("input[placeholder='Enter Feature Name']")).sendKeys(l8);
        element(by.buttonText("Add Commodity")).click();
        element(by.css("select[name='costClassField']")).$("[value="+"'"+commodityGroupNumber+"'"+"]").click();
        element(by.css("select[name='groupTypeField']")).$("[label="+"'"+commodityType+"'"+"]").click();
        element(by.css("input[name='costGroupNameField']")).sendKeys(commodityName);
        this.saveButton.click();
    }
}

module.exports.CostingTabPO=CostingTabPO;