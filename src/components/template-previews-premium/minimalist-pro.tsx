import React from "react";
import { User } from "lucide-react"; // <-- Import Lucide icon

interface MinimalistProProps {
  profile?: {
    displayName?: string;
    location?: string;
    bio?: string;
    coverImage?: string;
    avatar?: string;
    website?: string;
    phone?: string;
    socialLinks?: { id: string; username: string; url: string; isVisible: boolean }[];
    template?: {
      backgroundColor?: string;
      textColor?: string;
      fontFamily?: string;
      primary?: string;
      secondary?: string;
      accent?: string;
    };
  };
}

export function MinimalistPro({ profile }: MinimalistProProps) {
  const primary = profile?.template?.primary || "#000000";
  const secondary = profile?.template?.secondary || "#6b7280";
  const accent = profile?.template?.accent || "#3b82f6";
  const bg = profile?.template?.backgroundColor || "#ffffff";
  const text = profile?.template?.textColor || "#111827";
  const font = profile?.template?.fontFamily || "'Inter', sans-serif";

  return (
    <div
      className="w-full h-full p-4 flex justify-center items-center"
      style={{
        background: bg,
        color: text,
        fontFamily: font,
      }}
    >
      {/* Card Container */}
      <div
        className="w-full max-w-sm rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-transform duration-300"
        style={{
          background: "#fff",
        }}
      >
        {/* Cover Image */}
        <div className="h-28 w-full bg-gray-100">
          {profile?.coverImage ? (
            <img
              src={profile.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
              No Cover
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center px-6 -mt-12 relative">
          <div
            className="w-24 h-24 rounded-full border-2 overflow-hidden bg-gray-50 flex items-center justify-center"
            style={{
              borderColor: "#e5e7eb",
            }}
          >
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.displayName || "Profile Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-gray-400" /> // <-- Icon here
            )}
          </div>

          {/* Name & Bio */}
          <h1
            className="mt-4 text-xl font-semibold tracking-tight"
            style={{
              color: primary,
            }}
          >
            {profile?.displayName || "Name"}
          </h1>
          {profile?.location && (
            <p className="text-sm text-gray-500">{profile.location}</p>
          )}
          {profile?.bio && (
            <p className="mt-1 text-sm text-gray-600 text-center leading-snug">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t mt-4" style={{ borderColor: "#e5e7eb" }}></div>

        {/* Contact Info */}
        <div className="px-6 py-3 text-sm space-y-1">
          {profile?.website && (
            <p className="truncate">
              🌐{" "}
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: accent }}
              >
                {profile.website}
              </a>
            </p>
          )}
          {profile?.phone && <p>📞 {profile.phone}</p>}
        </div>

        {/* Social Links */}
        {profile?.socialLinks?.length > 0 && (
          <>
            <div className="border-t" style={{ borderColor: "#e5e7eb" }}></div>
            <div className="flex flex-wrap justify-center gap-2 p-4">
              {profile.socialLinks
                .filter((link) => link.isVisible)
                .map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-sm rounded-full border border-gray-200 hover:border-gray-400 transition-colors"
                    style={{
                      color: primary,
                    }}
                  >
                    {link.username}
                  </a>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
