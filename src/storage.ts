import { Storage } from "@plasmohq/storage"

interface Note {
  content: string
  createdtime: string
  updatedtime: string
  id: number
  title: string
  url: string
}

interface StorageKeys {
  token: string
  savedEmail: string
  savedPassword: string
  rememberPassword: boolean
  userid: number
  cachedNotes: Note[]
}

class AppStorage {
  private storage: Storage

  constructor() {
    this.storage = new Storage()
  }

  async getToken(): Promise<string | null> {
    return this.storage.get("token")
  }

  async setToken(token: string): Promise<void> {
    await this.storage.set("token", token)
  }

  async removeToken(): Promise<void> {
    await this.storage.remove("token")
  }

  async getSavedCredentials(): Promise<{
    email: string
    password: string
  } | null> {
    const email = await this.storage.get("savedEmail")
    const password = await this.storage.get("savedPassword")
    const remember = await this.storage.get("rememberPassword")

    if (remember && email && password) {
      return { email, password }
    }
    return null
  }

  async saveCredentials(email: string, password: string): Promise<void> {
    await this.storage.set("savedEmail", email)
    await this.storage.set("savedPassword", password)
    await this.storage.set("rememberPassword", true)
  }

  async clearSavedCredentials(): Promise<void> {
    await this.storage.remove("savedEmail")
    await this.storage.remove("savedPassword")
    await this.storage.set("rememberPassword", false)
  }

  async getUserId(): Promise<number | null> {
    return this.storage.get("userid")
  }

  async setUserId(userid: number): Promise<void> {
    await this.storage.set("userid", userid)
  }

  async removeUserId(): Promise<void> {
    await this.storage.remove("userid")
  }

  async getCachedNotes(): Promise<Note[] | null> {
    return this.storage.get("cachedNotes")
  }

  async setCachedNotes(notes: Note[]): Promise<void> {
    await this.storage.set("cachedNotes", notes)
  }

  async clearCachedNotes(): Promise<void> {
    await this.storage.remove("cachedNotes")
  }
}

export const storage = new AppStorage()
