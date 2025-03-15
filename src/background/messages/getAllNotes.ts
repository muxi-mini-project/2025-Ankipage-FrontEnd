import type { PlasmoMessaging } from "@plasmohq/messaging"

import { storage } from "~storage"
import { getWithAuth } from "~utils"

export type GetAllNotesReq = Record<never, never>

export type GetAllNotesRes = {
  success: boolean
  message: string
  data?: Array<{
    content: string
    id: number
    title: string
    url: string
  }>
}

const handler: PlasmoMessaging.MessageHandler<
  GetAllNotesReq,
  GetAllNotesRes
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

    const data = await getWithAuth(`/getallnotes/${userId}`)
    if (data.code === 0) {
      // Cache the notes in storage
      await storage.setCachedNotes(data.data)

      res.send({
        success: true,
        message: "Notes retrieved successfully",
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
