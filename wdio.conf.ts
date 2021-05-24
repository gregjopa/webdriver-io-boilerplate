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
  capabilities: {
    browserName: "chrome",
  },
  waitforTimeout: 10000,
  logLevel: "silent",
};
