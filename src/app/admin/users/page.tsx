"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Eye, X, User } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface UserProfile {
  bio: string
  phone: string
  website: string
  location: string
}

interface User {
  id: number
  firstname: string
  lastname: string
  name: string
  email: string
  is_admin: boolean
  avatar_url: string
  profile?: UserProfile
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Not logged in")

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error("Failed to fetch users")

      const data = await res.json()
      console.log("[v0] Users data:", data.users?.[0])
      setUsers(Array.isArray(data.users) ? data.users : [])
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
        console.error(error.message)
      } else {
        toast.error("Error fetching users")
        console.error(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserProfile = async (userId: number) => {
    setLoadingProfile(true)
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Not logged in")

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error("Failed to fetch user profile")

      const data = await res.json()
      setSelectedUser(data)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
        console.error(error.message)
      } else {
        toast.error("Error fetching user profile")
        console.error(error)
      }
    } finally {
      setLoadingProfile(false)
    }
  }

  const getImageUrl = (avatarUrl: string | null | undefined) => {
    if (!avatarUrl) return "/defaults/avatar.png"
    // If it's already a full URL, return as-is
    if (avatarUrl.startsWith("http")) return avatarUrl
    // Otherwise, prepend the API base URL
    return `${process.env.NEXT_PUBLIC_API_URL}/${avatarUrl}`
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-6 py-4 sm:py-6">
      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        User Management
      </h1>

      <Card>
        <CardContent className="p-0 sm:p-6">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-sm font-semibold">#</th>
                      <th className="py-3 px-4 text-sm font-semibold">Name</th>
                      <th className="py-3 px-4 text-sm font-semibold">Email</th>
                      <th className="py-3 px-4 text-sm font-semibold">Role</th>
                      <th className="py-3 px-4 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, idx) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm">{idx + 1}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                                {user.avatar_url ? (
                                  <Image
                                    src={getImageUrl(user.avatar_url)}
                                    alt={user.name}
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.style.display = "none"
                                      const fallback = target.nextElementSibling as HTMLElement
                                      if (fallback) fallback.style.display = "flex"
                                    }}
                                  />
                                ) : null}

                                {/* Fallback icon */}
                                <div
                                  className="hidden w-10 h-10 rounded-full bg-gray-100 text-gray-500 items-center justify-center"
                                >
                                  <User size={20} />
                                </div>

                                <span className="text-sm font-medium truncate">{user.name}</span>
                              </div>

                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 max-w-[200px] truncate">{user.email}</td>
                          <td className="py-3 px-4">
                            {user.is_admin ? <Badge variant="destructive">Admin</Badge> : <Badge>User</Badge>}
                          </td>
                          <td className="py-3 px-4">
                            <Button size="sm" variant="outline" onClick={() => fetchUserProfile(user.id)}>
                              <Eye size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden space-y-3 p-3">
                {users.length > 0 ? (
                  users.map((user, idx) => (
                    <Card key={user.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                           {user.avatar_url ? (
                            <Image
                              src={getImageUrl(user.avatar_url)}
                              alt={user.name}
                              width={48}
                              height={48}
                              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = "none"
                                const fallback = target.nextElementSibling as HTMLElement
                                if (fallback) fallback.style.display = "flex"
                              }}
                            />
                          ) : null}

                          
                          <div className="hidden w-12 h-12 rounded-full bg-gray-100 text-gray-500 items-center justify-center">
                            <User size={22} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                              {user.is_admin ? (
                                <Badge variant="destructive" className="flex-shrink-0">
                                  Admin
                                </Badge>
                              ) : (
                                <Badge className="flex-shrink-0">User</Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 truncate mb-3">{user.email}</p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => fetchUserProfile(user.id)}
                              className="w-full"
                            >
                              <Eye size={14} className="mr-2" />
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="py-8 text-center text-gray-500 text-sm">No users found.</div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setSelectedUser(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {loadingProfile ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 sm:gap-4 mt-2">
                {selectedUser.avatar_url ? (
                  <Image
                    src={getImageUrl(selectedUser.avatar_url)}
                    alt={selectedUser.name}
                    width={96}
                    height={96}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      const fallback = target.nextElementSibling as HTMLElement
                      if (fallback) fallback.style.display = "flex"
                    }}
                  />
                ) : null}

                {/* Fallback user icon */}
                <div className="hidden w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 text-gray-500 items-center justify-center">
                  <User size={32} />
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-center">{selectedUser.name}</h2>
                <p className="text-sm sm:text-base text-gray-600 text-center break-all">{selectedUser.email}</p>

                {selectedUser.username ? (
                  <a
                    href={`/${selectedUser.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 sm:mt-4 w-full"
                  >
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm sm:text-base">
                      View Public Profile
                    </Button>
                  </a>
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-4 text-center px-2">
                    This user has not set a username yet.
                  </p>
                )}
              </div>

            )}
          </div>
        </div>
      )}
    </div>
  )
}
