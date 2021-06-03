import { expect } from "chai";
import { CheckoutPage } from "../pages/checkoutPage";
import { HomePage } from "../pages/homePage";
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
    const homePage = new HomePage();
    homePage.clickPaypalButton();

    switchWindow();

    const checkoutPage = new CheckoutPage();
    checkoutPage.loginUsingPhoneNumber("1234567890");

    expect(
      checkoutPage.isNotification(
        "You haven’t confirmed your mobile yet. Use your email for now."
      )
    ).to.be.true;
  });
});
