"use client"

import type { Template } from "@/lib/template-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PaymentModal } from "@/components/templates/payment-modal"
import { Download, Heart, Share2, Crown, CheckCircle } from 'lucide-react'
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface TemplatePreviewSidebarProps {
  template: Template
}

export function TemplatePreviewSidebar({ template }: TemplatePreviewSidebarProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const isPremium = template.category === "premium"

  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const pathname = usePathname()

  const authHeaders = () => {
    const token = localStorage.getItem("token")
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  // Fetch saved templates & check if this slug is in the list
  useEffect(() => {
    const fetchSavedTemplates = async () => {
      try {
        const res = await fetch(`${API_URL}/templates/saved`, {
          headers: authHeaders()
        })
        if (!res.ok) throw new Error("Failed to fetch saved templates")
        const data = await res.json()
        const currentSlug = pathname.split("/").pop()
        const found = data.some((t: any) => t.slug === currentSlug)
        setIsSaved(found)
      } catch (err) {
        console.error(err)
      }
    }
    fetchSavedTemplates()
  }, [pathname])

  const handleGetTemplate = async () => {
    if (isPremium) {
      setShowPaymentModal(true)
    } else {
      if (isSaved) {
        await unsaveTemplate()
      } else {
        await saveTemplate()
      }
    }
  }

  const saveTemplate = async () => {
    setIsSaving(true)
    try {
      const res = await fetch(`${API_URL}/templates/saved/${template.id}`, {
        method: "POST",
        headers: authHeaders()
      })
      if (!res.ok) throw new Error("Failed to save template")
      setIsSaved(true)
      alert("Template saved to your account!")
    } catch (err) {
      console.error(err)
      alert("Error saving template")
    } finally {
      setIsSaving(false)
    }
  }

  const unsaveTemplate = async () => {
    setIsSaving(true)
    try {
      const res = await fetch(`${API_URL}/templates/saved/${template.id}`, {
        method: "DELETE",
        headers: authHeaders()
      })
      if (!res.ok) throw new Error("Failed to unsave template")
      setIsSaved(false)
      alert("Template removed from your saved list.")
    } catch (err) {
      console.error(err)
      alert("Error removing template")
    } finally {
      setIsSaving(false)
    }
  }

  const useTemplate = async () => {
    try {
      const res = await fetch(`${API_URL}/templates/used/${template.id}`, {
        method: "POST",
        headers: authHeaders()
      })
      if (!res.ok) throw new Error("Failed to mark as used")
      alert("Template marked as used!")
    } catch (err) {
      console.error(err)
      alert("Error using template")
    }
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/templates/${template.id}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${template.name} Template - JuanTap`,
          text: template.description,
          url: url,
        })
      } catch {
        console.log("Share cancelled")
      }
    } else {
      await navigator.clipboard.writeText(url)
      alert("Template link copied to clipboard!")
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* Purchase Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isPremium && <Crown className="w-5 h-5 text-yellow-600" />}
              {isPremium ? "Premium Template" : "Free Template"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              {isPremium ? (
                <div className="space-y-2">
                  {template.originalPrice && template.discount ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold text-gray-900">₱{template.price}</span>
                      <span className="text-xl text-gray-500 line-through">₱{template.originalPrice}</span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">₱{template.price}</span>
                  )}
                  <p className="text-sm text-gray-600">One-time payment</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-3xl font-bold text-green-600">Free</span>
                  <p className="text-sm text-gray-600">
                    {isSaved ? "Already saved to your account" : "No payment required"}
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={handleGetTemplate}
              disabled={isSaving}
              className={`w-full ${
                isPremium
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  : isSaved
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              size="lg"
            >
              <Download className="w-4 h-4 mr-2" />
              {isPremium
                ? "Purchase Template"
                : isSaving
                ? (isSaved ? "Removing..." : "Saving...")
                : (isSaved ? "Unsave" : "Save Free")}
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsLiked(!isLiked)}
                className={`flex-1 ${isLiked ? "text-red-600 border-red-200 bg-red-50" : ""}`}
              >
                <Heart className={`w-4 h-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                Like
              </Button>
              <Button variant="outline" onClick={handleShare} className="flex-1 bg-transparent">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Template Info */}
        <Card>
          <CardHeader>
            <CardTitle>Template Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Category</span>
              <Badge variant={isPremium ? "default" : "secondary"}>
                {isPremium ? "Premium" : "Free"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Layout Style</span>
              <span className="font-medium capitalize">{template.layout}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Downloads</span>
              <span className="font-medium">{template.downloads.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* What's Included */}
        {isPremium && (
          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Premium template design",
                  "Full customization options",
                  "Mobile responsive design",
                  "Priority customer support",
                  "Lifetime updates"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        template={template}
        onPaymentSuccess={useTemplate}
      />
    </>
  )
}
