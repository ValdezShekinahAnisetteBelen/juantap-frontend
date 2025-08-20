"use client"

import React, { useEffect, useState, use } from "react"
import { TemplateCard } from "@/components/templates/template-card-2"
import { TemplatePreviewHeader } from "@/components/templates/template-preview-header"
import { TemplatePreviewContent } from "@/components/templates/template-preview-content"
import { TemplatePreviewSidebar } from "@/components/templates/template-preview-sidebar"

interface UserData {
  id: number
  name: string
  email: string
  is_admin: boolean
  profile?: {
    bio?: string
    location?: string
    avatar?: string
    socialLinks?: { id: string; platform: string; username: string; url: string }[]
  }
}

interface TemplateData {
  name: string
  description?: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
  [key: string]: any
}

const API_URL = process.env.NEXT_PUBLIC_API_URL as string
const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL as string

const defaultColors = {
  primary: "#1f2937",
  secondary: "#6b7280",
  accent: "#3b82f6",
  background: "#ffffff",
  text: "#111827",
}

const defaultFonts = {
  heading: "Inter",
  body: "Inter",
}

interface Props {
  params: Promise<{ slug: string }>
}

export default function TemplatePage({ params }: Props) {
  // ✅ unwrap the promise using React.use()
  const { slug } = use(params)

  const [template, setTemplate] = useState<TemplateData | null>(null)
  const [user, setUser] = useState<UserData | null>(null)

  // Fetch template data
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_URL}/templates/${slug}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            Accept: "application/json",
          },
        })

        if (!res.ok) throw new Error("Template not found")
        const data = await res.json()

        setTemplate({
          ...data,
          colors: {
            primary: data.colors?.primary ?? defaultColors.primary,
            secondary: data.colors?.secondary ?? defaultColors.secondary,
            accent: data.colors?.accent ?? defaultColors.accent,
            background: data.colors?.background ?? defaultColors.background,
            text: data.colors?.text ?? defaultColors.text,
          },
          fonts: {
            heading: data.fonts?.heading ?? defaultFonts.heading,
            body: data.fonts?.body ?? defaultFonts.body,
          },
          sections: data.sections ?? [],
        })
      } catch (err) {
        console.error("Error fetching template:", err)
      }
    }

    fetchTemplate()
  }, [slug])

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return

        const res = await fetch(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })

        if (!res.ok) throw new Error("Failed to fetch user")
        const data = await res.json()

        setUser({
          ...data,
          profile: {
            avatar: data.profile?.avatar ? `${IMAGE_URL}${data.profile.avatar}` : "/default-avatar.png",
            bio: data.profile?.bio ?? "",
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

  if (!template) return <div className="p-6">Loading...</div>

  return (
    <>
      <header className="w-full bg-gray-50 px-6 py-4 shadow-sm">
        <TemplatePreviewHeader template={template} />
      </header>

      <div className="min-h-screen bg-gray-50 flex gap-6 p-6">
        <main className="flex-1">
          <TemplateCard template={template} user={user} slug={slug} />

          <div className="container mx-auto px-4 py-10">
            <TemplatePreviewContent template={template} />
          </div>
        </main>

        <aside className="hidden lg:block w-1/3">
          <TemplatePreviewSidebar template={template} />
        </aside>
      </div>
    </>
  )
}
