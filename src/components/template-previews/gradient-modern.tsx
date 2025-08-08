import React from "react";
import { User } from "lucide-react";

interface GradientModernProps {
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
      gradientFrom?: string;
      gradientTo?: string;
    };
  };
}

export function GradientModern({ profile }: GradientModernProps) {
  const gradientFrom = profile?.template?.gradientFrom || "#667eea";
  const gradientTo = profile?.template?.gradientTo || "#764ba2";
  const text = profile?.template?.textColor || "#ffffff";
  const font = profile?.template?.fontFamily || "Inter, sans-serif";

  return (
    <div
      className="w-full h-full p-4 flex justify-center items-center"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        color: text,
        fontFamily: font,
      }}
    >
      {/* Card Container */}
      <div className="w-full max-w-xs bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden border border-white/20 transition hover:shadow-2xl hover:-translate-y-1 duration-300">
        
        {/* Cover Image */}
        <div className="h-28 w-full bg-gradient-to-r from-pink-400 to-yellow-300">
          {profile?.coverImage ? (
            <img
              src={profile.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/70 text-sm">
              No Cover
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center px-6 -mt-12 relative z-10">
        <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white/20 flex items-center justify-center">
            {profile?.avatar ? (
            <img
                src={profile.avatar}
                alt={profile.displayName || "Profile Avatar"}
                className="w-full h-full object-cover"
            />
            ) : (
            <User className="w-10 h-10 text-white/70" /> // Lucide user icon
            )}
        </div>

        {/* Name & Bio */}
        <h1 className="mt-4 text-lg font-semibold text-white">
            {profile?.displayName || "Name"}
        </h1>
        {profile?.location && (
            <p className="text-xs text-white/80">{profile.location}</p>
        )}
        {profile?.bio && (
            <p className="mt-1 text-xs text-white/80 text-center leading-snug">
            {profile.bio}
            </p>
        )}
        </div>


        
        {/* Divider */}
        <div className="border-t border-white/20 mt-4"></div>

        {/* Contact Info */}
        <div className="px-6 py-3 text-xs text-white/80 space-y-1">
          {profile?.website && (
            <p className="truncate">
              🌐{" "}
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-yellow-300"
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
            <div className="border-t border-white/20"></div>
            <div className="flex flex-wrap justify-center gap-2 p-4">
              {profile.socialLinks
                .filter((link) => link.isVisible)
                .map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs rounded-full bg-white/20 hover:bg-white/30 text-white transition"
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
