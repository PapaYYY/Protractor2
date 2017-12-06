var logger = require('./log');
var settings = require('./Configuration/Settings.json');
var jasminedatapriveder = require('jasmine-data-provider');
var loginPO = require('./PageObjects/LoginPO');
var bidsListPO = require('./PageObjects/BidsListPO');
var costingTabPO = require('./PageObjects/CostingTabPO');

describe("Creating bids with different commodities...", function () {

    beforeEach(
        function () {
            logger.log('info', 'Navigating to the wab site...');
            var loginPage = new loginPO.LoginPO();
            //Logining the app
            loginPage.login(settings.testsiteurl, settings.userdetails.username, settings.userdetails.password);
        }
    );

    it("Creating bid with HW commodities...", function () {
        //generating random name to be checked & duration
        var randomName = "TestCommodity"+new Date().getTime();
        var bidDuration = Math.round(Math.random()*100);

        //creating Live bid
        var bidsListPage = new bidsListPO.BidsListPO();
        bidsListPage.createLiveBid(randomName, bidDuration);

        var costingTabPage = new costingTabPO.CostingTabPO();
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