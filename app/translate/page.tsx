"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRightLeft, Volume2, Copy, Mic, MicOff, History, AlertCircle, CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/hooks/use-auth"
import { LocalAuth } from "@/lib/local-auth"

// Force dynamic rendering to prevent build errors
export const dynamic = 'force-dynamic'

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
]

export default function TranslatePage() {
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLang, setSourceLang] = useState("en")
  const [targetLang, setTargetLang] = useState("es")
  const [isTranslating, setIsTranslating] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [translationStatus, setTranslationStatus] = useState<{
    type: "success" | "warning" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const { user } = useAuth()

  const recognitionRef = useRef<any>(null)

  const handleTranslate = async () => {
    if (!sourceText.trim()) return

    setIsTranslating(true)
    setTranslationStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLang,
          targetLang,
        }),
      })

      // Check if response is ok and has valid content type
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format - expected JSON")
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setTranslatedText(data.translatedText)

      // Set status based on translation type
      if (data.isMockTranslation) {
        setTranslationStatus({
          type: "warning",
          message: "Using demo translation (no API key configured)",
        })
      } else if (data.isAiTranslation) {
        setTranslationStatus({
          type: "success",
          message: "AI-powered translation",
        })
      } else if (data.isFallback) {
        setTranslationStatus({
          type: "warning",
          message: "Using fallback translation (AI service unavailable)",
        })
      }

      // Save translation to localStorage
      if (user) {
        try {
          LocalAuth.saveTranslation({
            userId: user.id,
            sourceText: sourceText,
            translatedText: data.translatedText,
            sourceLanguage: sourceLang,
            targetLanguage: targetLang,
          })
        } catch (error) {
          console.error("Error saving translation:", error)
        }
      }
    } catch (error) {
      console.error("Translation error:", error)
      setTranslatedText("Translation failed. Please try again later.")
      setTranslationStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Translation failed",
      })
    } finally {
      setIsTranslating(false)
    }
  }

  const detectLanguage = async (text: string) => {
    if (!text.trim()) return

    try {
      const response = await fetch("/api/detect-language", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        console.warn("Invalid response format for language detection")
        return
      }

      const data = await response.json()
      if (data.detectedLanguage) {
        setSourceLang(data.detectedLanguage)
      }
    } catch (error) {
      console.error("Language detection error:", error)
    }
  }

  const handleSwapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
    setTranslationStatus({ type: null, message: "" })
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert("Text copied to clipboard!")
    } catch (error) {
      console.error("Copy failed:", error)
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      alert("Text copied to clipboard!")
    }
  }

  const handleSpeak = (text: string, lang: string) => {
    if ("speechSynthesis" in window) {
      // Stop any ongoing speech
      speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    } else {
      alert("Speech synthesis not supported in this browser")
    }
  }

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true)
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()
        recognitionRef.current = recognition
        recognition.lang = sourceLang || 'en-US'
        recognition.interimResults = true
        recognition.maxAlternatives = 1
        recognition.onresult = (event) => {
          let transcript = ''
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript
          }
          setSourceText(transcript)
        }
        recognition.onerror = (event) => {
          alert('Speech recognition error: ' + event.error)
          setIsRecording(false)
        }
        recognition.onend = () => {
          setIsRecording(false)
        }
        recognition.start()
      } else {
        alert('Speech recognition is not supported in this browser.')
        setIsRecording(false)
      }
    } else {
      // Stop recording if possible
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      setIsRecording(false)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-900">
        <Header />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Translate</h1>
              <p className="text-gray-400 text-sm sm:text-base">Break down language barriers with instant translation</p>
              <div className="flex justify-center mt-3 sm:mt-4">
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent text-sm sm:text-base"
                  onClick={() => (window.location.href = "/history")}
                >
                  <History className="h-4 w-4 mr-2" />
                  View History
                </Button>
              </div>
            </div>

            {/* Status Message */}
            {translationStatus.type && (
              <div
                className={`mb-4 sm:mb-6 p-3 rounded-lg flex items-center space-x-2 ${
                  translationStatus.type === "success"
                    ? "bg-green-900/50 border border-green-700"
                    : translationStatus.type === "warning"
                      ? "bg-yellow-900/50 border border-yellow-700"
                      : "bg-red-900/50 border border-red-700"
                }`}
              >
                {translationStatus.type === "success" && <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />}
                {translationStatus.type === "warning" && <AlertCircle className="h-4 w-4 text-yellow-400 flex-shrink-0" />}
                {translationStatus.type === "error" && <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />}
                <span
                  className={`text-xs sm:text-sm ${
                    translationStatus.type === "success"
                      ? "text-green-200"
                      : translationStatus.type === "warning"
                        ? "text-yellow-200"
                        : "text-red-200"
                  }`}
                >
                  {translationStatus.message}
                </span>
              </div>
            )}

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 sm:p-6">
                {/* Language Selection */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                    <Select value={sourceLang} onValueChange={setSourceLang}>
                      <SelectTrigger className="w-full sm:w-32 md:w-40 bg-gray-700 border-gray-600 text-white text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-gray-600">
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => detectLanguage(sourceText)}
                      disabled={!sourceText.trim()}
                      className="text-xs bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 w-full sm:w-auto"
                    >
                      Auto-detect
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSwapLanguages}
                    className="text-gray-400 hover:text-white hover:bg-gray-700 p-2"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>

                  <Select value={targetLang} onValueChange={setTargetLang}>
                    <SelectTrigger className="w-full sm:w-32 md:w-40 bg-gray-700 border-gray-600 text-white text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-gray-600">
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Translation Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white">Source Text</h3>
                      <div className="flex items-center space-x-2">
                        <Button
                          type="button"
                          variant={isRecording ? "secondary" : "outline"}
                          onClick={toggleRecording}
                          size="sm"
                          className="text-xs"
                        >
                          {isRecording ? <MicOff className="h-4 w-4 animate-pulse text-red-500" /> : <Mic className="h-4 w-4 text-green-500" />}
                        </Button>
                        {isRecording && (
                          <span className="text-teal-500 animate-pulse font-medium text-xs sm:text-sm">Listening...</span>
                        )}
                        {sourceText && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSpeak(sourceText, sourceLang)}
                            className="text-gray-400 hover:text-white hover:bg-gray-700"
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <Textarea
                      placeholder={isRecording ? "Listening..." : "Enter text to translate..."}
                      value={sourceText}
                      onChange={(e) => setSourceText(e.target.value)}
                      className="min-h-24 sm:min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-teal-500 resize-none text-sm sm:text-base"
                      disabled={isRecording}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white">Translation</h3>
                      {translatedText && (
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(translatedText)}
                            className="text-gray-400 hover:text-white hover:bg-gray-700"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSpeak(translatedText, targetLang)}
                            className="text-gray-400 hover:text-white hover:bg-gray-700"
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <Textarea
                      placeholder="Translation will appear here..."
                      value={translatedText}
                      readOnly
                      className="min-h-24 sm:min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-none text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="flex justify-center mt-4 sm:mt-6">
                  <Button
                    onClick={handleTranslate}
                    disabled={!sourceText.trim() || isTranslating}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-2 text-sm sm:text-base w-full sm:w-auto"
                  >
                    {isTranslating ? "Translating..." : "Translate"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Examples */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Card
                className="bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors"
                onClick={() => setSourceText("Hello, how are you?")}
              >
                <CardContent className="p-3 sm:p-4 text-center">
                  <p className="text-white font-medium text-sm sm:text-base">Hello, how are you?</p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">Common greeting</p>
                </CardContent>
              </Card>

              <Card
                className="bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors"
                onClick={() => setSourceText("Where is the nearest restaurant?")}
              >
                <CardContent className="p-3 sm:p-4 text-center">
                  <p className="text-white font-medium text-sm sm:text-base">Where is the nearest restaurant?</p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">Travel phrase</p>
                </CardContent>
              </Card>

              <Card
                className="bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors sm:col-span-2 lg:col-span-1"
                onClick={() => setSourceText("Thank you very much!")}
              >
                <CardContent className="p-3 sm:p-4 text-center">
                  <p className="text-white font-medium text-sm sm:text-base">Thank you very much!</p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">Polite expression</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
