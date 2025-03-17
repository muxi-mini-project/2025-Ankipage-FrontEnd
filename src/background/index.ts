import { checkLoginState } from "~utils"

// Enable side panel and set it to open on extension icon click
chrome.runtime.onInstalled.addListener(() => {
  // Set default side panel behavior
  chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true
  })
})

// Check login state
checkLoginState()
