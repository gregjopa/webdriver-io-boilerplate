export function switchWindow(): void {
  const windows: string[] = browser.getWindowHandles();
  browser.switchToWindow(windows[1]);
}
