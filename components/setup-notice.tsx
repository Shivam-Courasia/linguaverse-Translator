"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Key } from "lucide-react"

export function SetupNotice({ isGeminiConfigured }: { isGeminiConfigured: boolean }) {
  if (isGeminiConfigured) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-800 border-gray-700 max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
            Setup Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">To use LinguaVerse, you need to configure the following services:</p>

          <div className="space-y-3">
            {!isGeminiConfigured && (
              <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <Key className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-white font-medium">Gemini API Key</p>
                  <p className="text-gray-400 text-sm">Required for AI-powered translations</p>
                </div>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-400">
            <p className="mb-2">Add these environment variables:</p>
            <div className="bg-gray-900 p-3 rounded font-mono text-xs">
              {!isGeminiConfigured && <>GEMINI_API_KEY=your_gemini_api_key</>}
            </div>
          </div>

          <Button onClick={() => window.location.reload()} className="w-full bg-teal-600 hover:bg-teal-700">
            Refresh After Setup
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
