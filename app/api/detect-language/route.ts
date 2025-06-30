import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text } = body

    if (!text?.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // 🔑 API KEY CONFIGURATION:
    // Add your Gemini API key to your .env.local file:
    // GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
    // OR
    // GEMINI_API_KEY=your_api_key_here
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY

    // 🎯 DEMO MODE: Smart language detection without API key
    if (!apiKey) {
      console.log("🔄 Language detection running in DEMO MODE")

      // Enhanced fallback language detection
      const commonWords: { [key: string]: string[] } = {
        en: [
          "the",
          "and",
          "is",
          "in",
          "to",
          "of",
          "a",
          "that",
          "it",
          "with",
          "for",
          "as",
          "was",
          "on",
          "are",
          "you",
          "this",
          "be",
          "have",
          "hello",
          "thank",
          "where",
          "how",
          "what",
          "when",
          "why",
          "who",
        ],
        es: [
          "el",
          "la",
          "de",
          "que",
          "y",
          "a",
          "en",
          "un",
          "es",
          "se",
          "no",
          "te",
          "lo",
          "le",
          "da",
          "su",
          "por",
          "son",
          "con",
          "hola",
          "gracias",
          "donde",
          "como",
          "que",
          "cuando",
          "por",
          "quien",
        ],
        fr: [
          "le",
          "de",
          "et",
          "à",
          "un",
          "il",
          "être",
          "et",
          "en",
          "avoir",
          "que",
          "pour",
          "dans",
          "ce",
          "son",
          "une",
          "sur",
          "avec",
          "bonjour",
          "merci",
          "où",
          "comment",
          "quoi",
          "quand",
          "pourquoi",
          "qui",
        ],
        de: [
          "der",
          "die",
          "und",
          "in",
          "den",
          "von",
          "zu",
          "das",
          "mit",
          "sich",
          "des",
          "auf",
          "für",
          "ist",
          "im",
          "dem",
          "nicht",
          "ein",
          "hallo",
          "danke",
          "wo",
          "wie",
          "was",
          "wann",
          "warum",
          "wer",
        ],
        it: [
          "il",
          "di",
          "che",
          "e",
          "la",
          "per",
          "un",
          "in",
          "con",
          "non",
          "da",
          "su",
          "del",
          "le",
          "si",
          "una",
          "dei",
          "nel",
          "ciao",
          "grazie",
          "dove",
          "come",
          "cosa",
          "quando",
          "perché",
          "chi",
        ],
        pt: [
          "o",
          "de",
          "e",
          "a",
          "que",
          "do",
          "da",
          "em",
          "um",
          "para",
          "é",
          "com",
          "não",
          "uma",
          "os",
          "no",
          "se",
          "na",
          "olá",
          "obrigado",
          "onde",
          "como",
          "o que",
          "quando",
          "por que",
          "quem",
        ],
      }

      const words = text.toLowerCase().split(/\s+/)
      let bestMatch = "en"
      let maxMatches = 0

      for (const [lang, commonWordsList] of Object.entries(commonWords)) {
        const matches = words.filter((word) => commonWordsList.includes(word)).length
        if (matches > maxMatches) {
          maxMatches = matches
          bestMatch = lang
        }
      }

      return NextResponse.json({
        detectedLanguage: bestMatch,
        isMockDetection: true,
      })
    }

    // 🤖 AI MODE: Real language detection with Gemini
    try {
      console.log("🚀 Using AI-powered language detection")

      const { text: detectedLanguage } = await generateText({
        model: google("gemini-1.5-flash", { apiKey }),
        prompt: `Detect the language of the following text. Respond with ONLY the two-letter ISO language code (e.g., "en" for English, "es" for Spanish, "fr" for French, etc.).

Text: "${text}"

Language code:`,
        temperature: 0.1,
      })

      const cleanedLanguage = detectedLanguage.trim().toLowerCase().substring(0, 2)
      return NextResponse.json({
        detectedLanguage: cleanedLanguage,
        isAiDetection: true,
      })
    } catch (aiError) {
      console.error("AI language detection error:", aiError)

      // Fallback to simple detection
      return NextResponse.json({
        detectedLanguage: "en",
        isFallback: true,
      })
    }
  } catch (error) {
    console.error("Language detection API error:", error)

    return NextResponse.json(
      {
        error: "Language detection failed",
        detectedLanguage: "en",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
