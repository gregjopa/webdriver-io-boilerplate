import { expect } from "chai";

describe("Testing Paypal buttons", () => {
  beforeEach(async () => {
    await browser.url(
      "https://developer.paypal.com/demo/checkout/#/pattern/client"
    );
  });

  it("should start payment flow when clicking on paypal button", async () => {
    const pageTitle = await browser.getTitle();
    expect(pageTitle).to.equal("Smart Payment Buttons Integration");

    const frame = await browser.$("div#paypal-button-container iframe");

    await browser.switchToFrame(frame);
    const paypalButton = await browser.$('[data-funding-source="paypal"]');
    await paypalButton.waitForDisplayed();

    const isButtonDisplayed = await paypalButton.isDisplayed();
    expect(isButtonDisplayed).to.equal(true);

    await paypalButton.click();
    await browser.switchToParentFrame();

    let windows: string[] = await browser.getWindowHandles();
    expect(windows.length).to.equal(2);

    await browser.switchToWindow(windows[1]);

    const emailTextField = await browser.$("#email");
    await emailTextField.waitForDisplayed();

    const loginPageTitle = await browser.getTitle();
    expect(loginPageTitle).to.equal("Log in to your PayPal account");
  });
});
