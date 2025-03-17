import type { PlasmoMessaging } from "@plasmohq/messaging"

import { storage } from "~storage"
import { getWithAuth } from "~utils"

export type GetAllNotesReq = Record<never, never>

interface Note {
  content: string
  createdtime: string
  updatedtime: string
  id: number
  title: string
  url: string
}

interface ApiResponse {
  code: number
  data: Note[]
  message: string
}

export type GetAllNotesRes = {
  success: boolean
  message: string
  data?: Note[]
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

    const response = await getWithAuth<ApiResponse>(`/getallnotes/${userId}`)
    if (response.code === 0) {
      // Cache the notes in storage
      await storage.setCachedNotes(response.data)

      res.send({
        success: true,
        message: "Notes retrieved successfully",
        data: response.data.map((note) => ({
          ...note,
          // Ensure dates are properly formatted ISO strings
          createdtime: new Date(note.createdtime).toISOString(),
          updatedtime: new Date(note.updatedtime).toISOString()
        }))
      })
    } else {
      res.send({
        success: false,
        message: response.message
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
