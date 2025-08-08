import { Award, Bell, BookOpen, Brush, Camera, Cloud, Code, Crown, Download, FileText, Grid, Heart, Home, ImageIcon, Layers, LayoutGrid, Menu, MessageSquare, Palette, Play, Plus, Search, Settings, Share2, Sparkles, Star, Users, Video, Wand2, Clock, Eye, CuboidIcon, Type } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Sample data
const apps = [
  {
    name: "PixelMaster",
    icon: <ImageIcon className="text-violet-500" />,
    description: "Advanced image editing and composition",
    category: "Creative",
    recent: true,
  },
  {
    name: "VectorPro",
    icon: <Brush className="text-orange-500" />,
    description: "Professional vector graphics creation",
    category: "Creative",
    recent: true,
  },
  {
    name: "VideoStudio",
    icon: <Video className="text-pink-500" />,
    description: "Cinematic video editing and production",
    category: "Video",
    recent: true,
  },
  {
    name: "MotionFX",
    icon: <Sparkles className="text-blue-500" />,
    description: "Stunning visual effects and animations",
    category: "Video",
    recent: false,
  },
  {
    name: "PageCraft",
    icon: <Layers className="text-red-500" />,
    description: "Professional page design and layout",
    category: "Creative",
    recent: false,
  },
  {
    name: "UXFlow",
    icon: <LayoutGrid className="text-fuchsia-500" />,
    description: "Intuitive user experience design",
    category: "Design",
    recent: false,
  },
]

const recentFiles = [
  {
    name: "Brand Redesign.pxm",
    app: "PixelMaster",
    modified: "2 hours ago",
    icon: <ImageIcon className="text-violet-500" />,
    shared: true,
    collaborators: 3,
  },
  {
    name: "Company Logo.vec",
    app: "VectorPro",
    modified: "Yesterday",
    icon: <Brush className="text-orange-500" />,
    shared: true,
    collaborators: 2,
  },
  {
    name: "Product Launch Video.vid",
    app: "VideoStudio",
    modified: "3 days ago",
    icon: <Video className="text-pink-500" />,
    shared: false,
    collaborators: 0,
  },
  {
    name: "UI Animation.mfx",
    app: "MotionFX",
    modified: "Last week",
    icon: <Sparkles className="text-blue-500" />,
    shared: true,
    collaborators: 4,
  },
]

const projects = [
  {
    name: "Website Redesign",
    description: "Complete overhaul of company website",
    progress: 75,
    dueDate: "June 15, 2025",
    members: 4,
    files: 23,
  },
  {
    name: "Mobile App Launch",
    description: "Design and assets for new mobile application",
    progress: 60,
    dueDate: "July 30, 2025",
    members: 6,
    files: 42,
  },
  {
    name: "Brand Identity",
    description: "New brand guidelines and assets",
    progress: 90,
    dueDate: "May 25, 2025",
    members: 3,
    files: 18,
  },
]

const sidebarItems = [
  { title: "Home", icon: <Home />, isActive: true },
  { title: "Apps", icon: <Grid />, badge: "2" },
  { title: "Files", icon: <FileText /> },
  { title: "Projects", icon: <Layers />, badge: "4" },
  { title: "Learn", icon: <BookOpen /> },
  { title: "Community", icon: <Users /> },
]

export function StaticCreativeDesign() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-background md:block">
        <div className="flex h-full flex-col">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                <Wand2 className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold">Designali</h2>
                <p className="text-xs text-muted-foreground">Creative Suite</p>
              </div>
            </div>
          </div>

          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.title}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
                    item.isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
                  )}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Pro
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Designali Creative</h1>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-2xl">
                <Cloud className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-2xl">
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-2xl relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  5
                </span>
              </Button>
              <Avatar className="h-9 w-9 border-2 border-primary">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Tabs defaultValue="home" className="w-full">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <TabsList className="grid w-full max-w-[500px] grid-cols-4 rounded-2xl p-1">
                <TabsTrigger value="home" className="rounded-xl">
                  Home
                </TabsTrigger>
                <TabsTrigger value="apps" className="rounded-xl">
                  Apps
                </TabsTrigger>
                <TabsTrigger value="files" className="rounded-xl">
                  Files
                </TabsTrigger>
                <TabsTrigger value="projects" className="rounded-xl">
                  Projects
                </TabsTrigger>
              </TabsList>
              <div className="hidden md:flex gap-2">
                <Button variant="outline" className="rounded-2xl">
                  <Download className="mr-2 h-4 w-4" />
                  Install App
                </Button>
                <Button className="rounded-2xl">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>
            </div>

            <TabsContent value="home" className="space-y-8 mt-0">
              {/* Hero Section */}
              <section>
                <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-4">
                      <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">Premium</Badge>
                      <h2 className="text-3xl font-bold">Welcome to DesignAli Creative Suite</h2>
                      <p className="max-w-[600px] text-white/80">
                        Unleash your creativity with our comprehensive suite of professional design tools and
                        resources.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button className="rounded-2xl bg-white text-indigo-700 hover:bg-white/90">
                          Explore Plans
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl bg-transparent border-white text-white hover:bg-white/10"
                        >
                          Take a Tour
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Recent Apps */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Recent Apps</h2>
                  <Button variant="ghost" className="rounded-2xl">
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {apps
                    .filter((app) => app.recent)
                    .map((app) => (
                      <Card key={app.name} className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                              {app.icon}
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-2xl">
                              <Star className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <CardTitle className="text-lg">{app.name}</CardTitle>
                          <CardDescription>{app.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                          <Button variant="secondary" className="w-full rounded-2xl">
                            Open
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </section>

              {/* Recent Files and Projects */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Recent Files</h2>
                    <Button variant="ghost" className="rounded-2xl">
                      View All
                    </Button>
                  </div>
                  <div className="rounded-3xl border">
                    <div className="grid grid-cols-1 divide-y">
                      {recentFiles.map((file) => (
                        <div key={file.name} className="flex items-center justify-between p-4 hover:bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                              {file.icon}
                            </div>
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {file.app} • {file.modified}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {file.shared && (
                              <Badge variant="outline" className="rounded-xl">
                                <Users className="mr-1 h-3 w-3" />
                                {file.collaborators}
                              </Badge>
                            )}
                            <Button variant="ghost" size="sm" className="rounded-xl">
                              Open
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Active Projects</h2>
                    <Button variant="ghost" className="rounded-2xl">
                      View All
                    </Button>
                  </div>
                  <div className="rounded-3xl border">
                    <div className="grid grid-cols-1 divide-y">
                      {projects.map((project) => (
                        <div key={project.name} className="p-4 hover:bg-muted/50">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{project.name}</h3>
                            <Badge variant="outline" className="rounded-xl">
                              Due {project.dueDate}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2 rounded-xl" />
                          </div>
                          <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Users className="mr-1 h-4 w-4" />
                              {project.members} members
                            </div>
                            <div className="flex items-center">
                              <FileText className="mr-1 h-4 w-4" />
                              {project.files} files
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="apps" className="space-y-8 mt-0">
              <section>
                <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 p-8 text-white">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold">Creative Apps Collection</h2>
                      <p className="max-w-[600px] text-white/80">
                        Discover our full suite of professional design and creative applications.
                      </p>
                    </div>
                    <Button className="w-fit rounded-2xl bg-white text-red-700 hover:bg-white/90">
                      <Download className="mr-2 h-4 w-4" />
                      Install Desktop App
                    </Button>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">All Apps</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {apps.map((app) => (
                    <Card key={app.name} className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                            {app.icon}
                          </div>
                          <Badge variant="outline" className="rounded-xl">
                            {app.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <CardTitle className="text-lg">{app.name}</CardTitle>
                        <CardDescription>{app.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button variant="secondary" className="flex-1 rounded-2xl">
                          Open
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-2xl">
                          <Star className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
            </TabsContent>

            <TabsContent value="files" className="space-y-8 mt-0">
              <section>
                <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 p-8 text-white">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold">Your Creative Files</h2>
                      <p className="max-w-[600px] text-white/80">
                        Access, manage, and share all your design files in one place.
                      </p>
                    </div>
                    <Button className="w-fit rounded-2xl bg-white text-blue-700 hover:bg-white/90">
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Files
                    </Button>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">All Files</h2>
                <div className="rounded-3xl border overflow-hidden">
                  <div className="divide-y">
                    {recentFiles.map((file) => (
                      <div key={file.name} className="p-4 flex items-center justify-between hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                            {file.icon}
                          </div>
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">{file.app} • {file.modified}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            Open
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="projects" className="space-y-8 mt-0">
              <section>
                <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-8 text-white">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold">Project Management</h2>
                      <p className="max-w-[600px] text-white/80">
                        Organize your creative work into projects and collaborate with your team.
                      </p>
                    </div>
                    <Button className="w-fit rounded-2xl bg-white text-indigo-700 hover:bg-white/90">
                      <Plus className="mr-2 h-4 w-4" />
                      New Project
                    </Button>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Active Projects</h2>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                    <Card key={project.name} className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{project.name}</CardTitle>
                          <Badge variant="outline" className="rounded-xl">
                            Due {project.dueDate}
                          </Badge>
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2 rounded-xl" />
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            {project.members} members
                          </div>
                          <div className="flex items-center">
                            <FileText className="mr-1 h-4 w-4" />
                            {project.files} files
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button variant="secondary" className="flex-1 rounded-2xl">
                          Open Project
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-2xl">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
