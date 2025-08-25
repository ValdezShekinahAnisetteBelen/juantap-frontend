// src/lib/template-data.ts
import axios from "axios"

import { Template, User } from "@/types/template"

const API_URL = process.env.NEXT_PUBLIC_API_URL!
const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL!
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!

// ✅ Fetch templates (authenticated if token exists)
export async function fetchTemplates(): Promise<Template[]> {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const response = await axios.get(`${API_URL}/templates`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })

    // Adjust this depending on backend response
    return response.data.templates ?? response.data
  } catch (error) {
    console.error("Error fetching templates:", error)
    return []
  }
}

// ✅ Fetch all templates (no auth)
export async function getAllTemplates(): Promise<Template[]> {
  const res = await fetch(`${API_URL}/templates`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch templates")
  return res.json()
}

// ✅ Fetch template by slug
export async function getTemplateBySlug(slug: string): Promise<Template> {
  const res = await fetch(`${API_URL}/templates/${slug}`, { cache: "no-store" })
  if (!res.ok) throw new Error("Template not found")
  return res.json()
}

// ✅ Fetch template by ID
export async function getTemplateById(id: string): Promise<Template> {
  const res = await fetch(`${API_URL}/templates/${id}`, { cache: "no-store" })
  if (!res.ok) throw new Error("Template not found")
  return res.json()
}

// ✅ Get current user (with profile + socials, normalized avatar URL)
export async function getCurrentUser(): Promise<User | null> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  if (!token) return null

  try {
    const res = await fetch(`${API_URL}/user-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    })

    if (!res.ok) return null

    const data = await res.json()

    // ✅ Normalize & return consistent User object
    return {
      id: data.id,
      name: data.name,
      username: data.username,
      email: data.email,
      is_admin: data.is_admin,
      avatar_url: data.profile_image
        ? data.profile_image.startsWith("http")
          ? data.profile_image
          : `${IMAGE_URL}/${data.profile_image}` // ✅ fix double /storage
        : "/default-avatar.png",
      display_name: data.display_name ?? data.name,
      profile: {
        bio: data.profile?.bio ?? "",
        phone: data.profile?.phone ?? "",
        website: data.profile?.website ?? "",
        location: data.profile?.location ?? "",
        socialLinks: data.profile?.socialLinks ?? [],
      },
    }
  } catch (err) {
    console.error("Error fetching current user:", err)
    return null
  }
}

// src/lib/template-data.ts
export async function getUserTemplatesWithStatus(): Promise<Template[]> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) return [];

  try {
    const res = await fetch(`${API_URL}/templates2`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch user's templates with status");

    return await res.json();
  } catch (err) {
    console.error("Error fetching templates with status:", err);
    return [];
  }
}

// ✅ Export constants (in case you need them in components)
export { API_URL, IMAGE_URL, FRONTEND_URL }
