import { remote, Browser } from "webdriverio";
import { config } from "../wdio.conf";

let browser: Browser<"async">;

beforeAll(async () => {
  browser = await remote(config);
});

afterAll(async () => {
  await browser.deleteSession();
});

test("should start payment flow when clicking on paypal button", async () => {
  await browser.url(
    "https://developer.paypal.com/demo/checkout/#/pattern/client"
  );
  expect(await browser.getTitle()).toEqual("Smart Payment Buttons Integration");

  const frame = await browser.$("div#paypal-button-container iframe");

  await browser.switchToFrame(frame);
  const paypalButton = await browser.$('[data-funding-source="paypal"]');
  await paypalButton.waitForDisplayed();
  expect(await paypalButton.isDisplayed()).toEqual(true);

  await paypalButton.click();
  await browser.switchToParentFrame();

  let windows: string[] = await browser.getWindowHandles();

  await browser.waitUntil(async () => {
    if (windows.length >= 2) {
      return true;
    }

    windows = await browser.getWindowHandles();
    return false;
  });

  expect(windows.length).toEqual(2);

  await browser.switchToWindow(windows[1]);

  const emailTextField = await browser.$("#email");
  await emailTextField.waitForDisplayed();

  expect(await browser.getTitle()).toEqual("Log in to your PayPal account");
});
