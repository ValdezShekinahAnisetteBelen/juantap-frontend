"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import ProfileModal from "@/components/profile/ProfileModal"


export function AdminSidebar() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [paymentCount, setPaymentCount] = useState<number>(0)
  const [collapsed, setCollapsed] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()
const [isProfileModalOpen, setProfileModalOpen] = useState(false)

  // ✅ Navigation items with dynamic Payments badge
  const navigationItems = [
    { name: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
{ name: "Payments", href: "/admin/payments", icon: Download, badge: paymentCount > 0 ? String(paymentCount) : null },
    { name: "Templates", href: "/admin/templates", icon: FileText },
    { name: "Users", href: "/admin/users", icon: Users },
  ]

  // ✅ Get profile image URL
  const getProfileImageUrl = (path?: string) => {
    if (!path) return "/placeholder.svg?height=40&width=40"
    if (path.startsWith("http")) return path
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}/storage/${path}`
  }

  // ✅ Fetch user
  const fetchUserData = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setUser(null)
      router.replace("/login")
      return
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      if (res.ok) {
        const userData = await res.json()
        setUser(userData)
      } else {
        handleLogout()
      }
    } catch (error) {
      console.error("Error fetching user:", error)
      handleLogout()
    }
  }

  // ✅ Fetch payment count
  const fetchPaymentCount = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/payments/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      if (res.ok) {
        const data = await res.json()
        setPaymentCount(data.pending || 0)
      }
    } catch (error) {
      console.error("Error fetching payments count:", error)
    }
  }

  // ✅ On mount
  useEffect(() => {
    fetchUserData()
    fetchPaymentCount()
  }, [])

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token")
    sessionStorage.clear()
    setUser(null)
    router.replace("/login")
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Sidebar Header */}
   <div className="flex items-center justify-between p-4 border-b border-gray-200">
    <span className="font-semibold text-gray-700">
      {!collapsed && "Admin Panel"}
    </span>
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setCollapsed(!collapsed)}
      className="p-1.5"
    >
      {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
    </Button>
  </div>


      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
        {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="flex-1 flex items-center gap-2">
                      {item.name}
                     {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}

                    </span>
                  )}
                </Link>
              </li>
            )
          })}

        </ul>
      </nav>

      {/* Admin Profile + Logout */}
      <div className="border-t border-gray-200 p-4">
       <div
          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
          onClick={() => setProfileModalOpen(true)}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={getProfileImageUrl(user?.profile_image)} />
            <AvatarFallback>
              {user?.name
                ? user.name.split(" ").map((n: string) => n[0]?.toUpperCase()).join("")
                : "AD"}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name || ""}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
            </div>
          )}
        </div>

        


        {/* Logout Button */}
        <div className="mt-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-1" />
            {!collapsed && "Logout"}
          </Button>
        </div>
      </div>
  
  {/* ✅ Profile Modal placed here */}
    <ProfileModal
      open={isProfileModalOpen}
      onClose={() => setProfileModalOpen(false)}
      user={user}
      refreshUser={fetchUserData}
    />
  </div>
)
}
