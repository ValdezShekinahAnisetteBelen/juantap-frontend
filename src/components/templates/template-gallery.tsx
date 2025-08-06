import { getAllTemplates } from "@/lib/template-data"
import { TemplateCard } from "@/components/templates/template-card"
import { TemplateFilters } from "@/components/templates/template-filters"

export async function TemplateGallery() {
  const templates = await getAllTemplates()
  const freeTemplates = templates.filter((t) => t.category === "free")
  const premiumTemplates = templates.filter((t) => t.category === "premium")

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <TemplateFilters />

        {/* Free Templates */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Free Templates</h2>
            <span className="text-sm text-gray-500">{freeTemplates.length} templates</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {freeTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>

        {/* Premium Templates */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Premium Templates</h2>
            <span className="text-sm text-gray-500">{premiumTemplates.length} templates</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {premiumTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
