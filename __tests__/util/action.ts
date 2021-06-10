export async function switchToPaypalFrame(): Promise<void> {
  const frame = await $("div#paypal-button-container iframe");
  await frame.waitForDisplayed();
  await browser.switchToFrame(frame);
}

export async function clickPaypalButton(): Promise<void> {
  const paypalButton = await $('[data-funding-source="paypal"]');
  await paypalButton.waitAndClick();
}

export async function enterPhoneNumber(phoneNumber: string): Promise<void> {
  const phoneTextField = await $("#email");
  await phoneTextField.waitForDisplayed();
  await phoneTextField.waitForClickable();
  await phoneTextField.setValue(phoneNumber);
}

export async function clickNextButton(): Promise<void> {
  const nextButton = await $("#btnNext");
  await nextButton.waitAndClick();
}

export async function getWarningText(): Promise<string> {
  const notificationWarning = await $("#content > div.notifications > p");
  await notificationWarning.waitForDisplayed();
  const text = await notificationWarning.getText();
  return text;
}
