var logger = require('./log');
var objects = require('./Configuration/Objects.json');
var using  = require('jasmine-data-provider');

function BidList () {

    //bid creation from the bid list
    this.createBid = function (name, duration) {
        element(by.xpath("/html/body/main/bids/nav/div/a[1]/span")).click();
        element(by.id("bidName")).sendKeys(name);
        element(by.id("salesforceId")).sendKeys("123");
        element(by.id("startDate")).click();
        element(by.repeater("dt in row")).click();
        element(by.model("$ctrl.duration")).sendKeys(duration);
        element(by.buttonText("Save")).click();
            }
}

function Costing () {

    this.createHWC_CommodityInBid = function (name) {
        browser.sleep(3000);

        //add client country
 //       element(by.className("actions-btn")).click();
        element(by.css("button[el-id='actionsCompactButton']")).click();
        element(by.buttonText("Add Client Country")).click();
        element(by.css("input[el-id='clientCountry']")).click();
        element(by.css("a[title='Afghanistan']")).click();
        element(by.buttonText("Save")).click();
        browser.sleep(5000);

        //add L3-L9
        element(by.xpath("/html/body/main/entity-management/section/costing/section/wbs/section/aside/wbs-tree/div/div[3]")).click();
        element(by.className("actions-btn")).click();
        element(by.buttonText("Add Business")).click();
        element(by.className("input-container")).click();
        element(by.css("a[title='New']")).click();

        element(by.buttonText("Add Family")).click();
        element(by.css("a[title='New Family 1']")).click();

        element(by.buttonText("Add Product")).click();
        element(by.css("a[title='New Product 1']")).click();

        element(by.buttonText("Add Service")).click();
        element(by.css("input[placeholder='Enter Service Name']")).sendKeys("Service1");
        element(by.buttonText("Add Activity")).click();
        element(by.css("input[placeholder='Enter Activity Name']")).sendKeys("Activity1");
        element(by.buttonText("Add Feature")).click();
        element(by.css("input[placeholder='Enter Feature Name']")).sendKeys("Feature1");
        element(by.buttonText("Add Commodity")).click();

        element(by.css("select[name='costClassField']")).$("[value='2']").click();
        element(by.css("select[name='groupTypeField']")).$('[label="Hardware Capital/Support"]').click();
        element(by.css("input[name='costGroupNameField']")).sendKeys(name);

        element(by.buttonText("Save")).click();

        browser.sleep(1000);
    }

}

function LoginPage () {
    this.login = function (url, name, password) {
        console.log('debugging...');
        browser.ignoreSynchronization=true;
        browser.get(url);
        browser.sleep(1000);
        element(by.id("userNameInput")).sendKeys(name);
        element(by.id("passwordInput")).sendKeys(password);
        element(by.id("submitButton")).click();
        browser.sleep(1000);
        browser.ignoreSynchronization=false;
    }
}


describe("Creating bids with different Commodities...", function () {
    
    beforeEach(
        function () {

        }
    );

    //Logining the app

    logger.log('info','Navigating to the wab site...');

    new LoginPage().login(objects.testsiteurl, objects.userdetails.username, objects.userdetails.password);

//    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;


    //Parametrizing our IT block

    /*
    function userProvider () {

        return [{username: objects.userdetails.username1, password: objects.userdetails.password1}, {username: objects.userdetails.username2, password: objects.userdetails.password2}];

    }


    using(userProvider, function (data) {

        it("Create bid with Commodity HWCS...", function () {

            //Logining the app

            logger.log('info','Navigating to the wab site...');

            new LoginPage().login(objects.testsiteurl, data.username, data.password);


            //generating random name to be checked & duration
            var randomName = "TestBid"+Math.round(Math.random()*1000000);
            var bidDuration = 55;

            //creating bid
            new BidList().createBid(randomName, bidDuration);

            //creating structure with Commodity
            new Costing().createHWC_CommodityInBid(randomName);

            //assertion

            logger.log('info','Checking that commodity is really created...');
            element(by.xpath("/html/body/main/entity-management/section/costing/section/wbs/section/aside/wbs-tree/div/div[10]")).getText().then(function (text) {
                console.log(text);
                expect(text).toMatch(randomName);

            });
        });

    });

*/



    it("Create bid with Commodity HWCS...", function () {

        //generating random name to be checked & duration
        var randomName = "TestBid"+Math.round(Math.random()*1000000);
        var bidDuration = 55;

        //creating bid
        new BidList().createBid(randomName, bidDuration);

        //creating structure with Commodity
        new Costing().createHWC_CommodityInBid(randomName);

        //assertion

        logger.log('info','Checking that commodity is really created...');
        element(by.xpath("/html/body/main/entity-management/section/costing/section/wbs/section/aside/wbs-tree/div/div[10]")).getText().then(function (text) {
            console.log(text);
            expect(text).toMatch(randomName);

        });
    });
});
