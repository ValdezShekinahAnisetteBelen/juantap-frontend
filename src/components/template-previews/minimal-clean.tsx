import React from "react";
import { User } from "lucide-react";

interface MinimalCleanProps {
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
    };
  };
  template?: {
    name?: string;
    thumbnail?: string;
    previewComponent?: React.ComponentType;
  };
}

export function MinimalClean({ profile, template }: MinimalCleanProps) {
  const bg = profile?.template?.backgroundColor || "#f9fafb";
  const text = profile?.template?.textColor || "#111827";
  const font = profile?.template?.fontFamily || "Inter, sans-serif";

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
      <div className="w-full max-w-xs bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 transition hover:shadow-xl hover:-translate-y-1 duration-300">
        
        {/* Cover Image */}
        <div className="h-28 w-full bg-gray-100">
          {profile?.coverImage ? (
            <img
              src={profile.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No Cover
            </div>
          )}
        </div>

        {/* Avatar */}
       <div className="flex flex-col items-center px-6 -mt-12 relative">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-50 flex items-center justify-center">
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.displayName || "Profile Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-gray-400" />
            )}
          </div>

          {/* Name & Bio */}
          <h1 className="mt-4 text-lg font-semibold">
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
        <div className="border-t border-gray-100 mt-4"></div>

        {/* Contact Info */}
        <div className="px-6 py-3 text-xs text-gray-600 space-y-1">
          {profile?.website && (
            <p className="truncate">
              🌐{" "}
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-600"
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
            <div className="border-t border-gray-100"></div>
            <div className="flex flex-wrap justify-center gap-2 p-4">
              {profile.socialLinks
                .filter((link) => link.isVisible)
                .map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs rounded-full bg-gray-100 hover:bg-gray-200 transition"
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
