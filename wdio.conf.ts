import { RemoteOptions } from "webdriverio";

export const config: RemoteOptions = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  services: [
    [
      "browserstack",
      {
        browserstackLocal: true,
      },
    ],
  ],
  commonCapabilities: {
    build: "Mobile Device Test Examples",
    project: "PayPal SDK",
  },
  capabilities: [
    {
      // @ts-expect-error os key is invalid
      os: "Windows",
      os_version: "10",
      browserName: "Chrome",
      browser_version: "latest",
    },
    {
      // @ts-expect-error browserName key is invalid
      browserName: "android",
      os_version: "10.0",
      device: "Samsung Galaxy S20",
      real_mobile: "true",
    },
  ],

  waitforTimeout: 10000,
  logLevel: "silent",
};
