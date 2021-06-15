import { config as defaultConfig } from "./wdio.conf";
import * as _ from "lodash";
import * as parseArgs from "minimist";

const epochTime = new Date().getTime();
const testName =
  parseArgs(process.argv.slice(2))["bstack-session-name"] || "default_name";

const overrides = {
  user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
  specs: ["__tests__/**/*.test.ts"],
  host: "hub.browserstack.com",
  maxInstances: 25,
  baseUrl: "https://developer.paypal.com",
  commonCapabilities: {
    "browserstack.maskCommands": "setValues, getValues, setCookies, getCookies",
    "browserstack.debug": true,
    "browserstack.video": true,
    "browserstack.networkLogs": false,
    name: testName,
    build:
      process.env.BROWSERSTACK_BUILD_NAME?.substring(0, 255) ||
      "webdriver-io-boilerplate" + " - " + epochTime,
    acceptInsecureCerts: true,
  },
  capabilities: [
    {
      os: "Windows",
      os_version: "10",
      browserName: "Chrome",
      browser_version: "latest",
    },
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Firefox",
      browser_version: "latest",
    },
    {
      os: "OS X",
      os_version: "Big Sur",
      browserName: "Firefox",
      browser_version: "latest",
    },
    {
      os_version: "10.0",
      device: "Samsung Galaxy S20",
      real_mobile: "true",
      browserName: "Android",
    },
    {
      os_version: "11.0",
      device: "Google Pixel 4",
      real_mobile: "true",
      browserName: "Android",
    },
    {
      os_version: "11.0",
      device: "Google Pixel 5",
      real_mobile: "true",
      browserName: "Android",
    },
  ],
  afterTest: async function (
    test: { title: string },
    _context: Record<string, unknown>,
    { passed, error }: unknown
  ) {
    if (parseArgs(process.argv.slice(2))["bstack-session-name"]) {
      await browser.executeScript(
        'browserstack_executor: {"action": "setSessionName", "arguments": {"name":"' +
          parseArgs(process.argv.slice(2))["bstack-session-name"] +
          '" }}'
      );
    } else {
      await browser.executeScript(
        'browserstack_executor: {"action": "setSessionName", "arguments": {"name":"' +
          test.title +
          '" }}'
      );
    }

    if (passed) {
      await browser.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}'
      );
    } else {
      await browser.takeScreenshot();
      const reason = (
        "At least 1 assertion failed: " +
        (error as string).toString().replace(/[^a-zA-Z0-9.]/g, " ")
      ).substring(0, 255);
      await browser.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "' +
          reason +
          '"}}'
      );
    }
  },
};

const tmpConfig = _.defaultsDeep(overrides, defaultConfig);

tmpConfig.capabilities.forEach(function (caps: { [x: string]: unknown }) {
  for (const i in tmpConfig.commonCapabilities)
    caps[i] = caps[i] || tmpConfig.commonCapabilities[i];
});

export const config = tmpConfig;
