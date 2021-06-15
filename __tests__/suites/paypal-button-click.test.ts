import { expect } from "chai";
import { getWarningText } from "../util/action";
import { checkoutWithPaypal, loginWithPhoneNumber } from "../util/common";

describe("Testing Paypal buttons", () => {
  beforeEach("Open StackDemo", async () => {
    await browser.url("/demo/checkout/#/pattern/client");
  });

  it("should start payment flow when clicking on paypal button", async () => {
    await checkoutWithPaypal();
    await browser.switchWindowForCheckout(); //custom command
    await loginWithPhoneNumber("1234567890");
    const text = await getWarningText();
    expect(text).to.be.equals(
      "You haven’t confirmed your mobile yet. Use your email for now."
    );
  });
});
