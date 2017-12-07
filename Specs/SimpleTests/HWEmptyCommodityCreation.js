var logger = require('../../log');
var Settings = require('../../Configuration/Settings.json');
var jasminedatapriveder = require('jasmine-data-provider');
var LoginPO = require('../../PageObjects/LoginPO');
var BidsListPO = require('../../PageObjects/BidsListPO');
var CostingTabPO = require('../../PageObjects/CostingTabPO');

describe("Creating bids with different commodities...", function () {

    beforeEach(
        function () {
            logger.log('info', 'Navigating to the wab site...');
            var loginPage = new LoginPO.LoginPO();
            //Logining the app
            browser.ignoreSynchronization = true;
            loginPage.login(Settings.testsiteurl, Settings.userdetails.username, Settings.userdetails.password);
        }
    );

    it("Creating bid with HW commodities...", function () {
        //generating random name to be checked & duration
        var randomName = "TestCommodity"+new Date().getTime();
        var bidDuration = Math.round(Math.random()*100);

        //creating Live bid
        var bidsListPage = new BidsListPO.BidsListPO();
        bidsListPage.createLiveBid(randomName, bidDuration, 11);

        var costingTabPage = new CostingTabPO.CostingTabPO();
        //add client country
        costingTabPage.addClientCountry("Ukraine");
        //creating structure with Commodity
        costingTabPage.addStructureL3_L9fromSelectedL2("Ukraine", "New", "New Family 1", "New Product 1", "Service1", "Activity1", "Feature1", "2", "Hardware Capital/Support", randomName);

        //assertion
        logger.log('info', 'Checking that commodity is really created...');
        element(by.xpath("//div[10][ancestor::div[@class ='tree-container']]/div/div/div/span[4]")).getText().then(function (text) {
            console.log(text);
            expect(text).toMatch(randomName+"- Capex");
        });
    });
});