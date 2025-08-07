// components/auth/TermsModal.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

export function TermsModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-blue-600 hover:text-blue-500 underline"
        >
          Terms of Service
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-3 text-sm text-gray-700">
            <p>Welcome to JuanTap! By using our services, you agree to the following terms:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>You must be at least 13 years old to use our platform.</li>
              <li>All information provided must be accurate and up-to-date.</li>
              <li>You are responsible for keeping your account secure.</li>
              <li>Do not use our platform for illegal or harmful activities.</li>
              <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
              <li>Your data is protected and used in accordance with our privacy policy.</li>
            </ul>
            <p>
              These terms may be updated at any time. Continued use of the platform constitutes your acceptance of the updated terms.
            </p>
          </div>
        </ScrollArea>

        <div className="text-right mt-4">
          <Button onClick={() => setOpen(false)} variant="secondary">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
