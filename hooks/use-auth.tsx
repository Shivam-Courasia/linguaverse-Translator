"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { LocalAuth, type User } from "@/lib/local-auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current user from localStorage
    try {
      const currentUser = LocalAuth.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error("Error loading user:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const result = LocalAuth.signUp(email, password, fullName)

      if (result.user) {
        setUser(result.user)
        return {}
      }

      return { error: result.error || "Signup failed" }
    } catch (error) {
      console.error("Signup error:", error)
      return { error: "Signup failed. Please try again." }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const result = LocalAuth.signIn(email, password)

      if (result.user) {
        setUser(result.user)
        return {}
      }

      return { error: result.error || "Sign in failed" }
    } catch (error) {
      console.error("Sign in error:", error)
      return { error: "Sign in failed. Please try again." }
    }
  }

  const signOut = async () => {
    try {
      LocalAuth.signOut()
      setUser(null)
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
