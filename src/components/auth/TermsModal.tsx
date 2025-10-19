"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function TermsModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-purple-600 hover:text-purple-700 font-semibold cursor-pointer transition-colors duration-200"
        >
          Terms of Service
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[85vh] rounded-xl border border-slate-200 shadow-xl overflow-hidden p-0">
        <DialogHeader className="bg-gradient-to-r from-purple-600 to-red-500 border-b-2 border-red-600 px-6 py-6">
          <div>
            <DialogTitle className="text-2xl font-bold text-white">Terms of Service</DialogTitle>
            <p className="text-sm text-purple-100 mt-1">Please read carefully before using JuanTap</p>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[calc(85vh-180px)]">
          <div className="px-8 py-8 space-y-6 text-sm text-slate-700">
            <p className="leading-relaxed text-base text-slate-800">
              Welcome to <span className="font-semibold text-purple-700">JuanTap</span>! By using our services, you
              agree to the following terms:
            </p>

            <ul className="space-y-4">
              {[
                "You must be at least 13 years old to use our platform.",
                "All information provided must be accurate and up-to-date.",
                "You are responsible for keeping your account secure.",
                "Do not use our platform for illegal or harmful activities.",
                "We reserve the right to suspend or terminate accounts that violate these terms.",
                "Your data is protected and used in accordance with our privacy policy.",
              ].map((item, index) => (
                <li key={index} className="flex gap-4 items-start">
                  <span className="text-red-500 font-bold flex-shrink-0 text-lg">✓</span>
                  <span className="leading-relaxed pt-0.5">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-purple-50 border-l-4 border-red-500 p-4 rounded-r-lg mt-6">
              <p className="text-sm text-slate-700 leading-relaxed">
                <span className="font-semibold text-slate-900">Important:</span> These terms may be updated at any time.
                Continued use of the platform constitutes your acceptance of the updated terms.
              </p>
            </div>
          </div>
        </ScrollArea>

      
      </DialogContent>
    </Dialog>
  )
}
