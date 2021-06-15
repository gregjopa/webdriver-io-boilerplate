import { Page } from "./basePage";
/**
 * sub page containing specific selectors and methods for a specific page
 */
export class CheckoutPage extends Page {
  /**
   * define selectors using getter methods
   */
  get loginText(): Promise<WebdriverIO.Element> {
    return $("#email");
  }

  get nextButton(): Promise<WebdriverIO.Element> {
    return $("#btnNext");
  }

  get notificationWarning(): Promise<WebdriverIO.Element> {
    return $("#content > div.notifications > p");
  }

  async _inputPhoneNumber(phoneNumber: string): Promise<void> {
    const email = await this.loginText;
    await email.waitForClickable();
    await email.setValue(phoneNumber);
  }

  async isNotification(notificationText: string): Promise<boolean> {
    const notificationWarningLabel = await this.notificationWarning;
    await notificationWarningLabel.waitForDisplayed();
    const text = await notificationWarningLabel.getText();
    return text === notificationText;
  }

  async _clickNextButton(): Promise<void> {
    const nextButton = await this.nextButton;
    await nextButton.waitAndClick();
  }

  async loginUsingPhoneNumber(phoneNumber: string): Promise<void> {
    await this._inputPhoneNumber(phoneNumber);
    await this._clickNextButton();
  }

  async open(): Promise<void> {
    return await super.open("");
  }
}
