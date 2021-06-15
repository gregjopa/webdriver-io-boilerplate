import { switchWindow, waitAndClick } from "../../__tests__/util/common";
// since wdio-mochawesome-reporter does not have types, we use ts-ignore to ignore type checks on that
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as mergeResults from "wdio-mochawesome-reporter/mergeResults";

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
  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  chromeOptions: {
    prefs: {
      "profile.default_content_setting_values.geolocation": 1,
    },
  },
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 150000,
  },
  reporters: [
    [
      "mochawesome",
      {
        outputDir: "./mocha-report",
        outputFileFormat: function (opts: {
          cid: unknown;
          capabilities: unknown;
        }): string {
          return `results-${opts.cid}.json`;
        },
      },
    ],
  ],
  mochawesomeOpts: {
    includeScreenshots: true,
    screenshotUseRelativePath: true,
  },
  afterTest: function (
    _test: Record<string, unknown>,
    _context: Record<string, unknown>,
    { error }: Record<string, unknown>
  ): void {
    if (error) {
      browser.takeScreenshot();
    }
  },
  before: function (): void {
    browser.addCommand("switchWindowForCheckout", switchWindow);
    browser.addCommand("waitAndClick", waitAndClick, true);
  },
  onComplete: function (): void {
    mergeResults("./mocha-report", "results-*");
  },
};
