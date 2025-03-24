import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { APIResponse } from "~types"
import { post } from "~utils"

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
  const data = await post<APIResponse<{ email: string; userId: string }>>(
    "/register",
    {
      email: req.body.email,
      password: req.body.password
    }
  )
  if (data.code === 0) {
    res.send({
      success: true,
      message: "register success"
    })
  } else {
    res.send({
      success: false,
      message: data.message
    })
  }
}

export default handler
