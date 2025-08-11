"use client"

import { useEffect, useState } from "react"
import api from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { QRCodeCanvas } from "qrcode.react"
import {
  Facebook, Instagram, Twitter, Linkedin, Github, Youtube, Music, Globe
} from "lucide-react"

interface SocialLink {
  id: string
  platform: string
  url: string
  username?: string
  isVisible: boolean
}

interface User {
  id: number
  name: string
  email: string
  username: string
  profile?: {
    socialLinks?: SocialLink[]
  }
}

export function ProfilePreview() {
  const [user, setUser] = useState<User | null>(null)

  const socialIconMap: Record<string, JSX.Element> = {
    facebook: <Facebook size={14} />,
    instagram: <Instagram size={14} />,
    twitter: <Twitter size={14} />,
    linkedin: <Linkedin size={14} />,
    github: <Github size={14} />,
    youtube: <Youtube size={14} />,
    tiktok: <Music size={14} />,
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user")
        setUser(res.data)
      } catch (error) {
        console.error("Failed to fetch user", error)
      }
    }
    fetchUser()
  }, [])

  if (!user) {
    return <div className="text-center text-sm text-gray-500">Loading user data...</div>
  }

  const visibleLinks = user.profile?.socialLinks?.filter(link => link.isVisible) || []

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {user.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Social Media Links (only visible ones) */}
        {visibleLinks.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {visibleLinks.map(link => {
              const key = link.platform?.toLowerCase() || ""
              const icon = socialIconMap[key] || <Globe size={14} />
              return (
                <Button
                  key={link.id}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-transparent flex items-center gap-1"
                  onClick={() => window.open(link.url, "_blank")}
                >
                  {icon}
                  {link.platform}
                </Button>
              )
            })}
          </div>
        )}

        <div className="flex justify-center">
          <QRCodeCanvas
            value={`https://juantap.info/${user.username}`}
            size={128}
          />
        </div>
      </div>
    </div>
  )
}
