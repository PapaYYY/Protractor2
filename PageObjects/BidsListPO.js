function BidsListPO() {
    //Locators section
    var createLiveBidButtonXPATH = "//button[@el-id=\"createActiveBidButton\"]";

    //Page elements section
    var bidNameField = element(by.id("bidName"));
    var salesForceIDField = element(by.id("salesforceId"));
    var dateField = element(by.id("startDate"));
    var durationField = element(by.model("$ctrl.duration"));
    var saveButton = element(by.buttonText("Save"));
    var creareateLiveBidButton =  element(by.xpath(createLiveBidButtonXPATH));

    //bid creation from the bid list
    this.createLiveBid = function (name, duration) {
        creareateLiveBidButton.click();
        bidNameField.sendKeys(name);
        salesForceIDField.sendKeys("123");
        dateField.click();
        element(by.repeater("dt in row")).click();
        durationField.sendKeys(duration);
        saveButton.click();
        browser.sleep(500);
    }
}

module.exports.BidsListPO=BidsListPO;