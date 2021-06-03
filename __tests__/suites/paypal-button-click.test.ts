import { expect } from "chai";
import { switchWindow } from "../util/common";

describe("Testing Paypal buttons", () => {
  beforeEach("Open StackDemo", () => {
<<<<<<< HEAD
    browser.url("https://developer.paypal.com/demo/checkout/#/pattern/client");
=======
    browser.url("/demo/checkout/#/pattern/client");
>>>>>>> b0628e439c3d6a03aba11d540eb6ce2b7d13809b
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
