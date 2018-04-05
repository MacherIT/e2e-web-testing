const webdriver = require("selenium-webdriver");
const chromeDriver = require("chromedriver");
const path = require("path");

const chromeDriverPathAddition = `:${path.dirname(chromeDriver.path)}`;

exports.prepareDriver = async () => {
  process.on("beforeExit", () => this.browser && this.browser.quit());
  process.env.PATH += chromeDriverPathAddition;

  var chromeCapabilities = webdriver.Capabilities.chrome();
  var chromeOptions = {
    args: ["--headless"]
  };
  chromeCapabilities.set("chromeOptions", chromeOptions);

  return await new webdriver.Builder()
    .disableEnvironmentOverrides()
    .forBrowser("chrome")
    .withCapabilities(chromeCapabilities)
    .setLoggingPrefs({ browser: "ALL", driver: "ALL" })
    .build();
};

exports.cleanupDriver = async driver => {
  if (driver) {
    driver.quit();
  }
  process.env.PATH = process.env.PATH.replace(chromeDriverPathAddition, "");
};
