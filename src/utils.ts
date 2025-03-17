import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { storage } from "~storage"

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

async function getWithAuth<T>(path: string): Promise<T> {
  const token = await storage.getToken()
  if (!token) {
    throw new Error("Not authenticated")
  }

  return fetch(`${baseURL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then((res) => res.json())
}

async function post<T>(
  path: string,
  body: Record<string, unknown>
): Promise<T> {
  return fetch(`${baseURL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then((res) => res.json())
}

async function postWithAuth<T>(
  path: string,
  body: Record<string, unknown>
): Promise<T> {
  const token = await storage.getToken()
  if (!token) {
    throw new Error("Not authenticated")
  }

  return fetch(`${baseURL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
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

export {
  cn,
  openTab,
  openExtTab,
  checkLoginState,
  get,
  getWithAuth,
  post,
  postWithAuth
}
