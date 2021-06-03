export const config = {
  runner: "local",
  specs: ["__tests__/**/*.test.ts"],
  capabilities: [
    {
      maxInstances: 1,
      browserName: "chrome",
      acceptInsecureCerts: true,
    },
  ],
  logLevel: "warn",
  coloredLogs: true,
  bail: 0,
  baseUrl: "https://developer.paypal.com",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  chromeOptions: {
    prefs: {
      "profile.default_content_setting_values.geolocation": 1,
    },
  },
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
  afterTest: function (
    test: any,
    context: any,
    { error, result, duration, passed, retries }: any
  ) {
    if (error) {
      browser.takeScreenshot();
    }
  },
};
