"use client"

import type { Template } from "@/lib/template-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PaymentModal } from "@/components/templates/payment-modal"
import { Download, Heart, Share2, Crown, CheckCircle } from 'lucide-react'
import { useState } from "react"

interface TemplatePreviewSidebarProps {
  template: Template
}

export function TemplatePreviewSidebar({ template }: TemplatePreviewSidebarProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const isPremium = template.category === "premium"

  const handleGetTemplate = () => {
    if (isPremium) {
      setShowPaymentModal(true)
    } else {
      // Handle free template download
      alert("Free template downloaded! (This is a demo)")
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
      } catch (err) {
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
                  <p className="text-sm text-gray-600">No payment required</p>
                </div>
              )}
            </div>

            <Button
              onClick={handleGetTemplate}
              className={`w-full ${
                isPremium
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              size="lg"
            >
              <Download className="w-4 h-4 mr-2" />
              {isPremium ? "Purchase Template" : "Save Free"}
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
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Premium template design</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Full customization options</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Mobile responsive design</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Priority customer support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Lifetime updates</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        template={template}
      />
    </>
  )
}
