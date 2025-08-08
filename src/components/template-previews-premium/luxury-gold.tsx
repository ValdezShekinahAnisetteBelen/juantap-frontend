import React from "react";
import { User } from "lucide-react";

interface LuxuryGoldProps {
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

export function LuxuryGold({ profile }: LuxuryGoldProps) {
  const bg = profile?.template?.backgroundColor || "#000000";
  const text = profile?.template?.textColor || "#ffffff";
  const font = profile?.template?.fontFamily || "Lato, sans-serif";
  const primary = profile?.template?.primary || "#d4af37";
  const secondary = profile?.template?.secondary || "#ffd700";

  return (
    <div
      className="w-full h-full p-4 flex justify-center items-center"
      style={{
        background: bg,
        color: text,
        fontFamily: font,
      }}
    >
      <div
        className="w-full max-w-xs rounded-2xl overflow-hidden shadow-lg border-4"
        style={{
          borderColor: primary,
          backgroundImage: `linear-gradient(145deg, ${primary}20, ${secondary}10)`,
        }}
      >
        {/* Cover */}
        <div className="h-28 w-full" style={{ background: primary }}>
          {profile?.coverImage ? (
            <img src={profile.coverImage} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-white/70 text-sm">No Cover</div>
          )}
        </div>

        {/* Avatar */}
     <div className="flex flex-col items-center px-6 -mt-12 relative">
        <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white/20 flex items-center justify-center">
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.displayName || "Profile Avatar"}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-10 h-10 text-white/70" />
          )}
        </div>

        {/* Name */}
        <h1
          className="mt-4 text-lg font-bold"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {profile?.displayName || "Name"}
        </h1>
        {profile?.location && <p className="text-xs text-white/70">{profile.location}</p>}
        {profile?.bio && <p className="mt-1 text-xs text-white/60 text-center">{profile.bio}</p>}
      </div>

       
        {/* Website & Phone */}
        <div className="border-t border-white/20 mt-4 px-6 py-3 text-xs text-white/80 space-y-1">
          {profile?.website && (
            <p>
              🌐{" "}
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--primary)]">
                {profile.website}
              </a>
            </p>
          )}
          {profile?.phone && <p>📞 {profile.phone}</p>}
        </div>

        {/* Social Links */}
        {profile?.socialLinks?.length ? (
          <div className="border-t border-white/20 px-4 py-3 flex flex-wrap gap-2 justify-center">
            {profile.socialLinks.filter(l => l.isVisible).map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs"
              >
                {link.username}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
