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

async function deleteWithAuth<T>(path: string): Promise<T> {
  const token = await storage.getToken()
  if (!token) {
    throw new Error("Not authenticated")
  }

  return fetch(`${baseURL}${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
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

function processBlank(text: string): string {
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

function formatDate(dateStr: string) {
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
export {
  formatDate,
  cn,
  openTab,
  openExtTab,
  get,
  getWithAuth,
  post,
  postWithAuth,
  deleteWithAuth,
  processBlank
}
