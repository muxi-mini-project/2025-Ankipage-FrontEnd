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

  return (
    <div className="flex h-full flex-col items-center">
      <SearchBar></SearchBar>
      <div className="h-full grow">
        <AnkiCard></AnkiCard>
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

const AnkiCard = () => {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <File className="text-gray-600" />
            <span className="font-medium text-gray-900">2025-01-02</span>
          </div>
          <Globe className="h-5 w-5 text-gray-400" />
        </div>

        {/* Tag */}
        <div className="mb-4">
          <span className="inline-block rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-500">
            #谁都这样
          </span>
        </div>

        {/* Content */}
        <div className="mb-4 whitespace-pre-line leading-relaxed text-gray-800">
          由于《莱茵报》被查封，马克思感到自己又一次成了失业的知识分子。
          青年黑格尔派在《莱茵报》上本已明显表现出来的分歧进一步发展到彻底的分裂的程度。
          那些在柏林受布鲁诺鲍威尔领导的青年黑格尔派分子，越来越倾向于与政治运动相脱离。
          他们曾想象自己的影响很大，压制他们的观点会导致资产阶级自由派的强烈反对。
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <span className="text-sm text-gray-400">16:06:39</span>
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
