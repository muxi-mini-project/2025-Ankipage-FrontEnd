import "./style.css"

import { sendToBackground } from "@plasmohq/messaging/dist"

function IndexPopup() {
  const sendMessage = () => {
    sendToBackground({ name: "ping" }).then((res) => {
      alert(res.message)
    })
  }

  return (
    <div className="p-4">
      <button onClick={sendMessage}>Send Message</button>
    </div>
  )
}

export default IndexPopup
