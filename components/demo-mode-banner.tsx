"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function DemoModeBanner({ isGeminiConfigured }: { isGeminiConfigured: boolean }) {
  if (isGeminiConfigured) {
    return null
  }

  return (
    <Alert className="bg-blue-900/50 border-blue-700 mb-6">
      <Info className="h-4 w-4" />
      <AlertDescription className="text-blue-200">
        <strong>Demo Mode:</strong> Using mock translations. Configure environment variables for full functionality.
      </AlertDescription>
    </Alert>
  )
}
