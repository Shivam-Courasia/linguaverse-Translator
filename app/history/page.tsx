"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Volume2, Trash2, Download } from "lucide-react"
import { Header } from "@/components/header"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/hooks/use-auth"
import { LocalAuth, type Translation } from "@/lib/local-auth"

// Force dynamic rendering to prevent build errors
export const dynamic = 'force-dynamic'

const languageNames: { [key: string]: string } = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  ar: "Arabic",
  hi: "Hindi",
}

export default function HistoryPage() {
  const [translations, setTranslations] = useState<Translation[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchTranslations()
    }
  }, [user])

  const fetchTranslations = () => {
    if (!user) return

    try {
      const userTranslations = LocalAuth.getTranslations(user.id)
      setTranslations(userTranslations)
    } catch (error) {
      console.error("Error fetching translations:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteTranslation = (id: string) => {
    if (!user) return

    try {
      LocalAuth.deleteTranslation(id, user.id)
      setTranslations(translations.filter((t) => t.id !== id))
    } catch (error) {
      console.error("Error deleting translation:", error)
    }
  }

  const exportTranslations = () => {
    const dataStr = JSON.stringify(translations, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `linguaverse-translations-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Text copied to clipboard!")
  }

  const handleSpeak = (text: string, lang: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-900">
        <Header />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Translation History</h1>
              <p className="text-gray-400 text-sm sm:text-base">Your saved translations</p>
              {translations.length > 0 && (
                <div className="flex justify-center mt-3 sm:mt-4">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent text-sm sm:text-base"
                    onClick={exportTranslations}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export History
                  </Button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="text-center text-white text-sm sm:text-base">Loading...</div>
            ) : translations.length === 0 ? (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 sm:p-8 text-center">
                  <p className="text-gray-400 text-sm sm:text-base">No translations yet. Start translating to see your history!</p>
                  <Button
                    className="mt-4 bg-teal-600 hover:bg-teal-700 text-sm sm:text-base"
                    onClick={() => (window.location.href = "/translate")}
                  >
                    Start Translating
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {translations.map((translation) => (
                  <Card key={translation.id} className="bg-gray-800 border-gray-700">
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="text-white text-base sm:text-lg flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <span className="text-sm sm:text-base">
                          {languageNames[translation.sourceLanguage]} → {languageNames[translation.targetLanguage]}
                        </span>
                        <div className="flex items-center justify-between sm:justify-end space-x-2">
                          <span className="text-xs sm:text-sm text-gray-400">
                            {new Date(translation.createdAt).toLocaleDateString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTranslation(translation.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-1 sm:p-2"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                            <h4 className="text-gray-300 font-medium text-sm sm:text-base">Original</h4>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopy(translation.sourceText)}
                                className="text-gray-400 hover:text-white hover:bg-gray-700 p-1 sm:p-2"
                              >
                                <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSpeak(translation.sourceText, translation.sourceLanguage)}
                                className="text-gray-400 hover:text-white hover:bg-gray-700 p-1 sm:p-2"
                              >
                                <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-white bg-gray-700 p-2 sm:p-3 rounded text-sm sm:text-base break-words">
                            {translation.sourceText}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                            <h4 className="text-gray-300 font-medium text-sm sm:text-base">Translation</h4>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopy(translation.translatedText)}
                                className="text-gray-400 hover:text-white hover:bg-gray-700 p-1 sm:p-2"
                              >
                                <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSpeak(translation.translatedText, translation.targetLanguage)}
                                className="text-gray-400 hover:text-white hover:bg-gray-700 p-1 sm:p-2"
                              >
                                <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-white bg-gray-700 p-2 sm:p-3 rounded text-sm sm:text-base break-words">
                            {translation.translatedText}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
