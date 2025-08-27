"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Sparkles } from "lucide-react"
import { ProfilePreview } from "@/components/blocks/profile-preview"

export function HeroSection() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })

        if (res.ok) {
          const userData = await res.json()
          setUser(userData)
        } else {
          console.error("Failed to fetch user")
        }
      } catch (err) {
        console.error("Error:", err)
      }
    }

    fetchUser()
  }, [])

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-10 w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-500"></div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto text-center max-w-4xl">
        <Badge
          variant="secondary"
          className="mb-6 mx-auto flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-purple-200 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300"
        >
          <Sparkles className="w-4 h-4 animate-spin text-yellow-300" />
          Create Your Digital Identity
          <Zap className="w-4 h-4 animate-pulse text-purple-300" />
        </Badge>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
          Your Digital Profile,
          <br />
          <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
            One Tap Away
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-purple-100/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Create stunning, personalized digital profiles with social links, custom designs, and instant sharing via QR
          codes or NFC. Perfect for networking, business cards, and social media.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link href="templates">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white text-lg px-10 py-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              Create Your Profile
              <ArrowRight className="w-5 h-5 ml-2 animate-bounce" />
            </Button>
          </Link>

          {user?.username ? (
              <Link href={`/${user.username}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-4 rounded-full border-2 border-white/30 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  View Public Profile
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                size="lg"
                disabled
                className="text-lg px-10 py-4 rounded-full border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm opacity-50 cursor-not-allowed"
              >
                View Public Profile
              </Button>
            )}
          </div>

        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-3xl blur-xl"></div>
          <div className="relative">
            <ProfilePreview />
          </div>
        </div>
      </div>
    </section>
  )
}
