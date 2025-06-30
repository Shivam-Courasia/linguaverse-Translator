import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, sourceLang, targetLang } = body

    if (!text?.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    if (!sourceLang || !targetLang) {
      return NextResponse.json({ error: "Source and target languages are required" }, { status: 400 })
    }

    // 🔑 API KEY CONFIGURATION:
    // Add your Gemini API key to your .env.local file:
    // GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
    // OR
    // GEMINI_API_KEY=your_api_key_here
    //
    // Get your free API key from: https://makersuite.google.com/app/apikey
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY

    // Language code to full name mapping for better context
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

    const sourceLanguage = languageNames[sourceLang] || sourceLang
    const targetLanguage = languageNames[targetLang] || targetLang

    // 🎯 DEMO MODE: Works without API key using smart mock translations
    if (!apiKey) {
      console.log("🔄 Running in DEMO MODE - Add API key for real AI translations")

      // Enhanced mock translations with more examples
      const mockTranslations: { [key: string]: string } = {
        "en-es": text.toLowerCase().includes("hello")
          ? "Hola, ¿cómo estás?"
          : text.toLowerCase().includes("thank")
            ? "¡Muchas gracias!"
            : text.toLowerCase().includes("where")
              ? "¿Dónde está el restaurante más cercano?"
              : text.toLowerCase().includes("good morning")
                ? "Buenos días"
                : text.toLowerCase().includes("how are you")
                  ? "¿Cómo estás?"
                  : text.toLowerCase().includes("my name is")
                    ? `Mi nombre es ${text.split("is ")[1] || "John"}`
                    : `Traducción: ${text}`,
        "en-fr": text.toLowerCase().includes("hello")
          ? "Bonjour, comment allez-vous?"
          : text.toLowerCase().includes("thank")
            ? "Merci beaucoup!"
            : text.toLowerCase().includes("where")
              ? "Où est le restaurant le plus proche?"
              : text.toLowerCase().includes("good morning")
                ? "Bonjour"
                : text.toLowerCase().includes("how are you")
                  ? "Comment allez-vous?"
                  : text.toLowerCase().includes("my name is")
                    ? `Je m'appelle ${text.split("is ")[1] || "John"}`
                    : `Traduction: ${text}`,
        "en-de": text.toLowerCase().includes("hello")
          ? "Hallo, wie geht es dir?"
          : text.toLowerCase().includes("thank")
            ? "Vielen Dank!"
            : text.toLowerCase().includes("where")
              ? "Wo ist das nächste Restaurant?"
              : text.toLowerCase().includes("good morning")
                ? "Guten Morgen"
                : text.toLowerCase().includes("how are you")
                  ? "Wie geht es dir?"
                  : text.toLowerCase().includes("my name is")
                    ? `Mein Name ist ${text.split("is ")[1] || "John"}`
                    : `Übersetzung: ${text}`,
        "es-en": text.toLowerCase().includes("hola")
          ? "Hello, how are you?"
          : text.toLowerCase().includes("gracias")
            ? "Thank you very much!"
            : text.toLowerCase().includes("buenos días")
              ? "Good morning"
              : text.toLowerCase().includes("mi nombre es")
                ? `My name is ${text.split("es ")[1] || "Juan"}`
                : `Translation: ${text}`,
        "fr-en": text.toLowerCase().includes("bonjour")
          ? "Hello, how are you?"
          : text.toLowerCase().includes("merci")
            ? "Thank you very much!"
            : text.toLowerCase().includes("comment allez-vous")
              ? "How are you?"
              : text.toLowerCase().includes("je m'appelle")
                ? `My name is ${text.split("appelle ")[1] || "Pierre"}`
                : `Translation: ${text}`,
        "de-en": text.toLowerCase().includes("hallo")
          ? "Hello, how are you?"
          : text.toLowerCase().includes("danke")
            ? "Thank you very much!"
            : text.toLowerCase().includes("guten morgen")
              ? "Good morning"
              : text.toLowerCase().includes("mein name ist")
                ? `My name is ${text.split("ist ")[1] || "Hans"}`
                : `Translation: ${text}`,
      }

      const translationKey = `${sourceLang}-${targetLang}`
      const result =
        mockTranslations[translationKey] || `[Mock Translation from ${sourceLanguage} to ${targetLanguage}]: ${text}`

      // Add a small delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      return NextResponse.json({
        translatedText: result,
        isMockTranslation: true,
      })
    }

    // 🤖 AI MODE: Real Gemini translations with API key
    try {
      console.log("🚀 Using AI-powered translation with Gemini")

      const { text: translatedText } = await generateText({
        model: google("gemini-1.5-flash", { apiKey }),
        prompt: `You are a professional translator. Translate the following text from ${sourceLanguage} to ${targetLanguage}. 

Rules:
1. Provide ONLY the translation, no explanations or additional text
2. Maintain the original tone and style
3. Keep proper nouns and names as they are unless they have standard translations
4. For informal text, use informal translations; for formal text, use formal translations
5. If the text contains cultural references, adapt them appropriately for the target culture

Text to translate: "${text}"

Translation:`,
        temperature: 0.3,
      })

      return NextResponse.json({
        translatedText: translatedText.trim(),
        isAiTranslation: true,
      })
    } catch (aiError) {
      console.error("AI translation error:", aiError)

      // Fallback to mock translation if AI fails
      const fallbackTranslation = `[AI Error - Mock Translation]: ${text} → ${targetLanguage.toUpperCase()}`

      return NextResponse.json({
        translatedText: fallbackTranslation,
        isFallback: true,
        error: "AI translation failed, using fallback",
      })
    }
  } catch (error) {
    console.error("Translation API error:", error)

    // Return a proper JSON error response
    return NextResponse.json(
      {
        error: "Translation service error",
        translatedText: "Translation failed. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
