"use client"

import { useEffect, useState } from "react"
import api from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"

interface User {
  id: number
  name: string
  email: string
}

export function ProfilePreview() {
  const [user, setUser] = useState<User | null>(null)

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

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <Button variant="outline" size="sm" className="text-xs bg-transparent">
            Instagram
          </Button>
          <Button variant="outline" size="sm" className="text-xs bg-transparent">
            LinkedIn
          </Button>
          <Button variant="outline" size="sm" className="text-xs bg-transparent">
            Website
          </Button>
        </div>

        <div className="flex justify-center">
         <QRCodeCanvas
          value={`https://juantap.info/${user.username}`}
          size={128} />
        </div>
      </div>
    </div>
  )
}
