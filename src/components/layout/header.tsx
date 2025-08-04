import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/blocks/logo"

const navigationItems = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Templates" },
]

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-gray-600 hover:text-gray-900 transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
