"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Mail, Phone, MapPin, Globe, Copy,
  Instagram, Twitter, Linkedin, Github, Youtube, Music,
  Facebook, QrCode, Share2, Heart, Download, User
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { usePathname } from "next/navigation";

interface SocialLink {
  id: string;
  username: string;
  platform: string; 
  url: string;
  isVisible: boolean;
}

interface ProfileData {
  displayName?: string;
  location?: string;
  bio?: string;
  coverImage?: string;
  avatar?: string;
  website?: string;
  phone?: string;
  email?: string;
  socialLinks?: SocialLink[];
  template?: {
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
    primary?: string;
    secondary?: string;
    accent?: string;
  };
}

export function NeonCyber() {
  const { username } = useParams<{ username?: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
const pathname = usePathname();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";
  const profileUrl = profile?.displayName ? `${imageUrl}/${profile.displayName}` : "";

  const socialIconMap: Record<string, React.ReactNode> = {
    facebook: <Facebook size={14} />,
    instagram: <Instagram size={14} />,
    twitter: <Twitter size={14} />,
    linkedin: <Linkedin size={14} />,
    github: <Github size={14} />,
    youtube: <Youtube size={14} />,
    tiktok: <Music size={14} />,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let endpoint = "";
        let headers: HeadersInit = { Accept: "application/json" };

        if (username) {
          endpoint = `${baseUrl}/profile/${username}`;
        } else {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No authentication token found");
          endpoint = `${baseUrl}/user-profile`;
          headers = { ...headers, Authorization: `Bearer ${token}` };
        }

        const res = await fetch(endpoint, { headers });
        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setProfile({
          displayName: data.display_name,
          location: data.profile?.location,
          bio: data.profile?.bio,
          coverImage:
            data.profile?.background_type === "image"
              ? `${baseUrl}${data.profile?.background_value}`
              : undefined,
          avatar: data.profile_image || undefined,
          website: data.profile?.website,
          phone: data.profile?.phone,
          email: data.email,
          socialLinks: data.profile?.socialLinks || [],
          template: {
            backgroundColor: data.profile?.background_value || "#0a0a0a",
            textColor: data.profile?.textColor || "#ffffff",
            fontFamily: data.profile?.font_style || "Orbitron, sans-serif",
            primary: data.profile?.primary || "#00ffff",
            secondary: data.profile?.secondary || "#ff00ff",
            accent: data.profile?.accent || "#9d00ff",
          },
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, baseUrl]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "Here's something interesting for you.",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const copyUrl = () => {
    if (!profileUrl) return;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;
  if (!profile) return <p className="p-6 text-gray-500">No profile found.</p>;

  const bg = profile?.template?.backgroundColor || "#0a0a0a";
  const text = profile?.template?.textColor || "#ffffff";
  const font = profile?.template?.fontFamily || "Orbitron, sans-serif";
  const primary = profile?.template?.primary || "#00ffff";
  const secondary = profile?.template?.secondary || "#ff00ff";
  const accent = profile?.template?.accent || "#9d00ff";

  return (
    <div
 className={`w-full p-4 flex justify-center items-center ${
    pathname.startsWith("/profile/") ? "min-h-screen" : ""
  }`}      style={{
        background: `radial-gradient(circle at center, ${primary}15, ${secondary}15, ${bg})`,
        color: text,
        fontFamily: font,
      }}
    >
      <div
        className="w-full max-w-xs backdrop-blur-lg border-2 rounded-xl overflow-hidden"
        style={{
          borderColor: primary,
          boxShadow: `0 0 30px ${primary}40, inset 0 0 20px rgba(255,255,255,0.05)`,
          background: "rgba(0,0,0,0.7)",
        }}
      >
        {/* Cover */}
        <div
          className="h-28 w-full"
          style={{
            background: profile?.coverImage 
              ? `url(${profile.coverImage}) center/cover`
              : `linear-gradient(45deg, ${primary}, ${secondary})`,
          }}
        >
          {!profile?.coverImage && (
            <div 
              className="flex items-center justify-center h-full text-white/70 text-sm"
              style={{
                background: `linear-gradient(45deg, ${primary}, ${secondary})`,
              }}
            >
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center px-6 -mt-12 relative z-10">
          <div
            className="w-24 h-24 rounded-full border-4 overflow-hidden flex items-center justify-center relative"
            style={{
              borderColor: "#ffffff",
              boxShadow: `0 0 25px ${primary}, 0 0 50px ${primary}50`,
              background: "rgba(0,0,0,0.8)",
            }}
          >
            {profile?.avatar ? (
              <img
                src={`${imageUrl}/storage/${profile.avatar}`}
                alt={profile.displayName || "Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-white/70" />
            )}
          </div>

          {/* Online Status */}
          <span 
            className="absolute top-16 right-[30%] text-black text-xs px-2 py-0.5 rounded-full font-bold animate-pulse"
            style={{ 
              backgroundColor: primary,
              boxShadow: `0 0 10px ${primary}`,
            }}
          >
            ONLINE
          </span>

          {/* Name & Info */}
          <h1 
            className="mt-4 text-lg font-bold tracking-wider"
            style={{
              textShadow: `0 0 10px ${primary}`,
            }}
          >
            {profile?.displayName || "Display Name"}
          </h1>
          {profile?.location && (
            <p className="flex items-center gap-1 text-xs text-white/70 mt-1">
              <MapPin size={12} style={{ color: secondary }} />
              {profile.location}
            </p>
          )}
          {profile?.bio && (
            <p className="mt-2 text-xs text-white/60 text-center leading-snug">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Contact Section */}
        {(profile?.email || profile?.phone || profile?.website) && (
          <>
            <div 
              className="border-t mt-4 mx-6" 
              style={{ borderColor: `${primary}40` }}
            ></div>
            <div className="px-6 py-3 space-y-2">
              <h3 
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: primary }}
              >
                CONTACT
              </h3>
              
              {profile?.email && (
                <div 
                  className="flex items-center justify-between rounded-lg p-2 text-xs border"
                  style={{ 
                    background: "rgba(255,255,255,0.05)",
                    borderColor: `${primary}30`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Mail size={14} style={{ color: primary }} />
                    <span className="text-white/90">{profile.email}</span>
                  </div>
                  <button 
                    className="text-white/50 hover:text-white transition" 
                    onClick={() => copyToClipboard(profile.email!)}
                    style={{ filter: `drop-shadow(0 0 5px ${primary})` }}
                  >
                    <Copy size={12} />
                  </button>
                </div>
              )}

              {profile?.phone && (
                <div 
                  className="flex items-center justify-between rounded-lg p-2 text-xs border"
                  style={{ 
                    background: "rgba(255,255,255,0.05)",
                    borderColor: `${primary}30`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Phone size={14} style={{ color: secondary }} />
                    <span className="text-white/90">{profile.phone}</span>
                  </div>
                  <button 
                    className="text-white/50 hover:text-white transition" 
                    onClick={() => copyToClipboard(profile.phone!)}
                    style={{ filter: `drop-shadow(0 0 5px ${secondary})` }}
                  >
                    <Copy size={12} />
                  </button>
                </div>
              )}

              {profile?.website && (
                <div 
                  className="flex items-center gap-2 rounded-lg p-2 text-xs border"
                  style={{ 
                    background: "rgba(255,255,255,0.05)",
                    borderColor: `${primary}30`,
                  }}
                >
                  <Globe size={14} style={{ color: accent }} />
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-white/90 hover:text-white transition"
                  >
                    {profile.website}
                  </a>
                </div>
              )}
            </div>
          </>
        )}

        {/* Social Links */}
        {profile?.socialLinks?.length > 0 && (
          <>
            <div 
              className="border-t mx-6" 
              style={{ borderColor: `${primary}40` }}
            ></div>
            <div className="px-6 py-3">
              <h3 
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: secondary }}
              >
                NETWORK
              </h3>
              <div className="flex flex-wrap gap-2">
               {profile.socialLinks
                            .filter(link => link.isVisible)
                            .map(link => {
                              // normalize key: lowercase and trim
                              const platformKey = (link.platform || link.id || "").trim().toLowerCase();
                              const icon = socialIconMap[platformKey] || <Globe size={14} />;
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1 text-xs rounded-full border hover:bg-white/10 transition text-white/90"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          borderColor: `${secondary}50`,
                          boxShadow: `inset 0 0 10px ${secondary}20`,
                        }}
                      >
                        {icon}
                        {link.username}
                      </a>
                    );
                  })}
              </div>
            </div>
          </>
        )}

        {/* Bottom Actions */}
        <div 
          className="border-t"
          style={{ 
            borderColor: `${primary}40`,
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="flex justify-around p-3">
            <button 
              onClick={() => setIsQRModalOpen(true)} 
              className="flex flex-col items-center text-xs hover:opacity-70 transition"
              style={{ 
                color: primary,
                filter: `drop-shadow(0 0 5px ${primary})`,
              }}
            >
              <QrCode className="w-4 h-4 mb-1" />
              <span>QR</span>
            </button>
            <button
              onClick={handleShare}
              className="flex flex-col items-center text-xs hover:opacity-70 transition"
              style={{ 
                color: secondary,
                filter: `drop-shadow(0 0 5px ${secondary})`,
              }}
            >
              <Share2 className="w-4 h-4 mb-1" />
              <span>SHARE</span>
            </button>
           
          </div>
        </div>
      </div>

      {/* QR Modal */}
      <Dialog open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
        <DialogContent 
          className="sm:max-w-md border-2"
          style={{
            background: "rgba(0,0,0,0.95)",
            borderColor: primary,
            boxShadow: `0 0 30px ${primary}60`,
          }}
        >
          <DialogHeader>
            <DialogTitle 
              className="flex items-center gap-2 font-bold tracking-wider"
              style={{ 
                color: primary,
                textShadow: `0 0 10px ${primary}`,
              }}
            >
              <QrCode className="w-5 h-5" /> QR ACCESS: {profile.displayName}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div 
              className="p-4 rounded-xl border-2"
              style={{
                borderColor: primary,
                boxShadow: `0 0 20px ${primary}40`,
                background: "rgba(255,255,255,0.95)",
              }}
            >
              <QRCodeSVG
                value={profileUrl}
                size={200}
                level="H"
                fgColor="#000000"
                bgColor="#ffffff"
                imageSettings={{
                  src: "/logo.png",
                  height: 30,
                  width: 30,
                  excavate: true,
                }}
              />
            </div>
            <div 
              className="w-full p-3 rounded-lg border"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: `${primary}30`,
              }}
            >
              <p className="text-sm text-white/70 mb-2 font-bold uppercase tracking-wide">PROFILE URL:</p>
              <div className="flex items-center justify-between">
                <code className="text-sm text-white/90 truncate flex-1 mr-2">{profileUrl}</code>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={copyUrl}
                  style={{ 
                    color: primary,
                    border: `1px solid ${primary}50`,
                  }}
                  className="hover:bg-white/10"
                >
                  {copied ? "COPIED!" : "COPY"}
                </Button>
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <Button 
                variant="outline" 
                className="flex-1 font-bold tracking-wide hover:bg-white/10"
                style={{ 
                  borderColor: secondary,
                  color: secondary,
                }}
              >
                <Download className="w-4 h-4 mr-2" /> DOWNLOAD
              </Button>
              <Button 
                onClick={() => setIsQRModalOpen(false)}
                className="flex-1 font-bold tracking-wide"
                style={{ 
                  background: primary,
                  color: "#000000",
                  boxShadow: `0 0 15px ${primary}60`,
                }}
              >
                CLOSE
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}