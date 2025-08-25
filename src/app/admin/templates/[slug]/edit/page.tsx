"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { MinimalClean } from "@/components/template-previews/minimal-clean-template"

export default function EditTemplatePage() {
  const { slug } = useParams()
  const router = useRouter()

  const [template, setTemplate] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // 1. Fetch template data by slug
  useEffect(() => {
    if (!slug) return
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/templates/${slug}`
        )
        setTemplate(res.data)
      } catch (err) {
        console.error("Failed to fetch template", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTemplate()
  }, [slug])

  // 2. Save edited template (update using ID, not slug)
  const saveTemplate = async () => {
    if (!template) return
    setSaving(true)
    try {
      const payload = { ...template }

      // Convert arrays/objects to JSON strings for Laravel
      if (payload.features) payload.features = JSON.stringify(payload.features)
      if (payload.colors) payload.colors = JSON.stringify(payload.colors)
      if (payload.fonts) payload.fonts = JSON.stringify(payload.fonts)
      if (payload.tags) payload.tags = JSON.stringify(payload.tags)

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/templates/${template.id}`, // ✅ use id here
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      alert("Template updated successfully!")
      router.push("/admin/templates")
    } catch (err) {
      console.error("Failed to update template", err)
      alert("Error saving template.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Loading template...</p>
  if (!template) return <p>Template not found</p>

  // Helper to update colors
  const updateColor = (key: string, value: string) => {
    setTemplate({
      ...template,
      colors: {
        ...template.colors,
        [key]: value,
      },
    })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Template</h1>

      {/* Basic Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Basic Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              value={template.name}
              onChange={(e) =>
                setTemplate({ ...template, name: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={template.description}
              onChange={(e) =>
                setTemplate({ ...template, description: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Colors</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <Label>Primary</Label>
            <Input
              type="color"
              value={template.colors?.primary || "#000000"}
              onChange={(e) => updateColor("primary", e.target.value)}
            />
          </div>
          <div>
            <Label>Secondary</Label>
            <Input
              type="color"
              value={template.colors?.secondary || "#000000"}
              onChange={(e) => updateColor("secondary", e.target.value)}
            />
          </div>
          <div>
            <Label>Accent</Label>
            <Input
              type="color"
              value={template.colors?.accent || "#000000"}
              onChange={(e) => updateColor("accent", e.target.value)}
            />
          </div>
          <div>
            <Label>Background</Label>
            <Input
              type="color"
              value={template.colors?.background || "#ffffff"}
              onChange={(e) => updateColor("background", e.target.value)}
            />
          </div>
          <div>
            <Label>Text</Label>
            <Input
              type="color"
              value={template.colors?.text || "#000000"}
              onChange={(e) => updateColor("text", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button onClick={saveTemplate} disabled={saving} className="mt-6">
        {saving ? "Saving..." : "Save Changes"}
      </Button>

      {/* Live Preview */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <MinimalClean
              socialStyle={template.socialStyle}
              connectStyle={template.connectStyle}
              colors={template.colors}
              fonts={template.fonts}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
