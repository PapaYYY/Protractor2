//Locators section
var createLiveBidButtonXPATH = "//button[@el-id=\"createActiveBidButton\"]";

function BidsListPO() {
    //Page elements section
    this.bidNameField = element(by.id("bidName"));
    this.salesForceIDField = element(by.id("salesforceId"));
    this.dateField = element(by.id("startDate"));
    this.durationField = element(by.model("$ctrl.duration"));
    this.saveButton = element(by.buttonText("Save"));
    this.createLiveBidButton =  element(by.xpath(createLiveBidButtonXPATH));
}

//bid creation from the bid list
BidsListPO.prototype.createLiveBid = function (name, duration, commodityStartingMonth) {
    this.createLiveBidButton.click();
    this.bidNameField.sendKeys(name);
    this.salesForceIDField.sendKeys("123");
    this.dateField.click();
    element.all(by.repeater("dt in row")).get(commodityStartingMonth).click();
    this.durationField.sendKeys(duration);
    this.saveButton.click();
    browser.sleep(500);
}

module.exports.BidsListPO=BidsListPO;