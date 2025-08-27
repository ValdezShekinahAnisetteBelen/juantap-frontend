"use client"

import { Sparkles, Zap } from "lucide-react"

export function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen">
      {/* Background blur overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Animated logo/brand area */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-300 animate-spin" />
              <Zap className="w-8 h-8 text-purple-300 animate-pulse" />
            </div>
          </div>

          {/* Pulsing ring animation */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping" />
          <div className="absolute inset-2 rounded-full border border-pink-400/20 animate-pulse" />
        </div>

        {/* Loading text */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          JuanTap
        </h2>

        <p className="text-purple-100/80 text-lg mb-8 animate-pulse">Creating your digital identity...</p>

        {/* Loading spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-white/20 border-t-purple-400 rounded-full animate-spin" />
          <div className="absolute inset-2 w-8 h-8 border-2 border-transparent border-t-pink-400 rounded-full animate-spin animate-reverse" />
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-8">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-float" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400/40 rounded-full animate-float-delayed" />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-blue-400/20 rounded-full animate-float" />
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-yellow-400/30 rounded-full animate-float-delayed" />
      </div>
    </div>
  )
}
