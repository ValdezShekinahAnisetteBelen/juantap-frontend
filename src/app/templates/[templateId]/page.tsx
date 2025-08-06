import { TemplatePreview } from "@/components/templates/template-preview"
import { getTemplateById } from "@/lib/template-data"
import { notFound } from "next/navigation"

interface TemplatePageProps {
  params: {
    templateId: string
  }
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { templateId } = await params
  const template = await getTemplateById(templateId)

  if (!template) {
    notFound()
  }

  return <TemplatePreview template={template} />
}

export async function generateMetadata({ params }: TemplatePageProps) {
  const { templateId } = await params
  const template = await getTemplateById(templateId)

  if (!template) {
    return {
      title: "Template Not Found - JuanTap",
    }
  }

  return {
    title: `${template.name} Template - JuanTap`,
    description: template.description,
  }
}
