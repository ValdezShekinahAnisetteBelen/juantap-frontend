"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/blocks/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Eye, Files, User, Loader2 } from "lucide-react";
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
  const [loadingNav, setLoadingNav] = useState<string | null>(null);
const [loadingItem, setLoadingItem] = useState<string | null>(null);
const [loadingAction, setLoadingAction] = useState<string | null>(null);
    const handleNavClick = (path: string) => {
    setLoadingNav(path); // show loader for clicked nav
    router.push(path);
  };


  // Load cached user immediately for instant render
  useEffect(() => {
    const token = localStorage.getItem("token");
    const cachedUser = localStorage.getItem("user");

    if (cachedUser) {
      try {
        const parsed = JSON.parse(cachedUser);
        setUser(parsed);
        setIsLoggedIn(true);
      } catch (e) {
        console.error("Invalid cached user:", e);
      }
    } else if (token) {
      setIsLoggedIn(true);
    }

    // Fetch latest user data from API
    if (token) {
      const fetchUser = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
          });
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData)); // cache
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

  
const handleLogout = async () => {
  setLoadingAction("logout"); // start loader
  // simulate a short delay if needed for API cleanup
  setTimeout(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setLoadingAction(null); // stop loader
    router.push("/login");
  }, 300); // small delay to show loader
};

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/" && hash === "";
    return pathname.startsWith(path);
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

        {isLoggedIn && (
          <nav className="hidden md:flex items-center space-x-6">
            <button
            onClick={() => handleNavClick("/")}
            className={`transition-colors flex items-center space-x-1 ${isActive("/") ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-gray-900"}`}
          >
            <span>Home</span>
            {loadingNav === "/" && <Loader2 className="h-4 w-4 animate-spin" />}
          </button>

          
           <button
              onClick={() => handleNavClick("/templates")}
              className={`transition-colors ${isActive("/templates") ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-gray-900"} flex items-center space-x-1`}
            >
              <span>Templates</span>
              {loadingNav === "/templates" && <Loader2 className="h-4 w-4 animate-spin" />}
            </button>
          </nav>
        )}

        <div className="flex items-center space-x-3">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={getProfileImageUrl(user?.profile_image)} alt="Profile" />
                    <AvatarFallback>
                      {user?.name
                        ? user.name
                            .split(" ")
                            .map((n) => n[0]?.toUpperCase())
                            .join("")
                        : <User className="h-5 w-5 text-gray-500" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
              <p className="text-xs leading-none text-muted-foreground">{user?.email || ""}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            asChild
            onClick={() => setLoadingItem("editProfile")}
          >
            <Link href="/dashboard/edit-profile" className="flex items-center space-x-2">
              {loadingItem === "editProfile" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Edit className="h-4 w-4" />
              )}
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
              setLoadingItem("viewProfile");
              router.push(`/${user.username}`);
            }}
            className={!user?.username ? "cursor-not-allowed opacity-50" : "flex items-center space-x-2"}
          >
            {loadingItem === "viewProfile" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span>View Public Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            onClick={() => setLoadingItem("myTemplates")}
          >
            <Link href="/dashboard" className="flex items-center space-x-2">
              {loadingItem === "myTemplates" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Files className="h-4 w-4" />
              )}
              <span>My Templates</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
        </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-2">
              <Link href="/login" onClick={() => setLoadingAction("login")}>
                <Button variant="outline" disabled={loadingAction === "login"}>
                  {loadingAction === "login" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
                </Button>
              </Link>
             <Link href="/register" onClick={() => setLoadingAction("register")}>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={loadingAction === "register"}
              >
                {loadingAction === "register" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign Up"}
              </Button>
            </Link>
            </div>
          )}

          {isLoggedIn && (
            <Button
              size="sm"
              onClick={handleLogout}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={loadingAction === "logout"}
            >
              {loadingAction === "logout" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Logout"
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
