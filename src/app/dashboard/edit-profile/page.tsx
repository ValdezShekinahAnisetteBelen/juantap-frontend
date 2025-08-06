"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Save, User, Globe, MapPin, Phone, Mail, Upload, Plus, Trash2, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { useEffect, useState } from "react"

export default function EditProfilePage() {
  const [profile, setProfile] = useState<any>({
  name: "",
 
  email: "",
})


useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      if (res.ok) {
        const userData = await res.json()
        setProfile((prev: any) => ({
          ...prev,
          ...userData, // will override fields like email from Laravel
        }))
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  fetchProfile()
}, [])

// ✅ ADD THIS LINE BEFORE THE RETURN
if (!profile) {
  return <div className="p-8">Loading profile...</div>
}

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
                <p className="text-gray-600">Update your profile information and customize your digital presence.</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>

          <div className="space-y-8">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Picture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.displayName} />
                  <AvatarFallback className="text-lg">
                        {profile?.name?.[0] ?? ''}{profile?.lastName?.[0] ?? ''}
                        </AvatarFallback>

                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload New Picture
                    </Button>
                    <p className="text-sm text-gray-500">JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="Name">First Name</Label>
                    <Input
                      id="firstName"
                      defaultValue={profile.name}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      defaultValue={profile.lastName}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                   
                    placeholder="How your name appears on your profile"
                  />
                </div>

                <div>
                  <Label htmlFor="username">Username</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      juantap.com/
                    </span>
                    <Input
                      id="username"
                    
                      placeholder="username"
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                   
                    placeholder="Tell people about yourself..."
                    rows={3}
                    className="resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={profile.email}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </Label>
                    <Input
                      id="location"
                     
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Social Media Links
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Link
                  </Button>
                </CardTitle>
              </CardHeader>
             <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Badge variant="default">Visible</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3">
                    <div>
                        <Label>Platform</Label>
                        <Input defaultValue="Instagram" placeholder="Instagram" />
                    </div>
                    <div>
                        <Label>URL</Label>
                        <Input defaultValue="https://instagram.com/username" placeholder="https://instagram.com/username" />
                    </div>
                    <div>
                        <Label>Display Name</Label>
                        <Input defaultValue="@username" placeholder="@username" />
                    </div>
                    </div>
                </div>
                </CardContent>

            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
