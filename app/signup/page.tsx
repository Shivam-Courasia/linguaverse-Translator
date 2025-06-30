"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

// Force dynamic rendering to prevent build errors
export const dynamic = 'force-dynamic'

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const { signUp, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/translate")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(false)

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await signUp(formData.email, formData.password, formData.name)

      if (error) {
        setError(error)
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push("/translate")
        }, 1500)
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-sm sm:max-w-md bg-gray-800 border-gray-700">
          <CardHeader className="space-y-4 px-4 sm:px-6">
            {/* Decorative Header */}
            <div className="h-24 sm:h-32 bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full"></div>
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 bg-white/10 rounded-full"></div>
            </div>

            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Join LinguaVerse</h1>
              <p className="text-gray-400 text-sm sm:text-base">Create your account to start translating</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 px-4 sm:px-6 pb-6">
            {error && (
              <div className="bg-red-900/50 border border-red-700 rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-900/50 border border-green-700 rounded-lg p-3 flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-green-400 text-sm">Account created successfully! Redirecting...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300 text-sm sm:text-base">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-teal-500 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 text-sm sm:text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-teal-500 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 text-sm sm:text-base">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={6}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-teal-500 pr-10 text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400">Password must be at least 6 characters long</p>
              </div>

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm sm:text-base" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-400 text-xs sm:text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-teal-400 hover:text-teal-300">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
