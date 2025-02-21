import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function openTab(url: string) {
  chrome.tabs.create({ url })
}

function openExtTab(id: string) {
  openTab(`./tabs/${id}.html`)
}

export { cn, openTab, openExtTab }
