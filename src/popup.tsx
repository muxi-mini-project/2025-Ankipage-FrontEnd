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
    // 获取当前窗口的 ID
    chrome.windows.getCurrent({ populate: true }, (window) => {
      // 确保 chrome.sidePanel 可用 (需要类型声明)
      ;(chrome as any).sidePanel.open({ windowId: window.id })
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
