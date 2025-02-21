import "../style.css"

import archive from "assets/archive.json"
import logo from "data-base64:assets/logo.png"
import Lottie from "lottie-react"

const Welcome = () => {
  return (
    <div className="bg-gradient-to-br from-[#E7F2FE] via-[#DBEDFF] to-[#CBE4FE] w-screen h-screen flex items-center justify-center">
      <div className="w-2/3 max-w-[1280px] h-2/3 max-h-[720px] bg-white rounded-[20px] shadow-[36px_37px_33.9px_4px_rgba(72,97,157,0.53)] p-8 bg-[url(~assets/loginBg.png)] bg-no-repeat bg-right bg-cover grid grid-cols-[2fr,3fr] overflow-clip">
        <div className="grid grid-rows-[5rem,auto]">
          <header className="flex items-center">
            <img src={logo} alt="logo" className="size-16" />
            <h1 className="text-2xl font-bold">ANKIPAGE.</h1>
          </header>
          <main className="bg-indigo-500"></main>
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
