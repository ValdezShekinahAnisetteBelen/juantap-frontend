import React from "react";
import { User } from "lucide-react";

interface RetroVintageProps {
  profile?: {
    displayName?: string;
    location?: string;
    bio?: string;
    coverImage?: string;
    avatar?: string;
    website?: string;
    phone?: string;
    socialLinks?: {
      id: string;
      username: string;
      url: string;
      isVisible: boolean;
    }[];
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

export function RetroVintage({ profile }: RetroVintageProps) {
  const primary = profile?.template?.primary || "#ff6b9d";
  const secondary = profile?.template?.secondary || "#c44569";
  const accent = profile?.template?.accent || "#f8b500";
  const bg = profile?.template?.backgroundColor || "#2d1b69";
  const text = profile?.template?.textColor || "#ffffff";
  const font = profile?.template?.fontFamily || "'Righteous', cursive";

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
        className="w-full max-w-xs rounded-2xl overflow-hidden border transition transform duration-300"
        style={{
          background: "rgba(45, 27, 105, 0.95)",
          borderColor: primary,
          boxShadow: `0 0 20px ${primary}, 0 0 40px ${accent}`,
        }}
      >
        {/* Cover Image / Neon Banner */}
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
            className="w-24 h-24 rounded-full border-4 shadow-lg overflow-hidden flex items-center justify-center"
            style={{
              borderColor: bg,
              backgroundColor: secondary,
              boxShadow: `0 0 15px ${accent}`,
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
                strokeWidth={1.5}
                className="text-white/80"
                style={{
                  filter: `drop-shadow(0 0 5px ${accent}) drop-shadow(0 0 10px ${primary})`,
                }}
              />
            )}
          </div>

          {/* Name & Bio */}
          <h1
            className="mt-4 text-lg font-bold"
            style={{
              color: primary,
              textShadow: `0 0 5px ${primary}, 0 0 15px ${accent}`,
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
        <div className="border-t mt-4" style={{ borderColor: primary }}></div>

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
            <div className="border-t" style={{ borderColor: primary }}></div>
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
                      backgroundColor: primary,
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
