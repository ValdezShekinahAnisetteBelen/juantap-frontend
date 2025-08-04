import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"

export function ProfilePreview() {
  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            JD
          </div>
          <div>
            <h3 className="font-semibold text-lg">John Doe</h3>
            <p className="text-gray-500">Digital Creator</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <Button variant="outline" size="sm" className="text-xs bg-transparent">
            Instagram
          </Button>
          <Button variant="outline" size="sm" className="text-xs bg-transparent">
            LinkedIn
          </Button>
          <Button variant="outline" size="sm" className="text-xs bg-transparent">
            Website
          </Button>
        </div>

        <div className="flex justify-center">
          <QrCode className="w-20 h-20 text-gray-400" />
        </div>
      </div>
    </div>
  )
}
