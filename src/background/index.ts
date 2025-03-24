import { storage } from "~storage"
import { openExtTab } from "~utils"

// Enable side panel and set it to open on extension icon click
chrome.runtime.onInstalled.addListener(async () => {
  // Set default side panel behavior
  chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true
  })

  // Check login state
  const token = await storage.getToken()
  if (!token) {
    openExtTab("welcome")
  }
})
