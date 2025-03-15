import cssText from "data-text:~style.css"
import type { PlasmoGetOverlayAnchor, PlasmoWatchOverlayAnchor } from "plasmo"
import Pencil from "react:~assets/pencil.svg"

import { sendToBackground } from "@plasmohq/messaging"

import type {
  CreateNoteReq,
  CreateNoteRes
} from "~background/messages/createNote"

// load tailwind css
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const getSelectedText = () => {
  const selection = document.getSelection()
  const selectedText = selection?.toString().trim()

  if (selection && selection.rangeCount > 0 && selectedText) {
    return { selection, selectedText }
  }
  return null
}

const getSelectedNode = (selection: Selection): HTMLElement | null => {
  const range = selection.getRangeAt(0)
  const endContainer = range.endContainer

  if (endContainer.nodeType === Node.TEXT_NODE) {
    return endContainer.parentElement
  }

  if (endContainer.nodeType === Node.ELEMENT_NODE) {
    const element = endContainer as Element
    const textNodes = []
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    )

    let node: Node | null
    let currentNode = walker.nextNode()
    while (currentNode) {
      node = currentNode
      if (node.textContent?.trim()) {
        textNodes.push(node)
      }
      currentNode = walker.nextNode()
    }

    if (textNodes.length > 0) {
      return textNodes[textNodes.length - 1].parentElement
    }

    return element as HTMLElement
  }

  return endContainer.parentElement
}

// get anchor node
export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () => {
  const result = getSelectedText()
  if (result) {
    return getSelectedNode(result.selection)
  }
  return null
}

// update popup location
export const watchOverlayAnchor: PlasmoWatchOverlayAnchor = (
  updatePosition
) => {
  const handleMouseUp = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      updatePosition()
    }
  }
  document.addEventListener("mouseup", handleMouseUp)

  return () => {
    document.removeEventListener("mouseup", handleMouseUp)
  }
}

const Popup = () => {
  const processText = (text: string): string => {
    return (
      text
        // Normalize line breaks
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        // Replace more than two newlines with two newlines
        .replace(/\n{3,}/g, "\n\n")
        // Replace multiple spaces with single space (except after newline)
        .replace(/[^\S\n]+/g, " ")
        // Remove spaces before newlines
        .replace(/\s+\n/g, "\n")
        // Remove spaces after newlines
        .replace(/\n\s+/g, "\n")
        // Trim whitespace at start and end
        .trim()
    )
  }

  const uploadAnki = async () => {
    const selected = getSelectedText()
    if (!selected?.selectedText) {
      alert("请先选择要保存的内容")
      return
    }

    try {
      const processedText = processText(selected.selectedText)
      const resp = await sendToBackground<CreateNoteReq, CreateNoteRes>({
        name: "createNote",
        body: {
          content: processedText,
          title: document.title || "未命名",
          url: window.location.href
        }
      })

      if (resp.success) {
        alert("保存成功")
      } else {
        alert(resp.message || "保存失败")
      }
    } catch (error) {
      alert("保存失败：" + error.message)
    }
  }

  return (
    <div className="translate-y-full">
      <button onClick={uploadAnki}>
        <Pencil></Pencil>
      </button>
    </div>
  )
}

export default Popup
