import { Button } from "~components/ui/Button"

import "./style.css"

import { useState } from "react"
import File from "react:~assets/file.svg"
import Globe from "react:~assets/globe.svg"
import X from "react:~assets/x.svg"

import SearchBar from "~components/Searchbar"

const SidePanel = () => {
  return (
    <div className="h-screen w-screen bg-white p-4 font-noto-sc shadow-sm">
      <AnkiList></AnkiList>
    </div>
  )
}

export default SidePanel

const AnkiList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  // Mock data array
  const mockCards: AnkiCardData[] = [
    {
      content:
        "由于《莱茵报》被查封，马克思感到自己又一次成了失业的知识分子。\n青年黑格尔派在《莱茵报》上本已明显表现出来的分歧进一步发展到彻底的分裂的程度。\n那些在柏林受布鲁诺鲍威尔领导的青年黑格尔派分子，越来越倾向于与政治运动相脱离。",
      createdAt: "2025-01-02T16:06:39Z",
      id: 1,
      title: "马克思青年时代",
      updatedAt: "2025-01-02T16:06:39Z",
      url: "https://example.com/marx",
      userID: 1
    },
    {
      content:
        "JavaScript 中的 Promise 是一种用于处理异步操作的对象。它代表了一个可能现在、或者未来才可用的值。\n\nPromise 有三种状态：\n- pending（进行中）\n- fulfilled（已成功）\n- rejected（已失败）",
      createdAt: "2025-01-03T09:15:00Z",
      id: 2,
      title: "Promise基础",
      updatedAt: "2025-01-03T09:15:00Z",
      url: "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise",
      userID: 1
    },
    {
      content:
        "React Hooks 是 React 16.8 中新增的特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。\n\n最常用的 Hooks：\n- useState\n- useEffect\n- useContext",
      createdAt: "2025-01-04T14:30:00Z",
      id: 3,
      title: "React Hooks",
      updatedAt: "2025-01-04T14:30:00Z",
      url: "https://react.dev/reference/react",
      userID: 1
    },
    {
      content:
        "Git 是一个分布式版本控制系统，用于跟踪文件的更改。\n\n基本命令：\n- git add：添加文件到暂存区\n- git commit：提交更改\n- git push：推送到远程仓库",
      createdAt: "2025-01-05T11:20:00Z",
      id: 4,
      title: "Git基础命令",
      updatedAt: "2025-01-05T11:20:00Z",
      url: "https://git-scm.com/doc",
      userID: 1
    },
    {
      content:
        "设计模式中的观察者模式（Observer Pattern）是一种行为型设计模式。\n\n核心组成：\n- Subject（主题）：维护观察者列表，提供注册和通知机制\n- Observer（观察者）：定义更新接口，收到通知时更新\n- ConcreteSubject：具体主题\n- ConcreteObserver：具体观察者",
      createdAt: "2025-01-06T13:45:00Z",
      id: 5,
      title: "观察者模式",
      updatedAt: "2025-01-06T13:45:00Z",
      url: "https://refactoring.guru/design-patterns/observer",
      userID: 1
    },
    {
      content:
        "TCP/IP 协议是互联网的基础协议，采用四层结构：\n\n1. 应用层：HTTP、FTP、SMTP等\n2. 传输层：TCP、UDP\n3. 网络层：IP\n4. 网络接口层：负责硬件接口",
      createdAt: "2025-01-07T10:30:00Z",
      id: 6,
      title: "网络协议层次",
      updatedAt: "2025-01-07T10:30:00Z",
      url: "https://www.rfc-editor.org/rfc/rfc1180",
      userID: 1
    },
    {
      content:
        "Docker容器化技术的核心概念：\n\n- 镜像（Image）：只读模板，用于创建容器\n- 容器（Container）：镜像的运行实例\n- Dockerfile：用于构建镜像的脚本\n- Docker Compose：用于定义和运行多容器应用",
      createdAt: "2025-01-08T15:20:00Z",
      id: 7,
      title: "Docker基础",
      updatedAt: "2025-01-08T15:20:00Z",
      url: "https://docs.docker.com/get-started/",
      userID: 1
    },
    {
      content:
        "Python中的装饰器是一种修改或增强函数功能的方式，无需直接修改函数的源代码。\n\n装饰器的常见用途：\n- 日志记录\n- 访问控制\n- 性能测量\n- 缓存",
      createdAt: "2025-01-09T16:40:00Z",
      id: 8,
      title: "Python装饰器",
      updatedAt: "2025-01-09T16:40:00Z",
      url: "https://docs.python.org/3/glossary.html#term-decorator",
      userID: 1
    }
  ]

  return (
    <div className="flex h-full flex-col items-center">
      <SearchBar></SearchBar>
      <div className="h-full grow overflow-y-auto">
        <div className="flex flex-col gap-6">
          {mockCards.map((card) => (
            <AnkiCard key={card.id} data={card}></AnkiCard>
          ))}
        </div>
        <AnkiModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={() => {}}></AnkiModal>
      </div>
      <div className="flex w-full flex-row items-center justify-around">
        <Button onClick={() => setIsModalOpen(true)}>ANKI</Button>
        <Button>LIB</Button>
        <Button>MORE</Button>
      </div>
    </div>
  )
}

interface AnkiCardData {
  content: string
  createdAt: string
  id: number
  title: string
  updatedAt: string
  url: string
  userID: number
}

interface AnkiCardProps {
  data?: AnkiCardData
}

const AnkiCard = ({ data }: AnkiCardProps) => {
  if (!data) return null

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return {
      date: date.toLocaleDateString("zh-CN"),
      time: date.toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
    }
  }

  const createdAtFormatted = formatDate(data.createdAt)

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <File className="text-gray-600" />
            <span className="font-medium text-gray-900">
              {createdAtFormatted.date}
            </span>
          </div>
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:text-blue-500">
            <Globe className="h-5 w-5 text-gray-400" />
          </a>
        </div>

        {/* Tag */}
        <div className="mb-4">
          <span className="inline-block rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-500">
            #{data.title}
          </span>
        </div>

        {/* Content */}
        <div className="mb-4 whitespace-pre-line leading-relaxed text-gray-800">
          {data.content}
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <span className="text-sm text-gray-400">
            {createdAtFormatted.time}
          </span>
        </div>
      </div>
    </div>
  )
}

interface AnkiModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const AnkiModal = ({ isOpen, onClose, onConfirm }: AnkiModalProps) => {
  if (!isOpen) return null

  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex size-80 flex-col items-center justify-center gap-4 rounded-[4rem] bg-gradient-to-b from-[#DDEEFF] via-[#F8FCFF] via-30% to-[#FFFFFF] px-12 py-4 font-inter shadow-lg">
        <X
          className="absolute right-8 top-8 cursor-pointer"
          onClick={onClose}></X>
        <div className="self-start text-3xl font-bold">准 备 好</div>
        <div className="bg-gradient-to-br from-[#024AF4] via-[#042E9D] to-[#01135D] bg-clip-text text-6xl font-bold text-transparent">
          安&nbsp;&nbsp;&nbsp;可
        </div>
        <div className="self-end text-3xl font-bold">了吗？</div>
        <Button className="w-48" onClick={onConfirm}>
          <span className="text-3xl font-bold">YES</span>
        </Button>
      </div>
    </div>
  )
}
