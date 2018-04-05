exports.config = {
  seleniumAddress: "http://localhost:4444/wd/hub",
  specs: ["./test/test-main2.js"],
  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      args: ["--headless"]
    }
  }
};
