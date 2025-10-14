"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PreviewRenderer } from "@/components/templates/PreviewRenderer";

interface Template {
  id: number;
  slug?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  createdAt?: string;
  created_at?: string;
  preview?: string;
  thumbnail?: string;
  tags?: string[];
  isNew?: boolean;
  isPopular?: boolean;
  discount?: number;
  original_price?: number;
}

export default function AdminTemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showHidden, setShowHidden] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async (showHidden = false) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not logged in");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/templates?hidden=${showHidden}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch templates");

      const data = await res.json();
      console.log("✅ Templates API response:", data);

      setTemplates(Array.isArray(data) ? data : []);
    } catch (error: unknown) {
      console.error("❌ Fetch error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to fetch templates");
      }
    } finally {
      // ✅ Always stop loading, even if there’s an error
      setIsLoading(false);
    }
  };

  const handleEdit = (slug: string) => {
    router.push(`/admin/templates/${slug}/edit`);
  };

  const routeToAdd = () => {
    router.push("/admin/templates/add");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Templates Management
      </h1>

      <div className="flex justify-between items-center mb-6">
        <Button
          className="flex items-center gap-2 bg-blue-600 text-white"
          onClick={routeToAdd}
        >
          <Plus className="w-4 h-4" /> Add Template
        </Button>
      </div>

      {/* Toggle Button for Visible / Hidden */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => {
            setShowHidden(false);
            fetchTemplates(false);
          }}
          className={`${
            !showHidden
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          Show Visible
        </Button>

        <Button
          onClick={() => {
            setShowHidden(true);
            fetchTemplates(true);
          }}
          className={`${
            showHidden
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          Show Hidden
        </Button>
      </div>

      {/* Templates Grid */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => {
            const isPremium = template.category === "premium";
            const hasDiscount = !!(template.original_price && template.discount);

            return (
              <Card
                key={template.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
              >
                <div className="relative">
                  {/* Live Preview / Thumbnail */}
                  <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                    <PreviewRenderer template={template} slug={template.slug} />
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {isPremium && (
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                        Premium
                      </Badge>
                    )}
                    {template.isNew && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 border-green-200"
                      >
                        New
                      </Badge>
                    )}
                    {template.isPopular && (
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-700 border-yellow-200"
                      >
                        Popular
                      </Badge>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(template.slug!)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit Template
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {template.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.tags?.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {template.created_at || template.createdAt}
                  </span>
                  {isPremium ? (
                    hasDiscount ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₱{template.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₱{template.original_price}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        ₱{template.price}
                      </span>
                    )
                  ) : (
                    <span className="text-lg font-bold text-green-600">
                      Free
                    </span>
                  )}
                </CardFooter>
              </Card>
            );
          })}

          {templates.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No templates found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
