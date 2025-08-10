"use client"

import { useEffect, useState } from "react"

// Import all template components
import { MinimalClean } from "@/components/template-previews/minimal-clean"
import { GradientModern } from "@/components/template-previews/gradient-modern"
import { ClassicBlue } from "@/components/template-previews/classic-blue"
import { NeonCyber } from "@/components/template-previews-premium/neon-cyber"
import { LuxuryGold } from "@/components/template-previews-premium/luxury-gold"
import { NatureOrganic } from "@/components/template-previews-premium/nature-organic"
import { RetroVintage } from "@/components/template-previews-premium/retro-vintage"
import { GlassMorphism } from "@/components/template-previews-premium/glass-morphism"
import { MinimalistPro } from "@/components/template-previews-premium/minimalist-pro"

const templateComponents: Record<string, React.ComponentType<any>> = {
  "minimal-clean": MinimalClean,
  "gradient-modern": GradientModern,
  "classic-blue": ClassicBlue,
  "neon-cyber": NeonCyber,
  "luxury-gold": LuxuryGold,
  "nature-organic": NatureOrganic,
  "retro-vintage": RetroVintage,
  "glass-morphism": GlassMorphism,
  "minimalist-pro": MinimalistPro,
}

export function ProfileWithUsedTemplate({ profile }: { profile: any }) {
  const [slug, setSlug] = useState("minimal-clean")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/templates/used`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setSlug(data[0]?.slug || "minimal-clean")
        }
      })
      .catch(err => console.error("Error fetching template:", err))
  }, [])

  const TemplateComponent = templateComponents[slug] || MinimalClean
  return <TemplateComponent profile={profile} />
}
