// conf.js
// noinspection JSAnnotator
exports.config = {
    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    multiCapabilities:[ {
        'browserName': 'chrome'
    },
        /*      {
                  'browserName': 'firefox'
              }
        */
    ],
    framework: 'jasmine2',

    //  seleniumAddress: 'http://localhost:4444/wd/hub',

    suites: {basicTests:['Specs/SimpleTests/**.js']
    },

     // Options to be passed to Jasmine.
     jasmineNodeOpts: {
         //defaultTimeoutInterval: 1000,
         showColors: true,
         isVerbose: true,
         includeStackTrace: true
     },

    onPrepare: function () {
        browser.driver.manage().window().setSize(1920, 1080);
        var AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
        jasmine.getEnv().afterEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });
    }
}