import { openExtTab } from "~utils"

import "./style.css"

import { sendToBackground } from "@plasmohq/messaging/dist"

import { Button } from "~components/ui/Button"

function IndexPopup() {
  const sendMessage = () => {
    sendToBackground({ name: "ping" }).then((res) => {
      alert(res.message)
    })
  }

  const openSidePanel = () => {
    chrome.action.onClicked.addListener((tab) => {
      chrome.sidePanel.open({
        windowId: tab.windowId
      })
    })
  }

  return (
    <div className="h-64 w-64 p-4">
      <Button size="sm" onClick={sendMessage}>
        Send Message
      </Button>
      <Button size="sm" onClick={() => openExtTab("welcome")}>
        Login
      </Button>
      <Button size="sm" onClick={openSidePanel}>
        Side Panel
      </Button>
    </div>
  )
}

export default IndexPopup
