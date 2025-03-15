import type { PlasmoMessaging } from "@plasmohq/messaging"

import { storage } from "~storage"
import { post } from "~utils"

export type LoginReq = {
  email: string
  password: string
}

export type LoginRes = {
  success: boolean
  message: string
  data?: {
    userid: number
  }
}

const handler: PlasmoMessaging.MessageHandler<LoginReq, LoginRes> = async (
  req,
  res
) => {
  const data = await post("/login", {
    email: req.body.email,
    password: req.body.password
  })
  if (data.code === 0) {
    await storage.setToken(data.token)
    res.send({
      success: true,
      message: "login success",
      data: {
        userid: data.data.userid
      }
    })
  } else {
    res.send({
      success: false,
      message: data.message
    })
  }
}

export default handler
