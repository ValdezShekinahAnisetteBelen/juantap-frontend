import { Header } from "@/components/layout/header"
import { TemplateGallery } from "@/components/templates/template-gallery"
import { TemplateHeader } from "@/components/templates/template-header"

import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  // Set to true to show authenticated header with profile dropdown
  const isAuthenticated = true
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JD"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main>
       <TemplateHeader />
        <TemplateGallery />
      </main>
      <Footer />
    </div>
  )
}
