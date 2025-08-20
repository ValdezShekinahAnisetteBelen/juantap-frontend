"use client"

import { useParams, notFound } from "next/navigation"
import { useEffect, useState } from "react"
import PreviewRenderer from "@/components/templates/PreviewRenderer"

interface SocialLink {
  id: string
  platform: string
  username: string
  url: string
}

interface UserData {
  id: number
  username: string
  name: string
  email: string
  profile?: {
    avatar?: string
    bio?: string
    location?: string
    socialLinks?: SocialLink[]
  }
}

export default function PublicProfilePage() {
  const { username } = useParams<{ username: string }>()
  const [templateData, setTemplateData] = useState<any | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch used templates
        const templateRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/${username}/used-templates`,
          { cache: "no-store" }
        )
        const usedTemplates = templateRes.ok ? await templateRes.json() : []

        // Fetch user profile
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/${username}`,
          { cache: "no-store" }
        )
        const user = userRes.ok ? await userRes.json() : null

        // Determine templateData
        let finalTemplate = null
        if (usedTemplates?.length) {
          finalTemplate = usedTemplates[0]
        } else if (user?.template) {
          finalTemplate = {
            ...user.template,
            thumbnail_url: user.template.thumbnail_url
              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${user.template.thumbnail_url}`
              : '/placeholder.svg',
            sections: user.template.sections ?? [],
          }
        }

        setTemplateData(finalTemplate)

        // Set user data
        if (user) {
          setUserData({
            ...user,
            profile: {
              avatar: user.profile?.avatar
                ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${user.profile.avatar}`
                : "/default-avatar.png",
              bio: user.profile?.bio ?? "",
              location: user.profile?.location ?? "",
              socialLinks: user.profile?.socialLinks ?? [],
            },
          })
        }

        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }

    fetchData()
  }, [username])

  if (loading) return <div>Loading...</div>
  if (!templateData) return notFound()

  return (
    <main className="flex-1">
      <PreviewRenderer template={templateData} user={userData} />
    </main>
  )
}
