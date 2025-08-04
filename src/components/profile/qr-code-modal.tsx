"use client"

import type { ProfileData } from "@/lib/profile-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QrCode, Download, Copy } from "lucide-react"
import { useState } from "react"

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  profile: ProfileData
}

export function QRCodeModal({ isOpen, onClose, profile }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false)

  const profileUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/profile/${profile.username}`

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const downloadQR = () => {
    // In a real app, you'd generate and download the actual QR code
    alert("QR Code download would happen here")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            QR Code for {profile.displayName}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          {/* QR Code Placeholder */}
          <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <QrCode className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">QR Code for</p>
              <p className="text-xs font-mono">{profileUrl}</p>
            </div>
          </div>

          {/* URL Display */}
          <div className="w-full p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Profile URL:</p>
            <div className="flex items-center justify-between">
              <code className="text-sm text-gray-800 truncate flex-1 mr-2">{profileUrl}</code>
              <Button variant="ghost" size="sm" onClick={copyUrl} className="text-gray-500 hover:text-gray-700">
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 w-full">
            <Button variant="outline" onClick={downloadQR} className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
