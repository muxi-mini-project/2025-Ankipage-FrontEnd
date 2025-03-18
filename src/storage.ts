import { Storage } from "@plasmohq/storage"

import type { Note } from "~types"

/**
 * Enum for storage keys to ensure consistency and type safety
 */
export enum StorageKey {
  Token = "token",
  SavedEmail = "savedEmail",
  SavedPassword = "savedPassword",
  RememberPassword = "rememberPassword",
  UserId = "userid",
  CachedNotes = "cachedNotes"
}

/**
 * Type definition for storage values
 */
interface StorageValues {
  [StorageKey.Token]: string
  [StorageKey.SavedEmail]: string
  [StorageKey.SavedPassword]: string
  [StorageKey.RememberPassword]: boolean
  [StorageKey.UserId]: number
  [StorageKey.CachedNotes]: Note[]
}

/**
 * Storage class for managing application state
 */
class AppStorage {
  private storage: Storage

  constructor() {
    this.storage = new Storage()
  }

  /**
   * Generic method to get a value from storage
   * @param key - Storage key
   * @returns Promise with the value or null
   */
  private async getValue<K extends StorageKey>(
    key: K
  ): Promise<StorageValues[K] | null> {
    return this.storage.get(key)
  }

  /**
   * Generic method to set a value in storage
   * @param key - Storage key
   * @param value - Value to store
   */
  private async setValue<K extends StorageKey>(
    key: K,
    value: StorageValues[K]
  ): Promise<void> {
    await this.storage.set(key, value)
  }

  /**
   * Generic method to remove a value from storage
   * @param key - Storage key
   */
  private async removeValue(key: StorageKey): Promise<void> {
    await this.storage.remove(key)
  }

  /**
   * Get the authentication token
   */
  async getToken(): Promise<string | null> {
    return this.getValue(StorageKey.Token)
  }

  /**
   * Set the authentication token
   */
  async setToken(token: string): Promise<void> {
    await this.setValue(StorageKey.Token, token)
  }

  /**
   * Remove the authentication token
   */
  async removeToken(): Promise<void> {
    await this.removeValue(StorageKey.Token)
  }

  /**
   * Get saved credentials if remember password is enabled
   */
  async getSavedCredentials(): Promise<{
    email: string
    password: string
  } | null> {
    const email = await this.getValue(StorageKey.SavedEmail)
    const password = await this.getValue(StorageKey.SavedPassword)
    const remember = await this.getValue(StorageKey.RememberPassword)

    if (remember && email && password) {
      return { email, password }
    }
    return null
  }

  /**
   * Save user credentials and enable remember password
   */
  async saveCredentials(email: string, password: string): Promise<void> {
    await this.setValue(StorageKey.SavedEmail, email)
    await this.setValue(StorageKey.SavedPassword, password)
    await this.setValue(StorageKey.RememberPassword, true)
  }

  /**
   * Clear saved credentials and disable remember password
   */
  async clearSavedCredentials(): Promise<void> {
    await this.removeValue(StorageKey.SavedEmail)
    await this.removeValue(StorageKey.SavedPassword)
    await this.setValue(StorageKey.RememberPassword, false)
  }

  /**
   * Get the user ID
   */
  async getUserId(): Promise<number | null> {
    return this.getValue(StorageKey.UserId)
  }

  /**
   * Set the user ID
   */
  async setUserId(userId: number): Promise<void> {
    await this.setValue(StorageKey.UserId, userId)
  }

  /**
   * Remove the user ID
   */
  async removeUserId(): Promise<void> {
    await this.removeValue(StorageKey.UserId)
  }

  /**
   * Get cached notes
   */
  async getCachedNotes(): Promise<Note[] | null> {
    return this.getValue(StorageKey.CachedNotes)
  }

  /**
   * Set cached notes
   */
  async setCachedNotes(notes: Note[]): Promise<void> {
    await this.setValue(StorageKey.CachedNotes, notes)
  }

  /**
   * Clear cached notes
   */
  async clearCachedNotes(): Promise<void> {
    await this.removeValue(StorageKey.CachedNotes)
  }
}

export const storage = new AppStorage()
