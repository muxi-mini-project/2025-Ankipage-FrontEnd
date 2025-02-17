import cssText from "data-text:~style.css"
import type { PlasmoGetOverlayAnchor, PlasmoWatchOverlayAnchor } from "plasmo"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () => {
  const selection = document.getSelection()
  const selectedText = selection?.toString().trim()

  // 确保有选中的文本
  if (selection && selection.rangeCount > 0 && selectedText) {
    const range = selection.getRangeAt(0)
    const endContainer = range.endContainer

    // 如果结束容器是文本节点，返回其父元素
    if (endContainer.nodeType === Node.TEXT_NODE) {
      return endContainer.parentElement as HTMLElement
    }

    // 如果结束容器是元素节点，检查是否需要向下查找到最后一个包含文本的元素
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

      // 如果找到了文本节点，返回最后一个文本节点的父元素
      if (textNodes.length > 0) {
        return textNodes[textNodes.length - 1].parentElement as HTMLElement
      }

      // 如果没有找到文本节点，返回元素本身
      return element as HTMLElement
    }

    // 如果以上都不满足，返回 range 的 endContainer 的父元素
    return endContainer.parentElement as HTMLElement
  }
  return null
}

export const watchOverlayAnchor: PlasmoWatchOverlayAnchor = (
  updatePosition
) => {
  const handleMouseUp = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      updatePosition()
    }
  }

  // 添加事件监听
  document.addEventListener("mouseup", handleMouseUp)

  // 清理函数
  return () => {
    document.removeEventListener("mouseup", handleMouseUp)
  }
}

const Popup = (anchor) => {
  return (
    <div className="p-2 bg-white border border-gray-300 rounded shadow-lg translate-y-full">
      <span>{anchor}</span>
    </div>
  )
}

export default Popup
