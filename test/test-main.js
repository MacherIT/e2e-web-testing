const { expect } = require("chai");
const { prepareDriver, cleanupDriver } = require("../utils/browser-automation");
const { init } = require("../utils/server-init");
const retry = require("promise-retry");
const { By } = require("selenium-webdriver");

init();

describe("ANT WEB", function() {
  this.timeout(50000);
  let driver;

  before(async () => {
    driver = await prepareDriver();
    // console.log(driver);
  });
  after(() => cleanupDriver(driver));

  it("should work", async function() {
    await driver.get("http://localhost:3000");

    await retry(async () => {
      const title = await driver.getTitle();

      expect(title).to.equal("Ant");
    });

    await retry(async () => {
      const displayElement = await driver.findElement(By.tagName("cabecera"));
      console.log(displayElement);
    });
  });
});
