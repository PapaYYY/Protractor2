function LoginPO() {
    this.login = function (url, name, password) {
        browser.get(url);
        browser.sleep(2000);
        element(by.id("userNameInput")).sendKeys(name);
        element(by.id("passwordInput")).sendKeys(password);
        element(by.id("submitButton")).click();
        browser.sleep(1000);
        browser.ignoreSynchronization = false;
    }
}

module.exports.LoginPO = LoginPO;