"use client"
import React, { useState } from "react"
import {
  Mail, Globe, Copy, Facebook, Instagram, Twitter,
  Linkedin, Github, Youtube, Music, QrCode, Share2, Download, Send, MessageCircle, MapPin, Phone 
} from "lucide-react"
import { User as UserIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QRCodeSVG } from "qrcode.react"
import type { Template, User } from "@/types/template"
import { toast } from 'sonner'

interface SocialLink {
  id: string
  platform: string
  username: string
  url: string
}

interface UserData {
  id: number
  name: string
  email: string
  profile?: {
    avatar?: string
    bio?: string
    phone?: number
    website?: string
    location?: string
    socialLinks?: SocialLink[]
  }
}

interface TemplateData {
  id: string
  name: string
  description?: string
  colors: {
    background: string
    primary: string
    secondary: string
    accent: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
  sections?: any[]
}

interface PreviewRendererProps {
  template: Template
  user: User | null
  slug: string
}

export const PreviewRenderer: React.FC<PreviewRendererProps> = ({ template, user, slug }) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [avatarError, setAvatarError] = useState(false)

  const imageUrl = template.preview_url || template.preview || template.thumbnail_url || template.thumbnail;
  const profileUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${user?.username || ''}`
  
  const downloadQR = () => {
    const svg = document.querySelector<SVGSVGElement>("#qr-code-svg")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const link = document.createElement("a")
      link.download = `${user?.username || "profile"}-qr.jpg`
      link.href = canvas.toDataURL("image/jpeg")
      link.click()
    }

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
  }

  const getSocialIcon = (platformKey: string) => {
    const lowerPlatform = platformKey.toLowerCase().replace(/\s+/g, "");
    
    // WhatsApp
    if (lowerPlatform.includes("whatsapp") || lowerPlatform.includes("whats")) {
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      );
    }
    
    // Viber
    if (lowerPlatform.includes("viber")) {
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.693 6.698.623 9.82c-.06 3.11-.13 8.95 5.5 10.541v2.42s-.038.97.602 1.17c.79.25 1.24-.499 1.99-1.299l1.4-1.58c3.85.32 6.8-.419 7.14-.529.78-.25 5.181-.811 5.901-6.652.74-6.031-.36-9.831-2.34-11.551l-.01-.002c-.6-.55-3-2.3-8.37-2.32 0 0-.396-.025-1.038-.016zm.067 1.697c.545-.003.88.02.88.02 4.54.01 6.711 1.38 7.221 1.84 1.67 1.429 2.528 4.856 1.9 9.892-.6 4.88-4.17 5.19-4.83 5.4-.28.09-2.88.73-6.152.52 0 0-2.439 2.941-3.199 3.701-.12.13-.26.17-.35.15-.13-.03-.17-.19-.16-.41l.02-4.019c-4.771-1.32-4.491-6.302-4.441-8.902.06-2.6.55-4.732 2-6.172 1.957-1.77 5.475-2.01 7.11-2.02zm.36 2.6a.299.299 0 00-.3.299.3.3 0 00.3.3 5.631 5.631 0 014.03 1.59 5.402 5.402 0 011.75 3.87.3.3 0 00.3.3.3.3 0 00.3-.3 5.966 5.966 0 00-1.936-4.269 6.222 6.222 0 00-4.445-1.79zm-3.954.69a.955.955 0 00-.615.12h-.012c-.41.24-.788.54-1.148.93-.27.27-.44.606-.359 1.01.21 1.06.77 2.14 1.379 3.08a13.467 13.467 0 003.831 4.36c.09.06.18.13.26.19.94.75 1.791 1.24 2.532 1.639.27.14.5.25.69.35a2.03 2.03 0 001.102.24 1.99 1.99 0 001.162-.35c.4-.3.73-.63 1.051-1.05.219-.28.189-.61-.04-.83l-2.081-1.58c-.24-.18-.56-.17-.779.02l-.899.779a.711.711 0 01-.749.14c-.619-.24-1.419-.72-2.379-1.68-.959-.959-1.439-1.759-1.679-2.379a.653.653 0 01.13-.749l.779-.899c.2-.22.21-.539.03-.779L8.18 5.577c-.12-.16-.29-.25-.47-.25zm3.653.19a.3.3 0 00-.3.3.3.3 0 00.3.299c.77 0 1.5.299 2.05.841.55.54.85 1.27.85 2.039a.3.3 0 00.3.3.3.3 0 00.3-.3c0-.899-.36-1.759-1-2.399-.64-.64-1.5-1-2.4-1h-.1zm.29 1.8a.3.3 0 00-.3.3.3.3 0 00.3.3c.32 0 .63.13.85.35.23.22.35.53.35.85a.3.3 0 00.3.299.3.3 0 00.3-.3c0-.48-.2-.94-.54-1.279a1.8 1.8 0 00-1.26-.53z"/>
        </svg>
      );
    }
    
    // LINE
    if (lowerPlatform.includes("line")) {
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
        </svg>
      );
    }
    
    // Telegram
    if (lowerPlatform.includes("telegram")) {
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      );
    }
    
    // KakaoTalk
    if (lowerPlatform.includes("kakao")) {
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 4.372 0 9.778c0 3.43 2.282 6.446 5.738 8.158-.243.897-.94 3.524-1.068 4.057-.152.635.233.627.492.456.205-.136 3.21-2.13 4.592-3.046.812.114 1.644.174 2.494.174 6.627 0 12-4.372 12-9.778C24 4.372 18.627 0 12 0z"/>
        </svg>
      );
    }
    
    // WeChat
    if (lowerPlatform.includes("wechat") || lowerPlatform.includes("we")) {
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1 .18-.556c1.527-1.123 2.5-2.784 2.5-4.627 0-3.51-3.473-6.298-7.824-6.298l-.238.003zm-2.391 1.645a.971.971 0 0 1 .971.969.971.971 0 0 1-.971.969.971.971 0 0 1-.97-.969.971.971 0 0 1 .97-.969zm4.782 0a.971.971 0 0 1 .971.969.971.971 0 0 1-.971.969.971.971 0 0 1-.971-.969.971.971 0 0 1 .971-.969z"/>
        </svg>
      );
    }
    
    // Default icons for other platforms
    const iconMap: Record<string, React.ReactNode> = {
      facebook: <Facebook size={16} />,
      instagram: <Instagram size={16} />,
      twitter: <Twitter size={16} />,
      linkedin: <Linkedin size={16} />,
      github: <Github size={16} />,
      youtube: <Youtube size={16} />,
      tiktok: <Music size={16} />,
    };
    
    return iconMap[lowerPlatform] || <Globe size={16} />;
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied!')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: template?.name ?? "My Profile",
          text: template?.description ?? "",
          url: profileUrl,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      alert("Sharing not supported.")
    }
  }

  const avatarUrl = user?.avatar_url || null;

  const handleSaveContact = () => {
  if (!user) return;

  // Get user's social links (assuming your API returns user.social_links)
  let socials: any[] = [];

// If it's already an array, use it directly
if (Array.isArray(user?.social_links)) {
  socials = user.social_links;
}
// If it's a JSON string (like '["..."]'), parse it
else if (typeof user?.social_links === "string") {
  try {
    socials = JSON.parse(user.social_links);
  } catch (err) {
    socials = [];
  }
}
// If it's stored under user.profile.socialLinks, use that instead
else if (Array.isArray(user?.profile?.socialLinks)) {
  socials = user.profile.socialLinks;
}


  // Convert each social link to a vCard line
  const socialFields = socials
    .map(
      (s: any) =>
        `X-SOCIALPROFILE;TYPE=${(s.platform || "social").toLowerCase()}:${s.url}`
    )
    .join("\n");

  // Construct the vCard data
  const vcardData = `
BEGIN:VCARD
VERSION:3.0
FN:${user.display_name || user.name || user.username || ""}
TEL;TYPE=CELL:${user.profile?.phone || ""}
EMAIL;TYPE=INTERNET:${user.email || ""}
URL:${user.profile?.website || ""}
ADR;TYPE=HOME:;;${user.profile?.location || ""};;;
NOTE:${user.profile?.bio || ""}
${socialFields}
END:VCARD
  `.trim();

  // Create and trigger download
  const blob = new Blob([vcardData], { type: "text/vcard" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${user.display_name || user.username || "contact"}.vcf`;
  link.click();
  URL.revokeObjectURL(link.href);

  toast.success("Contact saved to phone book!");
};



  return (
    <div className="w-full flex justify-center px-4 py-6 sm:px-6" style={{ backgroundColor: "#f9fafb" }}>
      <div className="w-full max-w-lg shadow-lg rounded-2xl overflow-hidden flex flex-col mx-auto"
        style={{
          backgroundColor: template?.colors?.background,
          fontFamily: template?.fonts?.body,
        }}
      >
        {/* Banner */}
        <div
          className="w-full h-32"
          style={{
            background: `linear-gradient(135deg, ${template?.colors?.accent}, ${template?.colors?.primary})`,
          }}
        />

        {/* Avatar & Bio */}
        <div className="relative flex flex-col items-center mt-6 px-4 sm:px-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white/20 -mt-12">
            {user?.avatar_url && !avatarError ? (
              <img
                src={avatarUrl}
                alt="User avatar"
                className="w-full h-full object-cover"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-white/20">
                <UserIcon size={48} className="sm:hidden text-gray-400" />
                <UserIcon size={64} className="hidden sm:block text-gray-400" />
              </div>
            )}
          </div>

          <h1
            className="mt-4 text-lg sm:text-xl font-bold text-center px-2"
            style={{
              fontFamily: template?.fonts?.heading,
              color: template?.colors?.text,
            }}
          >
            {user?.display_name || user?.name || user?.username || "Anonymous"}
          </h1>

          {user?.profile?.bio && (
            <p
              className="text-sm text-center mt-1 px-2 leading-relaxed"
              style={{
                color: template?.colors?.secondary,
                fontFamily: template?.fonts?.body,
              }}
            >
              {user.profile.bio}
            </p>
          )}
        </div>

        {/* Contact */}
        <div className="p-6 space-y-4">
          <h2
            className="text-sm font-semibold uppercase tracking-wide"
            style={{
              color: template?.colors?.secondary,
              fontFamily: template?.fonts?.heading,
            }}
          >
            Contact
          </h2>

         {/* Email */}
            {user?.email && (
              <div
                className="flex justify-between items-center rounded-lg p-3 text-sm"
                style={{ backgroundColor: `${template?.colors?.primary}10`, fontFamily: template?.fonts?.body }}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1" style={{ color: template?.colors?.text }}>
                  <Mail size={16} className="flex-shrink-0" style={{ color: template?.colors?.accent }} />
                  <a 
                    href={`mailto:${user.email}`} 
                    className="truncate underline hover:opacity-70"
                  >
                    {user.email}
                  </a>
                </div>
                <button
                  className="hover:opacity-70 p-1 ml-2 flex-shrink-0"
                  style={{ color: template?.colors?.secondary }}
                  onClick={() => handleCopy(user.email)}
                >
                  <Copy size={16} />
                </button>
              </div>
            )}

    {/* Phone */}
    {user?.profile?.phone && (
      <div
        className="flex justify-between items-center rounded-lg p-3 text-sm"
        style={{ backgroundColor: `${template?.colors?.primary}10`, fontFamily: template?.fonts?.body }}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1" style={{ color: template?.colors?.text }}>
          <Phone size={16} className="flex-shrink-0" style={{ color: template?.colors?.accent }} />
          <a 
            href={`tel:${user.profile.phone}`} 
            className="truncate underline hover:opacity-70"
          >
            {user.profile.phone}
          </a>
        </div>
        <button
          className="hover:opacity-70 p-1 ml-2 flex-shrink-0"
          style={{ color: template?.colors?.secondary }}
          onClick={() => handleCopy(user.profile.phone.toString())}
        >
          <Copy size={16} />
        </button>
      </div>
    )}

          {/* Website */}
          {user?.profile?.website && (
            <div className="flex justify-between items-center rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm"
              style={{ backgroundColor: `${template?.colors?.primary}10`, fontFamily: template?.fonts?.body }}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1" style={{ color: template?.colors?.text }}>
                <Globe size={14} className="sm:w-4 sm:h-4 flex-shrink-0" style={{ color: template?.colors?.accent }} />
                <a 
                  href={user.profile.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline hover:opacity-70 truncate"
                >
                  {user.profile.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
              <button 
                className="hover:opacity-70 p-1 ml-2 flex-shrink-0"
                style={{ color: template?.colors?.secondary }}
                onClick={() => handleCopy(user.profile.website)}
              >
                <Copy size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          )}

         {/* Location */}
        {user?.profile?.location && (
          <div
            className="flex justify-between items-center rounded-lg p-3 text-sm"
            style={{ backgroundColor: `${template?.colors?.primary}10`, fontFamily: template?.fonts?.body }}
          >
            <div className="flex items-center gap-2 min-w-0 flex-1" style={{ color: template?.colors?.text }}>
              <MapPin size={16} className="flex-shrink-0" style={{ color: template?.colors?.accent }} />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(user.profile.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate underline hover:opacity-70"
              >
                {user.profile.location}
              </a>
            </div>
            <button 
              className="hover:opacity-70 p-1 ml-2 flex-shrink-0"
              style={{ color: template?.colors?.secondary }}
              onClick={() => handleCopy(user.profile.location)}
            >
              <Copy size={16} />
            </button>
          </div>
        )}
        </div>

        {/* Social Links */}
        {user?.profile?.socialLinks?.length > 0 && (
          <div className="px-6 pb-6">
            <h2
              className="text-sm font-semibold uppercase mb-3 tracking-wide"
              style={{
                color: template?.colors?.secondary,
                fontFamily: template?.fonts?.heading,
              }}
            >
              Connect with me
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {user?.profile?.socialLinks
                ?.filter((link: SocialLink) => link.isVisible === true || link.isVisible === 1)
                .map((link: SocialLink) => {
                  const platformKey = link.platform?.toLowerCase()
                  const icon = getSocialIcon(platformKey)
                  
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg p-2 text-sm hover:opacity-80 transition min-w-0"
                      style={{
                        backgroundColor: `${template?.colors?.accent}15`,
                        color: template?.colors?.text,
                        fontFamily: template?.fonts?.body,
                      }}
                    >
                      <span className="flex-shrink-0" style={{ color: template?.colors?.accent }}>{icon}</span>
                      <span className="truncate">{link.username}</span>
                    </a>
                  )
                })}
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div
          className="flex justify-around border-t p-4"
          style={{
            backgroundColor: `${template?.colors?.primary}08`,
            borderColor: `${template?.colors?.primary}20`,
            fontFamily: template?.fonts?.body,
          }}
        >
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="flex flex-col items-center text-sm hover:opacity-70"
            style={{ color: template?.colors?.text }}
          >
            <QrCode className="w-5 h-5 mb-1" style={{ color: template?.colors?.accent }} />
            <span className="whitespace-nowrap">QR Code</span>
          </button>
          <button
            onClick={handleShare}
            className="flex flex-col items-center text-sm hover:opacity-70"
            style={{ color: template?.colors?.text }}
          >
            <Share2 className="w-5 h-5 mb-1" style={{ color: template?.colors?.accent }} />
            <span className="whitespace-nowrap">Share</span>
          </button>

          <button
            onClick={handleSaveContact}
            className="flex flex-col items-center text-sm hover:opacity-70"
            style={{ color: template?.colors?.text }}
          >
            <Download className="w-5 h-5 mb-1" style={{ color: template?.colors?.accent }} />
            <span className="whitespace-nowrap">Save Contact</span>
          </button>

        </div>
      </div>

      {/* QR Modal */}
      <Dialog open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
        <DialogContent className="w-[95%] max-w-[350px] sm:max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <QrCode className="w-4 h-4 sm:w-5 sm:h-5" /> 
              <span className="truncate">QR Code for {user?.name || "Anonymous"}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 p-2">
            <div className="w-full flex justify-center">
              <QRCodeSVG
                id="qr-code-svg"
                value={profileUrl}
                size={180}
                className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]"
              />
            </div>
           <div className="w-full p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Profile URL:</p>
              <div className="flex items-center justify-between gap-2 w-full">
                <code className="text-[10px] sm:text-xs text-gray-800 truncate flex-1 min-w-0 break-all">
                  {profileUrl}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0 text-[10px] sm:text-xs px-2 py-1"
                  onClick={copyUrl}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2 w-full">
              <Button 
                variant="outline" 
                onClick={downloadQR}
                className="flex-1 text-xs sm:text-sm py-2"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> 
                Download
              </Button>
              <Button 
                onClick={() => setIsQRModalOpen(false)}
                className="flex-1 text-xs sm:text-sm py-2"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}