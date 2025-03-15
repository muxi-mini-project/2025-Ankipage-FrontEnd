import { env } from "process"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { storage } from "~storage"

// const baseURL =
//   env.NODE_ENV === "development" ? "http://8.148.26.46" : "https://plasmo.io"
const baseURL = "http://8.148.26.46:9090"

function get(path: string) {
  return fetch(`${baseURL}${path}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => res.json())
}

function post(path: string, body: Record<string, unknown>) {
  return fetch(`${baseURL}${path}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then((res) => res.json())
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function openTab(url: string) {
  chrome.tabs.create({ url })
}

function openExtTab(id: string) {
  openTab(`./tabs/${id}.html`)
}

async function checkLoginState() {
  const token = await storage.getToken()
  if (!token) {
    openExtTab("welcome")
  }
}

export { cn, openTab, openExtTab, checkLoginState, get, post }
