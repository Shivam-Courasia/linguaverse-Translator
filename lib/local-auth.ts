export interface User {
  id: string
  email: string
  fullName: string
  createdAt: string
}

export interface Translation {
  id: string
  userId: string
  sourceText: string
  translatedText: string
  sourceLanguage: string
  targetLanguage: string
  createdAt: string
}

const USERS_KEY = "linguaverse_users"
const CURRENT_USER_KEY = "linguaverse_current_user"
const TRANSLATIONS_KEY = "linguaverse_translations"
const PASSWORDS_KEY = "linguaverse_passwords"

export class LocalAuth {
  // Check if we're in browser environment
  private static isBrowser(): boolean {
    return typeof window !== "undefined"
  }

  // User Management
  static getUsers(): User[] {
    if (!this.isBrowser()) return []
    try {
      const users = localStorage.getItem(USERS_KEY)
      return users ? JSON.parse(users) : []
    } catch (error) {
      console.error("Error getting users:", error)
      return []
    }
  }

  static saveUsers(users: User[]): void {
    if (!this.isBrowser()) return
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
    } catch (error) {
      console.error("Error saving users:", error)
    }
  }

  static getCurrentUser(): User | null {
    if (!this.isBrowser()) return null
    try {
      const user = localStorage.getItem(CURRENT_USER_KEY)
      return user ? JSON.parse(user) : null
    } catch (error) {
      console.error("Error getting current user:", error)
      return null
    }
  }

  static setCurrentUser(user: User | null): void {
    if (!this.isBrowser()) return
    try {
      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
      } else {
        localStorage.removeItem(CURRENT_USER_KEY)
      }
    } catch (error) {
      console.error("Error setting current user:", error)
    }
  }

  // Authentication Methods
  static signUp(email: string, password: string, fullName: string): { user?: User; error?: string } {
    if (!this.isBrowser()) {
      return { error: "Not available on server" }
    }

    try {
      const users = this.getUsers()

      // Check if user already exists
      if (users.find((u) => u.email === email)) {
        return { error: "User with this email already exists" }
      }

      // Create new user
      const newUser: User = {
        id: this.generateId(),
        email,
        fullName,
        createdAt: new Date().toISOString(),
      }

      // Save password separately
      const passwords = this.getPasswords()
      passwords[newUser.id] = password

      users.push(newUser)
      this.saveUsers(users)
      this.savePasswords(passwords)
      this.setCurrentUser(newUser)

      return { user: newUser }
    } catch (error) {
      console.error("Error during signup:", error)
      return { error: "Signup failed. Please try again." }
    }
  }

  static signIn(email: string, password: string): { user?: User; error?: string } {
    if (!this.isBrowser()) {
      return { error: "Not available on server" }
    }

    try {
      const users = this.getUsers()
      const user = users.find((u) => u.email === email)

      if (!user) {
        return { error: "User not found" }
      }

      const passwords = this.getPasswords()
      if (passwords[user.id] !== password) {
        return { error: "Invalid password" }
      }

      this.setCurrentUser(user)
      return { user }
    } catch (error) {
      console.error("Error during signin:", error)
      return { error: "Sign in failed. Please try again." }
    }
  }

  static signOut(): void {
    this.setCurrentUser(null)
  }

  // Password Management
  private static getPasswords(): { [userId: string]: string } {
    if (!this.isBrowser()) return {}
    try {
      const passwords = localStorage.getItem(PASSWORDS_KEY)
      return passwords ? JSON.parse(passwords) : {}
    } catch (error) {
      console.error("Error getting passwords:", error)
      return {}
    }
  }

  private static savePasswords(passwords: { [userId: string]: string }): void {
    if (!this.isBrowser()) return
    try {
      localStorage.setItem(PASSWORDS_KEY, JSON.stringify(passwords))
    } catch (error) {
      console.error("Error saving passwords:", error)
    }
  }

  // Translation Management
  static getTranslations(userId: string): Translation[] {
    if (!this.isBrowser()) return []
    try {
      const translations = localStorage.getItem(TRANSLATIONS_KEY)
      const allTranslations: Translation[] = translations ? JSON.parse(translations) : []
      return allTranslations.filter((t) => t.userId === userId)
    } catch (error) {
      console.error("Error getting translations:", error)
      return []
    }
  }

  static saveTranslation(translation: Omit<Translation, "id" | "createdAt">): Translation {
    if (!this.isBrowser()) throw new Error("Cannot save translation on server")

    try {
      const newTranslation: Translation = {
        ...translation,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
      }

      const translations = localStorage.getItem(TRANSLATIONS_KEY)
      const allTranslations: Translation[] = translations ? JSON.parse(translations) : []
      allTranslations.push(newTranslation)

      localStorage.setItem(TRANSLATIONS_KEY, JSON.stringify(allTranslations))
      return newTranslation
    } catch (error) {
      console.error("Error saving translation:", error)
      throw new Error("Failed to save translation")
    }
  }

  static deleteTranslation(translationId: string, userId: string): boolean {
    if (!this.isBrowser()) return false

    try {
      const translations = localStorage.getItem(TRANSLATIONS_KEY)
      const allTranslations: Translation[] = translations ? JSON.parse(translations) : []

      const filteredTranslations = allTranslations.filter((t) => !(t.id === translationId && t.userId === userId))

      localStorage.setItem(TRANSLATIONS_KEY, JSON.stringify(filteredTranslations))
      return true
    } catch (error) {
      console.error("Error deleting translation:", error)
      return false
    }
  }

  static clearAllData(): void {
    if (!this.isBrowser()) return
    try {
      localStorage.removeItem(USERS_KEY)
      localStorage.removeItem(CURRENT_USER_KEY)
      localStorage.removeItem(TRANSLATIONS_KEY)
      localStorage.removeItem(PASSWORDS_KEY)
    } catch (error) {
      console.error("Error clearing data:", error)
    }
  }

  // Utility method to generate IDs
  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
}
