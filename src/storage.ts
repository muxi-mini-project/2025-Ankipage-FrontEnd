import { Storage } from "@plasmohq/storage"

interface StorageKeys {
  token: string
  savedEmail: string
  savedPassword: string
  rememberPassword: boolean
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
}

export const storage = new AppStorage()
