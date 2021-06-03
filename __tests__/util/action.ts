export function switchToPaypalFrame(): void {
  const frame = $("div#paypal-button-container iframe");
  frame.waitForDisplayed();
  browser.switchToFrame(frame);
}

export function clickPaypalButton(): void {
  const paypalButton = $('[data-funding-source="paypal"]');
  paypalButton.waitAndClick();
}

export function enterPhoneNumber(phoneNumber: string): void {
  const phoneTextField = $("#email");
  phoneTextField.waitForDisplayed();
  phoneTextField.waitForClickable({ timeout: 5000 });
  browser.pause(5000);
  phoneTextField.setValue(phoneNumber);
}

export function clickNextButton(): void {
  const nextButton = $("#btnNext");
  nextButton.waitAndClick();
}

export function getWarningText(): string {
  const notificationWarning = $("#content > div.notifications > p");
  notificationWarning.waitForDisplayed();
  const text = notificationWarning.getText();
  return text;
}
