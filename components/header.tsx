"use client"

import { Button } from "@/components/ui/button"
import { Globe, User, LogOut, Menu, X } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function Header() {
  const { user, signOut } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="border-b border-gray-800 bg-gray-900 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
          <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400" />
          <span className="text-lg sm:text-xl font-bold text-white">LinguaVerse</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
            Home
          </Link>
          {user && (
            <Link href="/translate" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
              Translate
            </Link>
          )}
          <Link href="#features" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
            Pricing
          </Link>
          <Link href="#support" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
            Support
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 text-sm lg:text-base">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden lg:inline">{user.fullName || user.email}</span>
                  <span className="lg:hidden">{user.fullName?.split(' ')[0] || user.email?.split('@')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-700">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="text-gray-300 hover:text-white cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/history" className="text-gray-300 hover:text-white cursor-pointer">
                    Translation History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-gray-300 hover:text-white cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent text-sm lg:text-base">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-sm lg:text-base">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-800 z-50">
          <nav className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-gray-300 hover:text-white transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            {user && (
              <Link
                href="/translate"
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={closeMobileMenu}
              >
                Translate
              </Link>
            )}
            <Link
              href="#features"
              className="block text-gray-300 hover:text-white transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="block text-gray-300 hover:text-white transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Pricing
            </Link>
            <Link
              href="#support"
              className="block text-gray-300 hover:text-white transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Support
            </Link>
          </nav>
          
          {/* Mobile Auth Section */}
          <div className="px-4 py-4 border-t border-gray-800">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-300 py-2">
                  <User className="h-4 w-4" />
                  <span>{user.fullName || user.email}</span>
                </div>
                <Link
                  href="/profile"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
                <Link
                  href="/history"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Translation History
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors py-2 w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link href="/login" onClick={closeMobileMenu}>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" onClick={closeMobileMenu}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
