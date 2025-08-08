import React from "react";
import { User } from "lucide-react"; // import Lucide User icon

interface NatureOrganicProps {
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

export function NatureOrganic({ profile }: NatureOrganicProps) {
  const primary = profile?.template?.primary || "#22c55e"; // green
  const secondary = profile?.template?.secondary || "#16a34a"; // darker green
  const accent = profile?.template?.accent || "#84cc16"; // lime
  const bg = profile?.template?.backgroundColor || "#f0fdf4"; // light green background
  const text = profile?.template?.textColor || "#14532d"; // dark forest green
  const font = profile?.template?.fontFamily || "'Source Sans Pro', sans-serif";

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
      <div className="w-full max-w-xs bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 transition hover:shadow-xl hover:-translate-y-1 duration-300">
        
        {/* Cover Image */}
        <div className="h-28 w-full" style={{ backgroundColor: primary }}>
          {profile?.coverImage ? (
            <img
              src={profile.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/80 text-sm">
              No Cover
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center px-6 -mt-12 relative">
          <div
            className="w-24 h-24 rounded-full border-4 shadow-md overflow-hidden flex items-center justify-center"
            style={{ borderColor: bg, backgroundColor: accent }}
          >
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.displayName || "Profile Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-white/80" /> // Lucide icon
            )}
          </div>

          {/* Name & Bio */}
          <h1 className="mt-4 text-lg font-semibold" style={{ color: secondary }}>
            {profile?.displayName || "Name"}
          </h1>
          {profile?.location && (
            <p className="text-xs text-gray-500">{profile.location}</p>
          )}
          {profile?.bio && (
            <p className="mt-1 text-xs text-gray-500 text-center leading-snug">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-4"></div>

        {/* Contact Info */}
        <div className="px-6 py-3 text-xs text-gray-700 space-y-1">
          {profile?.website && (
            <p className="truncate">
              🌐{" "}
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-green-600"
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
            <div className="border-t border-grays-200"></div>
            <div className="flex flex-wrap justify-center gap-2 p-4">
              {profile.socialLinks
                .filter((link) => link.isVisible)
                .map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: secondary,
                      color: "white",
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
