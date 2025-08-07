// app/terms/layout.tsx
import { Logo } from "@/components/blocks/logo"
import Link from "next/link"

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Logo />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
          <p className="text-gray-600">
            Welcome to JuanTap! By using our services, you agree to the following terms:
          </p>
        </div>
        {/* Footer */}
        <div className="text-sm text-gray-700 space-y-2">
          <ul className="list-disc ml-6">
            <li>You must be at least 13 years old to use our platform.</li>
            <li>All information provided must be accurate and up-to-date.</li>
            <li>You are responsible for keeping your account secure.</li>
            <li>Do not use our platform for illegal or harmful activities.</li>
            <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
            <li>Your data is protected and used in accordance with our privacy policy.</li>
          </ul>
          <p className="mt-4 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} JuanTap. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
