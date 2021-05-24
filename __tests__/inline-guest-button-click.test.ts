import { remote, Browser } from "webdriverio";
import { config } from "../wdio.conf";

let browser: Browser<"async">;

beforeAll(async () => {
  browser = await remote(config);
  await browser.url(
    "https://developer.paypal.com/demo/checkout/#/pattern/client"
  );
  expect(await browser.getTitle()).toEqual("Smart Payment Buttons Integration");
});

afterAll(async () => {
  await browser.deleteSession();
});

test("should open the debit/credit card form", async () => {
  const iframe = await browser.$("div#paypal-button-container iframe");
  await browser.switchToFrame(iframe);
  const debitOrCreditButton = await browser.$('[data-funding-source="card"]');
  await debitOrCreditButton.waitForDisplayed();
  await debitOrCreditButton.click();

  let cardFieldsComponent = await browser.$$("div#card-fields-container:empty");

  await browser.waitUntil(
    async () => {
      cardFieldsComponent = await browser.$$("div#card-fields-container:empty");
      return cardFieldsComponent.length == 0;
    },
    {
      timeoutMsg: "Expired time waiting to open the form",
    }
  );
  expect(cardFieldsComponent.length).toEqual(0);

  await browser.switchToFrame(0);

  const form = await browser.$("div#root form");
  await form.waitForDisplayed();
  const cardNumberText = await browser.$("#credit-card-number");
  await cardNumberText.waitForDisplayed();
});
