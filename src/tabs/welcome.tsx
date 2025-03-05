import "../style.css"

import archive from "assets/archive.json"
import logo from "data-base64:assets/logo.png"
import Lottie from "lottie-react"
import { forwardRef, useState, type ComponentProps } from "react"
import Eye from "react:~assets/eye.svg"
import Lock from "react:~assets/lock.svg"
import Shield from "react:~assets/shield.svg"
import User from "react:~assets/user.svg"

import { Button } from "~components/Button"
import { Checkbox } from "~components/Checkbox"
import { Input } from "~components/Input"
import { cn } from "~utils"

interface TransitionProps extends ComponentProps<"div"> {
  active: boolean
}

const Transition = forwardRef<HTMLDivElement, TransitionProps>(
  ({ active, ref, children, className, ...props }) => {
    return (
      <div
        ref={ref}
        data-active={active}
        className={cn(
          `absolute translate-x-[120%] overflow-hidden opacity-0 transition-[opacity,transform] duration-500 data-[active=true]:translate-x-0 data-[active=true]:opacity-100 data-[active=true]:delay-500`,
          className
        )}
        {...props}>
        {children}
      </div>
    )
  }
)
Transition.displayName = "Transition"

type WelcomeType = "login" | "register" | "reset"

const Welcome = () => {
  const [type, _setType] = useState<WelcomeType>("login")
  const setType = (type: WelcomeType) => {
    _setType(type)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-[#E7F2FE] via-[#DBEDFF] to-[#CBE4FE]">
      <div className="grid h-2/3 max-h-[720px] w-2/3 max-w-[1280px] grid-cols-[2fr,3fr] overflow-clip rounded-[20px] bg-white bg-[url(~assets/loginBg.png)] bg-cover bg-right bg-no-repeat p-8 shadow-[36px_37px_33.9px_4px_rgba(72,97,157,0.53)]">
        <div className="grid grid-rows-[5rem,auto]">
          <header className="flex items-center">
            <img src={logo} alt="logo" className="size-16" />
            <h1 className="text-2xl font-bold">ANKIPAGE.</h1>
          </header>
          <main className="relative flex flex-col items-center justify-center gap-4">
            <Login active={type === "login"} setType={setType}></Login>
            <Register active={type === "register"} setType={setType}></Register>
            <Reset active={type === "reset"} setType={setType}></Reset>
          </main>
        </div>
        <div className="flex items-center justify-center">
          <Lottie
            animationData={archive}
            className="max-w-[30rem] -rotate-6"></Lottie>
        </div>
      </div>
    </div>
  )
}
export default Welcome

const Login = ({
  active,
  setType
}: {
  active: boolean
  setType?: (type: WelcomeType) => void
}) => {
  return (
    <Transition
      active={active}
      className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-center text-3xl font-semibold">
        Welcome to ANKIPAGE.
      </h1>
      <Input placeholder="muxistudio@qq.com" leftIcon={User}></Input>
      <Input
        placeholder="请输入密码"
        type="password"
        leftIcon={Lock}
        rightIcon={Eye}></Input>
      <div className="flex w-full items-center justify-around">
        <Checkbox label="记住密码"></Checkbox>
        <span
          className="cursor-pointer text-sky-600"
          onClick={() => setType("reset")}>
          忘记密码？
        </span>
      </div>
      <Button size="sm" className="w-48">
        登录
      </Button>
      <span className="text-pretty text-gray-600">
        还没有账号，
        <span
          className="cursor-pointer text-sky-600"
          onClick={() => setType("register")}>
          立即注册
        </span>
      </span>
    </Transition>
  )
}

const Register = ({
  active,
  setType
}: {
  active: boolean
  setType?: (type: WelcomeType) => void
}) => {
  return (
    <Transition
      active={active}
      className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-center text-3xl font-semibold">
        Welcome to ANKIPAGE.
      </h1>
      <div className="flex w-full items-center justify-end pr-4">
        <span className="text-pretty text-gray-600">
          已有账号，
          <span
            className="cursor-pointer text-sky-600"
            onClick={() => setType("login")}>
            立即登录
          </span>
        </span>
      </div>
      <Input placeholder="muxistudio@qq.com" leftIcon={User}></Input>
      <Input
        placeholder="请输入密码"
        type="password"
        leftIcon={Lock}
        rightIcon={Eye}></Input>
      <Input
        placeholder="确认密码"
        type="password"
        leftIcon={Lock}
        rightIcon={Eye}></Input>
      <Button size="sm" className="w-48">
        注册
      </Button>
    </Transition>
  )
}

const Reset = ({
  active,
  setType
}: {
  active: boolean
  setType?: (type: WelcomeType) => void
}) => {
  return (
    <Transition
      active={active}
      className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-center text-3xl font-semibold">
        Welcome to ANKIPAGE.
      </h1>
      <div className="flex w-full items-center justify-end pr-4">
        <span className="text-pretty text-gray-600">
          已有账号，
          <span
            className="cursor-pointer text-sky-600"
            onClick={() => setType("login")}>
            立即登录
          </span>
        </span>
      </div>
      <Input placeholder="muxistudio@qq.com" leftIcon={User}></Input>
      <div className="grid w-full grid-cols-[3fr,2fr] gap-2 px-3">
        <Input
          placeholder="请输入验证码"
          className="w-full"
          leftIcon={Shield}></Input>
        <Button size="sm" className="w-full text-nowrap text-xs">
          获取验证码
        </Button>
      </div>
      <Input
        placeholder="请输入新密码"
        type="password"
        leftIcon={Lock}
        rightIcon={Eye}></Input>
      <Input
        placeholder="请确认新密码"
        type="password"
        leftIcon={Lock}
        rightIcon={Eye}></Input>
      <Button size="sm" className="w-48">
        注册
      </Button>
    </Transition>
  )
}
