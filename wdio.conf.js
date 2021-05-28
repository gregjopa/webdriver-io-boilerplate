exports.config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  updateJob: false,
  specs: ["./lib/paypal-button-click.test.js"],
  exclude: [],
  maxInstances: 10,
  commonCapabilities: {
    name: "Checkout testing",
  },

  capabilities: [
    {
      browser: "chrome",
      browser_version: "90.0",
      os: "Windows",
      os_version: "10",
    },
    {
      browser: "Firefox",
      browser_version: "latest",
      os: "Windows",
      os_version: "10",
    },
  ],
  logLevels: {
    webdriver: "info",
    "@wdio/browserstack-service": "info",
  },
  services: ["browserstack"],
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: "hub.browserstack.com",

  framework: "mocha",
};

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps, index) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
  exports.config.capabilities[index] = {
    ...caps,
    ...(caps["browser"] && { browserName: caps["browser"] }),
  };
});
