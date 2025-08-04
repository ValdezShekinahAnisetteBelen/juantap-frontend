import { PublicProfile } from "@/components/profile/public-profile"
import { getPublicProfile } from "@/lib/profile-data"
import { notFound } from "next/navigation"

interface PublicProfilePageProps {
  params: {
    username: string
  }
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { username } = await params
  const profile = await getPublicProfile(username)

  if (!profile) {
    notFound()
  }

  return <PublicProfile profile={profile} />
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PublicProfilePageProps) {
  const { username } = await params
  const profile = await getPublicProfile(username)

  if (!profile) {
    return {
      title: "Profile Not Found - JuanTap",
    }
  }

  return {
    title: `${profile.displayName} - JuanTap`,
    description: profile.bio || `Check out ${profile.displayName}'s digital profile on JuanTap`,
    openGraph: {
      title: `${profile.displayName} - JuanTap`,
      description: profile.bio || `Check out ${profile.displayName}'s digital profile on JuanTap`,
      images: profile.avatar ? [profile.avatar] : [],
    },
  }
}
