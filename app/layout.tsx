import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/hooks/use-auth"
import { SetupNotice } from "@/components/setup-notice"
import { DemoModeBanner } from "@/components/demo-mode-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LinguaVerse - Break Language Barriers",
  description: "Connect with anyone, anywhere in the world with advanced real-time translation technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isGeminiConfigured = !!process.env.GEMINI_API_KEY;
  return (
    <html lang="en">
      <body className={inter.className}>
        <DemoModeBanner isGeminiConfigured={isGeminiConfigured} />
        <SetupNotice isGeminiConfigured={isGeminiConfigured} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
