import { Page } from "./basePage";
/**
 * sub page containing specific selectors and methods for a specific page
 */
export class HomePage extends Page {
  /**
   * define selectors using getter methods
   */
  get paypalFrame(): WebdriverIO.Element {
    return $("div#paypal-button-container iframe");
  }

  get paypalButton(): WebdriverIO.Element {
    return $('[data-funding-source="paypal"]');
  }

  _switchToPaypalFrame(): void {
    this.paypalFrame.waitForDisplayed();
    browser.switchToFrame(this.paypalFrame);
  }

  _switchToParentFrame(): void {
    browser.switchToParentFrame();
  }

  _clickPaypalButton(): void {
    this.paypalButton.waitForDisplayed();
    this.paypalButton.waitForClickable({ timeout: 5000 });
    this.paypalButton.click();
  }

  clickPaypalButton(): void {
    this._switchToPaypalFrame();
    this._clickPaypalButton();
    this._switchToParentFrame();
  }

  open(): string {
    return super.open("");
  }
}
