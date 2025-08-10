"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getAllTemplates } from "@/lib/template-data";
import { TemplateCard } from "@/components/templates/template-card-2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export default function Page() {
  const pathname = usePathname();
  const [freeTemplates, setFreeTemplates] = useState<any[]>([]);
  const [premiumTemplates, setPremiumTemplates] = useState<any[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
  const loadTemplates = async () => {
    try {
      // 1. Load all templates from TS data
      const allTemplates = await getAllTemplates();

      // 2. Fetch saved templates slugs from API
      const res = await fetch(`${API_URL}/templates/used`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch saved templates");

      // savedData example: [{slug: "minimal-clean"}, {slug: "classic-blue"}]
      const savedData: Array<{ slug: string }> = await res.json();

      // 3. Extract saved slugs for easy matching
      const savedSlugs = savedData.map((t) => t.slug);

      // 4. Filter only templates whose id is in savedSlugs
      const filteredTemplates = allTemplates.filter((template) =>
        savedSlugs.includes(template.id)
      );

      // 5. Split filtered into free and premium
      setFreeTemplates(filteredTemplates.filter((t) => t.category === "free"));
      setPremiumTemplates(filteredTemplates.filter((t) => t.category === "premium"));

      // 6. Also set isSaved for current slug
      const currentSlug = pathname.split("/").pop() || "";
      const found = savedSlugs.includes(currentSlug);
      setIsSaved(found);
    } catch (err) {
      console.error("Error loading templates:", err);
    }
  };

  loadTemplates();
}, [pathname]);


  return (
   <section>
      
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {freeTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
   

      
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {premiumTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
       
    </section>
  );
}
