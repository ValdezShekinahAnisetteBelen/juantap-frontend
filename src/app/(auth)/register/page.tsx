import { RegisterForm } from "@/components/auth/register-form"
import { Logo } from "@/components/blocks/logo"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* ✅ Everything inside one card */}
        <Card className="border border-gray-200 shadow-lg rounded-2xl bg-white">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <Link href="/" className="inline-block mb-4">
                <Logo />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
              <p className="text-gray-600 text-sm">Start building your digital profile today</p>
            </div>

            {/* Register Form */}
            <RegisterForm />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
