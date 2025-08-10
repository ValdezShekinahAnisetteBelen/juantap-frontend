"use client";

import { TemplateGallery } from "@/components/templates/template-gallery";
import { TemplateHeader } from "@/components/templates/template-header";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { TemplatesSection } from "@/components/sections/templates-section";
import { CTASection } from "@/components/sections/cta-section";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TemplatesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // This will only run on the client after hydration
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    console.log("Token found:", token);
    
    if (!token) {
      console.log("No token, redirecting...");
      router.push("/login");
    } else {
      console.log("User is authenticated");
      setIsAuthenticated(true);
    }
  }, [router]);

  // Show nothing while checking auth state
  if (isAuthenticated === null) {
    return null;
  }

  // Only render content if authenticated
  // (the redirect will happen if not authenticated)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TemplatesSection />
        <CTASection />
        <TemplateHeader />
        <TemplateGallery />
      </main>
      <Footer />
    </div>
  );
}