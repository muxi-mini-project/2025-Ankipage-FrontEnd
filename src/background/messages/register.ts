import type { PlasmoMessaging } from "@plasmohq/messaging"

import { storage } from "~storage"
import { post } from "~utils"

interface RegisterApiResponse {
  code: number
  message: string
  token: string
}

export type RegisterReq = {
  email: string
  password: string
}

export type RegisterRes = {
  success: boolean
  message: string
}

const handler: PlasmoMessaging.MessageHandler<
  RegisterReq,
  RegisterRes
> = async (req, res) => {
  const data = await post<RegisterApiResponse>("/register", {
    email: req.body.email,
    password: req.body.password
  })
  if (data.code === 0) {
    await storage.setToken(data.token)
    res.send({
      success: true,
      message: "login success"
    })
  } else {
    res.send({
      success: false,
      message: data.message
    })
  }
}

export default handler
