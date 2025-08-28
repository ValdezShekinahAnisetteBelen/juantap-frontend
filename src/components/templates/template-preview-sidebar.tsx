"use client";

import type { Template } from "@/lib/template-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PaymentModal } from "@/components/templates/payment-modal";
import { Download, Share2, Crown, CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { toast, Toaster } from "sonner";

interface TemplatePreviewSidebarProps {
  template: Template;
}

export function TemplatePreviewSidebar({ template }: TemplatePreviewSidebarProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
const [isPurchasing, setIsPurchasing] = useState(false);
  // Separate loading states
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);
  const [isTogglingUsed, setIsTogglingUsed] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Backend statuses
  const [savedStatus, setSavedStatus] = useState<"saved" | "bought" | "pending" | "free" | null>(
    template.category === "premium" ? null : "free"
  );
  const [usedStatus, setUsedStatus] = useState<"used" | "unused">("unused");

  const isPremium = template.category === "premium";
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const pathname = usePathname();

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // --- Fetch initial statuses ---
  useEffect(() => {
    const fetchSavedTemplates = async () => {
      try {
        const res = await fetch(`${API_URL}/templates1/saved`, { headers: authHeaders() });
        if (!res.ok) throw new Error("Failed to fetch saved templates");
        const data = await res.json();
        const found = data.find((t: any) => t.slug === template.slug);
        if (found) setSavedStatus(found.status);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchBoughtedTemplates = async () => {
      try {
        const res = await fetch(`${API_URL}/templates1/boughted`, { headers: authHeaders() });
        if (!res.ok) throw new Error("Failed to fetch bought templates");
        const result = await res.json();
        const bought = result.data || [];
        const found = bought.find((t: any) => t.slug === template.slug);
        if (found) setSavedStatus(found.status);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUsedTemplates = async () => {
      try {
        const res = await fetch(`${API_URL}/templates1/used`, { headers: authHeaders() });
        if (!res.ok) throw new Error("Failed to fetch used templates");
        const data = await res.json();
        const isUsed = data.some((t: any) => t.slug === template.slug);
        setUsedStatus(isUsed ? "used" : "unused");
      } catch (err) {
        console.error(err);
      }
    };

    fetchSavedTemplates();
    fetchBoughtedTemplates();
    fetchUsedTemplates();
  }, [API_URL, template.slug]);

  // --- Actions ---
  const saveTemplate = async () => {
    setIsSavingTemplate(true);
    try {
      const res = await fetch(`${API_URL}/templates/saved/${template.slug}`, { method: "POST", headers: authHeaders() });
      if (!res.ok) throw new Error("Failed to save template");
      toast.success("Template saved!");
      setSavedStatus("saved");
    } catch {
      toast.error("Error saving template");
    } finally {
      setIsSavingTemplate(false);
    }
  };

  const unsaveTemplate = async () => {
    setIsSavingTemplate(true);
    try {
      const res = await fetch(`${API_URL}/templates/saved/${template.slug}`, { method: "DELETE", headers: authHeaders() });
      if (!res.ok) throw new Error("Failed to unsave template");
      toast.success("Template removed from saved.");
      setSavedStatus("free");
    } catch {
      toast.error("Error removing template");
    } finally {
      setIsSavingTemplate(false);
    }
  };

  const markUsed = async () => {
    setIsTogglingUsed(true);
    try {
      const res = await fetch(`${API_URL}/templates/used/${template.slug}`, { method: "POST", headers: authHeaders() });
      if (!res.ok) throw new Error("Failed to mark as used");
      toast.success("Template marked as used!");
      setUsedStatus("used");
    } catch {
      toast.error("Error marking template as used");
    } finally {
      setIsTogglingUsed(false);
    }
  };

  const markUnused = async () => {
    setIsTogglingUsed(true);
    try {
      const res = await fetch(`${API_URL}/templates/used/${template.slug}`, { method: "DELETE", headers: authHeaders() });
      if (!res.ok) throw new Error("Failed to mark as unused");
      toast.success("Template marked as unused.");
      setUsedStatus("unused");
    } catch {
      toast.error("Error marking template as unused");
    } finally {
      setIsTogglingUsed(false);
    }
  };

  const toggleUsed = () => usedStatus === "used" ? markUnused() : markUsed();

  const handleShare = async () => {
    setIsSharing(true);
    const url = `${window.location.origin}/templates/${template.slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${template.name} Template - JuanTap`, text: template.description, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Template link copied!");
      }
    } catch {
      console.log("Share cancelled");
    } finally {
      setIsSharing(false);
    }
  };

const handleGetTemplate = () => {
  if (isPremium) {
    if (savedStatus === "bought") {
      toast.info("You already own this template.");
    } else if (savedStatus === "pending") {
      toast.info("Payment pending approval.");
    } else {
      setIsPurchasing(true); // Start loader
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
                  <span className="text-3xl font-bold text-gray-900">₱{template.price}</span>
                  {template.originalPrice && <span className="ml-2 text-xl text-gray-500 line-through">₱{template.originalPrice}</span>}
                  <p className="text-sm text-gray-600">One-time payment</p>
                </>
              ) : (
                <>
                  <span className="text-3xl font-bold text-green-600">Free</span>
                  <p className="text-sm text-gray-600">{savedStatus === "saved" ? "Already saved" : "No payment required"}</p>
                </>
              )}
            </div>

            <Button
              onClick={handleGetTemplate}
              disabled={isSavingTemplate || isPurchasing}
             className={`w-full ${
                  isPremium
                    ? savedStatus === "pending"
                      ? "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    : savedStatus === "saved"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}

              size="lg"
            >
              {(isSavingTemplate || isPurchasing) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              <Download className="w-4 h-4 mr-2" />
              {isPremium
                ? savedStatus === "bought"
                  ? "Owned"
                  : savedStatus === "pending"
                  ? "Pending Approval"
                  : "Purchase Template"
                : savedStatus === "saved"
                ? "Unsave"
                : "Save Free"}
            </Button>
            {/* Used/Unused toggle */}
            {(savedStatus === "saved" || savedStatus === "bought") && (
              <Button
                onClick={toggleUsed}
                disabled={isTogglingUsed}
                className={`w-full mt-2 ${usedStatus === "used" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
                size="lg"
              >
                {isTogglingUsed && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {usedStatus === "used" ? "Mark as Unused" : "Mark as Used"}
              </Button>
            )}

            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={handleShare} disabled={isSharing} className="flex-1">
                {isSharing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Template Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Category</span>
              <Badge variant={isPremium ? "default" : "secondary"}>{isPremium ? "Premium" : "Free"}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Layout Style</span>
              <span className="font-medium capitalize">{template.layout}</span>
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
              {["Premium design", "Full customization", "Responsive layout", "Priority support", "Lifetime updates"].map((item, i) => (
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
          onClose={() => {
            setShowPaymentModal(false);
            setIsPurchasing(false); // Stop loader if modal closed
          }}
          template={template}
          onPaymentSuccess={() => {
            setShowPaymentModal(false);
            setSavedStatus("bought");
            setIsPurchasing(false); // Stop loader
            toast.success("Payment successful! Template unlocked.");
          }}
          />
    </>
  );
}
