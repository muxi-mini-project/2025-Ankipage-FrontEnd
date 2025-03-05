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

  return (
    <div className="p-4">
      {/* <button onClick={sendMessage}>Send Message</button>
			<button onClick={() => openExtTab("welcome")}>Login</button> */}
      <AnkiModal></AnkiModal>
    </div>
  )
}

export default IndexPopup

const AnkiModal = () => {
  return (
    <div className="flex size-80 flex-col items-center justify-center gap-4 rounded-[4rem] bg-gradient-to-b from-[#DDEEFF] via-[#F8FCFF] via-30% to-[#FFFFFF] px-12 py-4 font-inter shadow-lg">
      <div className="self-start text-3xl font-bold">准 备 好</div>
      <div className="bg-gradient-to-br from-[#024AF4] via-[#042E9D] to-[#01135D] bg-clip-text text-6xl font-bold text-transparent">
        安&nbsp;&nbsp;&nbsp;可
      </div>
      <div className="self-end text-3xl font-bold">了吗？</div>
      <Button className="w-48">
        <span className="text-3xl font-bold">YES</span>
      </Button>
    </div>
  )
}
