import type { PlasmoMessaging } from "@plasmohq/messaging"

import { storage } from "~storage"
import { postWithAuth } from "~utils"

export type CreateNoteReq = {
  content: string
  title: string
  url: string
}

export type CreateNoteRes = {
  success: boolean
  message: string
  data?: {
    content: string
    title: string
    url: string
  }
}

const handler: PlasmoMessaging.MessageHandler<
  CreateNoteReq,
  CreateNoteRes
> = async (req, res) => {
  try {
    const userId = await storage.getUserId()
    if (!userId) {
      res.send({
        success: false,
        message: "User not logged in"
      })
      return
    }

    const data = await postWithAuth(`/createnote/${userId}`, {
      content: req.body.content,
      title: req.body.title,
      url: req.body.url
    })
    if (data.code === 0) {
      res.send({
        success: true,
        message: "Note created successfully",
        data: data.data
      })
    } else {
      res.send({
        success: false,
        message: data.message
      })
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    })
  }
}

export default handler
