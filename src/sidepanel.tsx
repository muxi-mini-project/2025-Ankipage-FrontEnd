import { Button } from "~components/ui/Button"

import "./style.css"

import { useEffect, useState } from "react"
import Book from "react:~assets/book.svg"
import File from "react:~assets/file.svg"
import Globe from "react:~assets/globe.svg"
import Lib from "react:~assets/lib.svg"
import More from "react:~assets/more.svg"
import X from "react:~assets/x.svg"

import { sendToBackground } from "@plasmohq/messaging"

import type {
  GetAllNotesReq,
  GetAllNotesRes
} from "~background/messages/getAllNotes"
import SearchBar from "~components/Searchbar"
import { storage } from "~storage"
import type { Note } from "~types"
import { formatDate } from "~utils"

const SidePanel = () => {
  return (
    <div className="h-screen w-screen bg-white p-0 font-noto-sc shadow-sm">
      <AnkiList></AnkiList>
    </div>
  )
}

export default SidePanel

const AnkiList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNotes = async () => {
    try {
      setLoading(true)
      // Try to get cached notes first
      const cachedNotes = await storage.getCachedNotes()
      if (cachedNotes) {
        setNotes(
          cachedNotes.map((note) => ({
            ...note
          }))
        )
      }

      // Fetch fresh notes
      const response = await sendToBackground<GetAllNotesReq, GetAllNotesRes>({
        name: "getAllNotes"
      })

      if (response.success && response.data) {
        const notesWithDates = response.data.map((note) => ({
          ...note,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userID: 1
        }))
        setNotes(notesWithDates)
      }
    } catch (error) {
      console.error("Error fetching notes:", error)
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchNotes()
  }, [])

  // Refresh notes when sidebar gains focus
  useEffect(() => {
    const handleFocus = () => {
      console.log("Sidebar focused, refreshing notes...")
      fetchNotes()
    }

    // Add focus event listener
    window.addEventListener("focus", handleFocus)

    // Cleanup
    return () => {
      window.removeEventListener("focus", handleFocus)
    }
  }, [])

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">Loading...</div>
    )
  }

  return (
    <div className="relative flex h-full flex-col items-center">
      <SearchBar className="absolute z-10"></SearchBar>
      <div className="h-full grow overflow-y-auto scrollbar-hide">
        <div className="flex flex-col gap-6 pt-16">
          {notes.map((card) => (
            <AnkiCard key={card.id} data={card}></AnkiCard>
          ))}
        </div>
        <AnkiModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={() => {}}></AnkiModal>
      </div>
      <div className="absolute bottom-2 flex w-full flex-row items-center justify-around">
        <Button
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="grid grid-cols-[1rem,auto] gap-2 font-extrabold">
          <Book className="size-5"></Book>
          <span>ANKI</span>
        </Button>
        <Button
          size="sm"
          className="grid grid-cols-[1rem,auto] gap-2 font-extrabold">
          <Lib className="size-5"></Lib>
          LIB
        </Button>
        <Button size="sm" className="font-extrabold">
          <More className="size-5"></More>
        </Button>
      </div>
    </div>
  )
}

const AnkiCard = ({ data }: { data?: Note }) => {
  if (!data) return null

  const createdAtFormatted = formatDate(data.createdtime)

  return (
    <div className="mx-auto max-w-2xl p-2">
      <div className="relative rounded-3xl border-[1.5px] border-gray-300 bg-white p-4 pt-0 shadow-[2px_4px_4px_0_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div className="mb-2 flex flex-row gap-2">
          <div className="left-4 mx-2 flex h-6 w-12 -translate-y-[calc(100%-1px)] items-center justify-center rounded-tl-full rounded-tr-full border-[1.5px] border-b-0 bg-white px-2">
            <File className="relative translate-y-1/2 text-gray-600" />
          </div>
          <span className="pt-4 text-base font-bold text-gray-900">
            {createdAtFormatted.date}
          </span>
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 top-4 cursor-pointer">
            <Globe className="h-5 w-5 text-gray-400" />
          </a>
        </div>

        {/* Tag */}
        <div className="mb-2">
          <span className="inline-block max-w-xs overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-500">
            #{data.title}
          </span>
        </div>

        {/* Content */}
        <div className="mb-2 line-clamp-5 max-h-48 overflow-hidden text-ellipsis whitespace-pre-line text-base leading-relaxed text-gray-800">
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
