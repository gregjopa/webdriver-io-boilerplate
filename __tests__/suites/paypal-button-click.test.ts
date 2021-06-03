import { expect } from "chai";
import { switchWindow } from "../util/common";

describe("Testing Paypal buttons", () => {
  beforeEach("Open StackDemo", () => {
    browser.url("/demo/checkout/#/pattern/client");
  });

  afterEach("clear sessionstorage", () => {
    browser.execute(() => sessionStorage.clear());
  });

  it("should start payment flow when clicking on paypal button", () => {
    const frame = $("div#paypal-button-container iframe");
    frame.waitForDisplayed();
    browser.switchToFrame(frame);
    const paypalButton = $('[data-funding-source="paypal"]');
    paypalButton.waitForDisplayed();
    paypalButton.click();
    browser.switchToParentFrame();

    switchWindow();

    const phoneTextField = $("#email");
    phoneTextField.waitForDisplayed();
    phoneTextField.setValue("1234567890");
    const nextButton = $("#btnNext");
    nextButton.waitForClickable({ timeout: 5000 });
    nextButton.click();

    const notificationWarning = $("#content > div.notifications > p");
    notificationWarning.waitForDisplayed();
    const text = notificationWarning.getText();
    expect(text).to.be.equals(
      "You haven’t confirmed your mobile yet. Use your email for now."
    );
  });
});
