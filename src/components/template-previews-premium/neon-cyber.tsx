import React from "react";
import { User } from "lucide-react";

interface NeonCyberProps {
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

export function NeonCyber({ profile }: NeonCyberProps) {
  const bg = profile?.template?.backgroundColor || "#0a0a0a";
  const text = profile?.template?.textColor || "#ffffff";
  const font = profile?.template?.fontFamily || "Orbitron, sans-serif";
  const primary = profile?.template?.primary || "#00ffff";
  const secondary = profile?.template?.secondary || "#ff00ff";

  return (
    <div
      className="w-full h-full p-4 flex justify-center items-center"
      style={{
        background: `radial-gradient(circle at center, ${primary}, ${secondary}, ${bg})`,
        color: text,
        fontFamily: font,
      }}
    >
      <div
        className="w-full max-w-xs backdrop-blur-lg border-2 border-[var(--primary)] rounded-xl shadow-[0_0_20px_var(--primary)]"
        style={{ "--primary": primary } as React.CSSProperties}
      >
        {/* Cover */}
        <div
          className="h-28 w-full rounded-t-xl"
          style={{ background: primary }}
        >
          {profile?.coverImage ? (
            <img
              src={profile.coverImage}
              alt="Cover"
              className="w-full h-full object-cover rounded-t-xl"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white/70 text-sm rounded-t-xl">
              No Cover
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center px-6 -mt-12 relative z-10">
          <div
            className="w-24 h-24 rounded-full border-4 shadow-lg overflow-hidden flex items-center justify-center"
            style={{
              borderColor: "#ffffff", // White outline
              boxShadow: `0 0 15px ${primary}`, // Still glowing in neon
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
          >
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.displayName || "Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-white/70" />
            )}
          </div>


          {/* Name */}
          <h1 className="mt-4 text-lg font-bold">{profile?.displayName || "Name"}</h1>
          {profile?.location && <p className="text-xs text-white/70">{profile.location}</p>}
          {profile?.bio && <p className="mt-1 text-xs text-white/60 text-center">{profile.bio}</p>}
        </div>

        {/* Website & Phone */}
        <div className="border-t border-white/20 mt-4 px-6 py-3 text-xs text-white/80 space-y-1">
          {profile?.website && (
            <p>
              🌐{" "}
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[var(--primary)]"
              >
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
