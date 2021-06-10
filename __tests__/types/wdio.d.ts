declare namespace WebdriverIO {
  interface Browser {
    switchWindowForCheckout: () => Promise<void>;
  }
  interface Element {
    waitAndClick: () => Promise<void>;
  }
}
