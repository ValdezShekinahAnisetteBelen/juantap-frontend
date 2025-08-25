"use client"

import React, { useEffect, useState } from "react"
import { TemplateCard } from "@/components/templates/template-card"
import { TemplateFilters } from "@/components/templates/template-filters"
import type { Template } from "@/types/template"

// ----- Types -----
interface SocialLink {
  id: string
  platform: string
  username: string
  url: string
  isVisible?: boolean
}

interface UserData {
  id: number
  name: string
  firstname?: string
  lastname?: string
  display_name?: string
  username: string
  email: string
  is_admin: boolean
  avatar_url: string
  profile?: {
    bio?: string
    phone?: string
    website?: string
    location?: string
    template_id?: number
    background_type?: string
    background_value?: string
    font_style?: string
    font_size?: string
    button_style?: string
    accent_color?: string
    nfc_redirect_url?: string
    is_published?: boolean
    socialLinks?: SocialLink[]
  }
}

interface TemplateGalleryProps {
  templates: Template[]
}

// ----- API -----
const API_URL = process.env.NEXT_PUBLIC_API_URL as string

// ----- Component -----
export function TemplateGallery({ templates }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState<UserData | null>(null)

  // Filter templates
  const freeTemplates = templates.filter(
    (t) =>
      t.category === "free" &&
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const premiumTemplates = templates.filter(
    (t) =>
      t.category === "premium" &&
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return

        const res = await fetch(`${API_URL}/user-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })

        if (!res.ok) throw new Error("Failed to fetch user")
        const data = await res.json()

        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          username: data.username,
          is_admin: data.is_admin,
          avatar_url: data.avatar_url,
          
          profile: {
            bio: data.profile?.bio ?? "",
            phone: data.profile?.phone ?? "",
            website: data.profile?.website ?? "",
            location: data.profile?.location ?? "",
            socialLinks: data.profile?.socialLinks ?? [],
          },
        })
      } catch (err) {
        console.error("Error fetching user:", err)
      }
    }

    fetchUser()
  }, [])

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <TemplateFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Free Templates */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Free Templates
            </h2>
            <span className="text-sm text-gray-500">
              {freeTemplates.length} templates
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {freeTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                user={user}
              />
            ))}
          </div>
        </div>

        {/* Premium Templates */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Premium Templates
            </h2>
            <span className="text-sm text-gray-500">
              {premiumTemplates.length} templates
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {premiumTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                user={user}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
