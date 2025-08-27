"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/blocks/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Eye, Files, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  // Detect token and fetch user if logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const fetchUser = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
          });
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchUser();
    }
  }, []);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const getProfileImageUrl = (path?: string) => {
    if (!path) return "/placeholder.svg?height=40&width=40";
    if (path.startsWith("http")) return path;
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}/storage/${path}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/" && hash === "";
    return pathname.startsWith(path);
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

        {/* Show nav only if logged in */}
        {isLoggedIn && user && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`transition-colors ${isActive("/") ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-gray-900"}`}
            >
              Home
            </Link>

            {pathname === "/" && (
              <>
                <Link
                  href="/#features"
                  className={`transition-colors ${hash === "#features" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-gray-900"}`}
                >
                  Features
                </Link>
                <Link
                  href="/#how-it-works"
                  className={`transition-colors ${hash === "#how-it-works" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-gray-900"}`}
                >
                  How It Works
                </Link>
              </>
            )}

            <Link
              href="/templates"
              className={`transition-colors ${isActive("/templates") ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-gray-900"}`}
            >
              Templates
            </Link>
          </nav>
        )}

        <div className="flex items-center space-x-3">
          {isLoggedIn && user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={getProfileImageUrl(user?.profile_image)} alt="Profile" />
                      <AvatarFallback>
                        {user?.name
                          ? user.name.split(" ").map((n) => n[0]?.toUpperCase()).join("")
                          : <User className="h-5 w-5 text-gray-500" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name || "Loading..."}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email || ""}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/edit-profile">
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      if (!user?.username) {
                        e.preventDefault();
                        alert("Set a username first in Edit Profile.");
                        return;
                      }
                      router.push(`${user.username}`);
                    }}
                    className={!user?.username ? "cursor-not-allowed opacity-50" : ""}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View Public Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <Files className="mr-2 h-4 w-4" />
                      <span>My Templates</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                size="sm"
                onClick={handleLogout}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Logout
              </Button>
            </>
          ) : (
            <div className="space-x-2">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
