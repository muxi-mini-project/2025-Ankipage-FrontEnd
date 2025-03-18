import Searchbar from "~components/Searchbar"

import "../style.css"

import archive from "assets/archive.json"
import logo from "data-base64:assets/logo.png"
import Lottie from "lottie-react"
import { useEffect, useState } from "react"
import Globe from "react:~assets/globe.svg"
import Trash from "react:~assets/trash.svg"

import { sendToBackground } from "@plasmohq/messaging"

import type {
  GetAllNotesReq,
  GetAllNotesRes
} from "~background/messages/getAllNotes"
import { storage } from "~storage"
import type { Note } from "~types"
import { formatDate } from "~utils"

const Library = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNotes = async () => {
    try {
      setLoading(true)
      // Try to get cached notes first
      const cachedNotes = await storage.getCachedNotes()
      if (cachedNotes) {
        setNotes(cachedNotes)
      }

      // Fetch fresh notes
      const response = await sendToBackground<GetAllNotesReq, GetAllNotesRes>({
        name: "getAllNotes"
      })

      if (response.success && response.data) {
        const notesWithDates = response.data.map((note) => ({
          ...note
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="grid h-screen grid-cols-[minmax(16rem,1fr),4fr]">
      <div className="grid grid-rows-[5rem,auto,16rem]">
        <div className="grid grid-cols-[2fr,3fr] place-items-center">
          <img src={logo} alt="logo" className="size-14" />
          <span className="text-2xl font-bold">ANKIPAGE.</span>
        </div>
        <div className="py-4">
          <div className="flex h-12 items-center justify-center rounded-br-2xl rounded-tr-2xl bg-blue-100">
            <div className="text-center text-xl font-semibold text-blue-700">
              Library
            </div>
          </div>
        </div>
        <Lottie animationData={archive} className="max-w-[30rem]"></Lottie>
      </div>
      <div className="grid grid-rows-[5rem,auto]">
        <div className="my-auto px-8">
          <Searchbar></Searchbar>
        </div>
        <div className="m-4 mt-0 rounded-2xl bg-gray-100 p-4">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-xl font-bold">
                  <th className="px-4 py-3 text-sm text-gray-800">Title</th>
                  <th className="px-4 py-3 text-sm text-gray-800">Content</th>
                  <th className="px-4 py-3 text-sm text-gray-800">Link</th>
                  <th className="px-4 py-3 text-sm text-gray-800">Time</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note) => {
                  return (
                    <tr
                      key={note.id}
                      className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 align-top">
                        <div className="flex flex-wrap gap-1">
                          <span className="inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                            {note.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {note.content}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {note.url && (
                          <a
                            href={note.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex cursor-pointer justify-center">
                            <Globe className="h-5 w-5 text-gray-400" />
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-800">
                        {formatDate(note.createdtime).date}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => {}}
                          className="text-gray-400 transition-colors hover:text-gray-600">
                          <Trash className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Library
