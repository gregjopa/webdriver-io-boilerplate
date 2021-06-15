import { Page } from "./basePage";
/**
 * sub page containing specific selectors and methods for a specific page
 */
export class HomePage extends Page {
  /**
   * define selectors using getter methods
   */
  get paypalFrame(): Promise<WebdriverIO.Element> {
    return $("div#paypal-button-container iframe");
  }

  get paypalButton(): Promise<WebdriverIO.Element> {
    return $('[data-funding-source="paypal"]');
  }

  async _switchToPaypalFrame(): Promise<void> {
    const paypalFrame = await this.paypalFrame;
    await paypalFrame.waitForDisplayed();
    await browser.switchToFrame(paypalFrame);
  }

  async _switchToParentFrame(): Promise<void> {
    await browser.switchToParentFrame();
  }

  async _clickPaypalButton(): Promise<void> {
    const paypalButton = await this.paypalButton;
    await paypalButton.waitForDisplayed();
    await paypalButton.waitAndClick();
  }

  async clickPaypalButton(): Promise<void> {
    await this._switchToPaypalFrame();
    await this._clickPaypalButton();
    await this._switchToParentFrame();
  }

  async open(): Promise<void> {
    return await super.open("");
  }
}
