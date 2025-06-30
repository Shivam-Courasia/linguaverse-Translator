import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, MessageSquare, FileText, Volume2, Users, Shield, Languages } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

export default function LinguaVerseLanding() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                Break Language Barriers with LinguaVerse
              </h1>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-teal-100 max-w-2xl mx-auto px-4">
                Connect with anyone, anywhere in the world with our advanced real-time translation technology that
                breaks down communication barriers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Link href="/translate" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg">
                    Start Translating
                  </Button>
                </Link>
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-teal-600 px-6 sm:px-8 py-3 bg-transparent text-base sm:text-lg"
                  >
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image with People */}
            <div className="mt-8 sm:mt-12 relative px-4">
              <div className="flex justify-center items-end space-x-2 sm:space-x-4">
                <div className="w-8 h-10 sm:w-12 sm:h-15 md:w-16 md:h-20 bg-pink-400 rounded-t-full"></div>
                <div className="w-8 h-12 sm:w-12 sm:h-18 md:w-16 md:h-24 bg-purple-400 rounded-t-full"></div>
                <div className="w-8 h-11 sm:w-12 sm:h-16 md:w-16 md:h-22 bg-yellow-400 rounded-t-full"></div>
                <div className="w-8 h-13 sm:w-12 sm:h-20 md:w-16 md:h-26 bg-blue-400 rounded-t-full"></div>
                <div className="w-8 h-10 sm:w-12 sm:h-15 md:w-16 md:h-20 bg-green-400 rounded-t-full"></div>
                <div className="w-8 h-12 sm:w-12 sm:h-18 md:w-16 md:h-24 bg-orange-400 rounded-t-full"></div>
                <div className="w-8 h-11 sm:w-12 sm:h-16 md:w-16 md:h-22 bg-red-400 rounded-t-full"></div>
              </div>

              {/* Speech Bubbles */}
              <div className="absolute top-0 left-1/4 bg-orange-400 text-black px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium animate-bounce">
                HELLO
              </div>
              <div className="absolute top-2 sm:top-4 right-1/4 bg-pink-400 text-black px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium animate-bounce delay-100">
                BONJOUR
              </div>
              <div className="absolute top-4 sm:top-8 left-1/3 bg-blue-400 text-black px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium animate-bounce delay-200">
                HOLA
              </div>
              <div className="absolute top-1 sm:top-2 right-1/3 bg-green-400 text-black px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium animate-bounce delay-300">
                GUTEN TAG
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-12 sm:py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">Key Features</h2>
          <p className="text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4 text-sm sm:text-base">
            LinguaVerse offers a range of powerful features to enhance your communication experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors group">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Volume2 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">Real-Time Voice Translation</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Translate spoken words instantly across multiple languages with high accuracy and natural-sounding
                  voice synthesis.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors group">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">Instant Text Translation</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Seamlessly translate text messages in real-time, enabling smooth conversations across language
                  barriers.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors group">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">Document Translation</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Translate documents of any size while maintaining formatting and context for professional use.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors group">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Languages className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">100+ Languages</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Support for over 100 languages with continuous updates and improvements to translation accuracy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">Benefits</h2>
          <p className="text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4 text-sm sm:text-base">
            Experience the advantages of seamless communication with LinguaVerse.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Global Reach</h3>
              <p className="text-gray-400 text-sm sm:text-base px-4">
                Connect with people from all over the world and expand your reach beyond language barriers.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Enhanced Collaboration</h3>
              <p className="text-gray-400 text-sm sm:text-base px-4">
                Improve teamwork and understanding in multicultural environments with seamless translation.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Secure and Private</h3>
              <p className="text-gray-400 text-sm sm:text-base px-4">
                Your data is protected with enterprise-grade security and privacy measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Ready to Connect the World?</h2>
          <p className="text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 text-sm sm:text-base">
            Start your free trial today and experience the power of seamless communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href="/translate" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 sm:px-8 py-3 text-base sm:text-lg">
                Try Translation Now
              </Button>
            </Link>
            <Link href="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 px-6 sm:px-8 py-3 bg-transparent text-base sm:text-lg"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6 mb-4 md:mb-0">
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Contact Us
              </Link>
            </div>
            <div className="flex space-x-3 sm:space-x-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                <span className="text-xs">f</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                <span className="text-xs">t</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                <span className="text-xs">in</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-xs sm:text-sm">© 2024 LinguaVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
