exports.config = {
  seleniumAddress: "http://localhost:4444/wd/hub",
  specs: ["./test/**/*test-*.js"],
  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      args: ["--headless"]
    }
  }
};
