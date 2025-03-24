import { type PlasmoMessaging } from "@plasmohq/messaging"

import { deleteWithAuth } from "~utils"

export type DeleteNoteReq = {
  id: number
}

export type DeleteNoteRes = {
  success: boolean
}

const handler: PlasmoMessaging.MessageHandler<
  DeleteNoteReq,
  DeleteNoteRes
> = async (req, res) => {
  try {
    await deleteWithAuth<{
      code: number
      message: string
    }>(`/deletenote/${req.body.id}`)
    res.send({
      success: true
    })
  } catch (err) {
    console.error("Failed to delete note:", err)
    res.send({
      success: false
    })
  }
}

export default handler
