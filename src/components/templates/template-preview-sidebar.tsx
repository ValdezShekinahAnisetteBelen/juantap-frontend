"use client";

import type { Template } from "@/lib/template-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PaymentModal } from "@/components/templates/payment-modal";
import { Download, Share2, Crown, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { toast, Toaster } from "sonner";

interface TemplatePreviewSidebarProps {
  template: Template;
}

export function TemplatePreviewSidebar({ template }: TemplatePreviewSidebarProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // States from backend
  const [savedStatus, setSavedStatus] = useState<
    "saved" | "bought" | "pending" | "free" | null
  >(template.category === "premium" ? "pending" : "free");
  const [usedStatus, setUsedStatus] = useState<"used" | "unused">("unused");

  const isPremium = template.category === "premium";
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const pathname = usePathname();

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  };

  // Fetch initial statuses
  useEffect(() => {
    const fetchTemplateStatuses = async () => {
      try {
        const res = await fetch(`${API_URL}/templates/saved`, {
          credentials: "include",
          headers: { Accept: "application/json", ...authHeaders() },
        });
        if (!res.ok) throw new Error("Failed to fetch saved templates");
        const data = await res.json();
        const found = data.find((t: any) => t.slug === template.slug);
        if (found) setSavedStatus(found.status);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUsedTemplates = async () => {
      try {
        const res = await fetch(`${API_URL}/templates/used`, {
          credentials: "include",
          headers: { Accept: "application/json", ...authHeaders() },
        });
        if (!res.ok) throw new Error("Failed to fetch used templates");
        const data = await res.json();
        const isUsed = data.some((t: any) => t.slug === template.slug);
        setUsedStatus(isUsed ? "used" : "unused");
      } catch (err) {
        console.error(err);
      }
    };

    fetchTemplateStatuses();
    fetchUsedTemplates();
  }, [API_URL, template.slug]);

  // --- Actions ---
  const saveTemplate = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_URL}/templates/saved/${template.slug}`, {
        method: "POST",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Failed to save template");
      toast.success("Template saved!");
      setSavedStatus("saved");
    } catch {
      toast.error("Error saving template");
    } finally {
      setIsSaving(false);
    }
  };

  const unsaveTemplate = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_URL}/templates/saved/${template.slug}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Failed to unsave template");
      toast.success("Template removed from saved.");
      setSavedStatus("free");
    } catch {
      toast.error("Error removing template");
    } finally {
      setIsSaving(false);
    }
  };

  const markUsed = async () => {
    try {
      const res = await fetch(`${API_URL}/templates/used/${template.slug}`, {
        method: "POST",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Failed to mark as used");
      toast.success("Template marked as used!");
      setUsedStatus("used");
    } catch {
      toast.error("Error marking template as used");
    }
  };

  const markUnused = async () => {
    try {
      const res = await fetch(`${API_URL}/templates/used/${template.slug}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Failed to mark as unused");
      toast.success("Template marked as unused.");
      setUsedStatus("unused");
    } catch {
      toast.error("Error marking template as unused");
    }
  };

  const toggleUsed = () => {
    usedStatus === "used" ? markUnused() : markUsed();
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/templates/${template.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${template.name} Template - JuanTap`,
          text: template.description,
          url,
        });
      } catch {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Template link copied!");
    }
  };

  // Handle main button click
  const handleGetTemplate = () => {
    if (isPremium) {
      if (savedStatus === "bought") {
        toast.info("You already own this template.");
      } else if (savedStatus === "pending") {
        toast.info("Payment pending approval.");
      } else {
        setShowPaymentModal(true);
      }
    } else {
      savedStatus === "saved" ? unsaveTemplate() : saveTemplate();
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />

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
                <>
                  <span className="text-3xl font-bold text-gray-900">
                    ₱{template.price}
                  </span>
                  {template.originalPrice && (
                    <span className="ml-2 text-xl text-gray-500 line-through">
                      ₱{template.originalPrice}
                    </span>
                  )}
                  <p className="text-sm text-gray-600">One-time payment</p>
                </>
              ) : (
                <>
                  <span className="text-3xl font-bold text-green-600">Free</span>
                  <p className="text-sm text-gray-600">
                    {savedStatus === "saved"
                      ? "Already saved"
                      : "No payment required"}
                  </p>
                </>
              )}
            </div>

            <Button
              onClick={handleGetTemplate}
              disabled={isSaving}
              className={`w-full ${
                isPremium
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  : savedStatus === "saved"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              size="lg"
            >
              <Download className="w-4 h-4 mr-2" />
              {isPremium
                ? savedStatus === "bought"
                  ? "Owned"
                  : savedStatus === "pending"
                  ? "Pending Approval"
                  : "Purchase Template"
                : isSaving
                ? savedStatus === "saved"
                  ? "Removing..."
                  : "Saving..."
                : savedStatus === "saved"
                ? "Unsave"
                : "Save Free"}
            </Button>

            {/* Used/Unused toggle */}
            {(savedStatus === "saved" || savedStatus === "bought") && (
              <Button
                onClick={toggleUsed}
                className={`w-full mt-2 ${
                  usedStatus === "used"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                size="lg"
              >
                {usedStatus === "used" ? "Mark as Unused" : "Mark as Used"}
              </Button>
            )}

            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={handleShare} className="flex-1">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
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
              <span className="font-medium">
                {template.downloads?.toLocaleString() ?? "0"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Premium extra info */}
        {isPremium && (
          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              {[
                "Premium design",
                "Full customization",
                "Responsive layout",
                "Priority support",
                "Lifetime updates",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        template={template}
        onPaymentSuccess={() => {
          setShowPaymentModal(false);
          setSavedStatus("bought");
          toast.success("Payment successful! Template unlocked.");
        }}
      />
    </>
  );
}
