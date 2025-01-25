chrome.action.onClicked.addListener(async (tab) => {
  const { isLoggedIn } = await chrome.storage.local.get('isLoggedIn');
  if (isLoggedIn) {
      await chrome.sidePanel.open({ tabId: tab.id });
  } else {
      const registerPageUrl = chrome.runtime.getURL('register.html');
      chrome.tabs.create({ url: registerPageUrl });
  }
});