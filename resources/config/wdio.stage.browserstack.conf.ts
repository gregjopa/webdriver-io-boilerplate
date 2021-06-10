import { config as defaultConfig } from "./wdio.conf";
import * as _ from "lodash";
import { Local } from "browserstack-local";
import * as parseArgs from "minimist";

const epochTime = new Date().getTime();
const bs_local = new Local();
const testName =
  parseArgs(process.argv.slice(2))["bstack-session-name"] || "default_name";
const overrides = {
  user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
  specs: ["__tests__/**/*.test.ts"],
  host: "hub.browserstack.com",
  baseUrl: "https://<internal>.developer.paypal.com",
  waitforTimeout: 50000,
  maxInstances: 5,
  commonCapabilities: {
    "browserstack.maskCommands": "setValues, getValues, setCookies, getCookies",
    "browserstack.debug": true,
    "browserstack.video": true,
    "browserstack.networkLogs": false,
    "browserstack.local": true,
    "browserstack.localIdentifier": epochTime,
    acceptInsecureCerts: true,
    name: testName,
    build:
      process.env.BROWSERSTACK_BUILD_NAME ||
      "webdriver-io-boilerplate" + " - " + epochTime,
  },
  capabilities: [
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Chrome",
      browser_version: "latest",
    },
  ],
  onPrepare: function () {
    console.log("Connecting local");
    return new Promise<void>(function (resolve, reject) {
      bs_local.start(
        {
          key: config.key,
          localIdentifier: `${epochTime}`,
          //   forceLocal: true,
          logFile: `./local-${epochTime}.log`,
        },
        function (error: unknown) {
          if (error) return reject(error);
          console.log("Connected. Now testing...");
          resolve();
        }
      );
    });
  },
  onComplete: function () {
    return new Promise<void>(function (resolve) {
      bs_local.stop(function () {
        console.log("Binary stopped");
        resolve();
      });
    });
  },
  afterTest: async function (
    _test: Record<string, unknown>,
    _context: Record<string, unknown>,
    { passed, error }: Record<string, unknown>
  ) {
    if (parseArgs(process.argv.slice(2))["bstack-session-name"]) {
      browser.executeScript(
        'browserstack_executor: {"action": "setSessionName", "arguments": {"name":"' +
          parseArgs(process.argv.slice(2))["bstack-session-name"] +
          '" }}'
      );
    }

    if (passed) {
      browser.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}'
      );
    } else {
      browser.takeScreenshot();
      const reason =
        "At least 1 assertion failed: " +
        (error as string).toString().replace(/['"]+/g, "");
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
