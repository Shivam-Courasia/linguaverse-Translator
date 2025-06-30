"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Download, User } from "lucide-react"
import { Header } from "@/components/header"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/hooks/use-auth"
import { LocalAuth } from "@/lib/local-auth"
import { useRouter } from "next/navigation"

// Force dynamic rendering to prevent build errors
export const dynamic = 'force-dynamic'

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState(user?.fullName || "")

  const handleSaveProfile = () => {
    // In a real app, you'd update the user profile here
    // For now, we'll just toggle editing mode
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  const handleExportData = () => {
    if (!user) return

    try {
      const userData = {
        user: user,
        translations: LocalAuth.getTranslations(user.id),
        exportDate: new Date().toISOString(),
      }

      const dataStr = JSON.stringify(userData, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `linguaverse-data-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting data:", error)
      alert("Failed to export data. Please try again.")
    }
  }

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        LocalAuth.clearAllData()
        await signOut()
        router.push("/")
      } catch (error) {
        console.error("Error deleting account:", error)
        alert("Failed to delete account. Please try again.")
      }
    }
  }

  if (!user) return null

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-900">
        <Header />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Profile</h1>
              <p className="text-gray-400 text-sm sm:text-base">Manage your account settings</p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Profile Information */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-white flex items-center text-base sm:text-lg">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300 text-sm sm:text-base">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      disabled
                      className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-300 text-sm sm:text-base">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={!isEditing}
                      className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="memberSince" className="text-gray-300 text-sm sm:text-base">
                      Member Since
                    </Label>
                    <Input
                      id="memberSince"
                      type="text"
                      value={new Date(user.createdAt).toLocaleDateString()}
                      disabled
                      className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    {isEditing ? (
                      <>
                        <Button onClick={handleSaveProfile} className="bg-teal-600 hover:bg-teal-700 text-sm sm:text-base">
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent text-sm sm:text-base"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent text-sm sm:text-base"
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Data Management */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-white text-base sm:text-lg">Data Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-700 rounded-lg space-y-3 sm:space-y-0">
                    <div>
                      <h3 className="text-white font-medium text-sm sm:text-base">Export Your Data</h3>
                      <p className="text-gray-400 text-xs sm:text-sm">Download all your translations and profile data</p>
                    </div>
                    <Button
                      onClick={handleExportData}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-600 bg-transparent text-sm sm:text-base w-full sm:w-auto"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-red-900/20 border border-red-700 rounded-lg space-y-3 sm:space-y-0">
                    <div>
                      <h3 className="text-white font-medium text-sm sm:text-base">Delete Account</h3>
                      <p className="text-gray-400 text-xs sm:text-sm">Permanently delete your account and all data</p>
                    </div>
                    <Button
                      onClick={handleDeleteAccount}
                      variant="outline"
                      className="border-red-600 text-red-400 hover:bg-red-900/50 bg-transparent text-sm sm:text-base w-full sm:w-auto"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-white text-base sm:text-lg">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-teal-400">
                        {LocalAuth.getTranslations(user.id).length}
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm">Total Translations</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-blue-400">
                        {Math.ceil((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm">Days Active</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
