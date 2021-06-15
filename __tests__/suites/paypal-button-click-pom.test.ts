import { expect } from "chai";
import { CheckoutPage } from "../pages/checkoutPage";
import { HomePage } from "../pages/homePage";

describe("Testing Paypal buttons", () => {
  beforeEach("Open StackDemo", async () => {
    await browser.url("/demo/checkout/#/pattern/client");
  });

  it("should start payment flow when clicking on paypal button", async () => {
    const homePage = new HomePage();
    await homePage.clickPaypalButton();

    await browser.switchWindowForCheckout(); //custom command

    const checkoutPage = new CheckoutPage();
    await checkoutPage.loginUsingPhoneNumber("1234567890");

    expect(
      await checkoutPage.isNotification(
        "You haven’t confirmed your mobile yet. Use your email for now."
      )
    ).to.be.true;
  });
});
