import React from "react";
import { User } from "lucide-react"; // ✅ Import Lucide User icon

interface GlassMorphismProps {
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

export function GlassMorphism({ profile }: GlassMorphismProps) {
  const primary = profile?.template?.primary || "#6366f1"; // indigo
  const secondary = profile?.template?.secondary || "#8b5cf6"; // violet
  const accent = profile?.template?.accent || "#ec4899"; // pink
  const bg =
    profile?.template?.backgroundColor ||
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  const text = profile?.template?.textColor || "#1f2937";
  const font = profile?.template?.fontFamily || "'SF Pro Display', sans-serif";

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
        className="w-full max-w-xs rounded-2xl overflow-hidden border transition transform duration-300 backdrop-blur-lg bg-white/10"
        style={{
          borderColor: "rgba(255, 255, 255, 0.3)",
          boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.37)`,
        }}
      >
        {/* Cover Image */}
        <div className="h-28 w-full bg-white/20">
          {profile?.coverImage ? (
            <img
              src={profile.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-white/70">
              No Cover
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center px-6 -mt-12 relative z-10">
          <div
            className="w-24 h-24 rounded-full border-4 overflow-hidden backdrop-blur-md bg-white/30 flex items-center justify-center"
            style={{
              borderColor: secondary,
              boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1), 0 0 15px ${accent}`,
            }}
          >
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.displayName || "Profile Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <User
                size={48}
                className="text-white/80"
                style={{ filter: `drop-shadow(0 0 5px ${accent})` }}
              />
            )}
          </div>

          {/* Name & Bio */}
          <h1
            className="mt-4 text-lg font-bold"
            style={{
              color: primary,
              textShadow: `0 0 5px rgba(255,255,255,0.5)`,
            }}
          >
            {profile?.displayName || "Name"}
          </h1>
          {profile?.location && (
            <p className="text-xs opacity-80">{profile.location}</p>
          )}
          {profile?.bio && (
            <p className="mt-1 text-xs opacity-80 text-center leading-snug">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Divider */}
        <div
          className="border-t mt-4"
          style={{ borderColor: "rgba(255,255,255,0.3)" }}
        ></div>

        {/* Contact Info */}
        <div className="px-6 py-3 text-xs space-y-1">
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
            <div
              className="border-t"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            ></div>
            <div className="flex flex-wrap justify-center gap-2 p-4">
              {profile.socialLinks
                .filter((link) => link.isVisible)
                .map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs rounded-full backdrop-blur-sm bg-white/30"
                    style={{
                      color: "#fff",
                      boxShadow: `0 0 10px ${accent}`,
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
