import { expect } from "chai";
import { getWarningText } from "../util/action";
import { checkoutWithPaypal, loginWithPhoneNumber } from "../util/common";

describe("Testing Paypal buttons", () => {
  beforeEach("Open StackDemo", () => {
    browser.url("/demo/checkout/#/pattern/client");
  });

  afterEach("clear sessionstorage", () => {
    browser.execute(() => sessionStorage.clear());
  });

  it("should start payment flow when clicking on paypal button", () => {
    checkoutWithPaypal();
    browser.switchWindowForCheckout(); //custom command
    loginWithPhoneNumber("1234567890");
    const text = getWarningText();
    expect(text).to.be.equals(
      "You haven’t confirmed your mobile yet. Use your email for now."
    );
  });
});
