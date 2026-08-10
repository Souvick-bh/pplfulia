"use client";

import { useAuth } from "../contexts/AuthContext";
import { useMembers } from "../hooks/useMembers";
import { Award, Crown, Heart, TrendingUp } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Member = {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  achievements?: string | null;
  role?: string;
  likes_count?: number;
  is_liked_by_user?: boolean;
  created_at: string;
};

type RoleKey = "owner" | "player" | "member";

type RoleStyle = {
  label: string;
  icon: string;
  text: string;
  border: string;
  bg: string;
  glow: string;
};

type ToggleLike = (targetUserId: string, currentlyLiked: boolean) => void;

const SIGNAL = "#E1483F"; // the reddish thread

const ROLE_STYLES: Record<RoleKey, RoleStyle> = {
  owner: {
    label: "Owner",
    icon: "/icons/richmonkey.jpg",
    text: "text-[#C9A227]",
    border: "border-[#C9A227]/40",
    bg: "bg-[#C9A227]/10",
    glow: "shadow-[0_0_40px_-10px_rgba(201,162,39,0.35)]",
  },
  player: {
    label: "Player",
    icon: "/icons/playermonkey.jpg",
    text: "text-[#8FBF52]",
    border: "border-[#8FBF52]/40",
    bg: "bg-[#8FBF52]/10",
    glow: "shadow-[0_0_40px_-10px_rgba(143,191,82,0.35)]",
  },
  member: {
    label: "Member",
    icon: "/icons/membermonkey.jpg",
    text: "text-[#8B85EE]",
    border: "border-[#8B85EE]/40",
    bg: "bg-[#8B85EE]/10",
    glow: "shadow-[0_0_40px_-10px_rgba(139,133,238,0.35)]",
  },
};

function getRoleBadge(role?: string): RoleStyle {
  const key = (role?.toLowerCase() ?? "member") as RoleKey;
  return ROLE_STYLES[key] ?? ROLE_STYLES.member;
}

function formatJoined(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}


function MemberCard({
  member,
  rank,
  currentUserId,
  isAuthenticated,
  onToggleLike,
}: {
  member: Member;
  rank: number;
  currentUserId?: string;
  isAuthenticated: boolean;
  onToggleLike: ToggleLike;
}) {
  const roleInfo = getRoleBadge(member.role);
  const liked = member.is_liked_by_user ?? false;
  const canLike = isAuthenticated && currentUserId !== member.user_id;
  const isPodium = rank <= 3;

  const orderClass = isPodium
    ? rank === 1
      ? "md:order-2"
      : rank === 2
      ? "md:order-1"
      : "md:order-3"
    : "";
  const stepClass = isPodium
    ? rank === 1
      ? "md:pb-8 md:-translate-y-2"
      : rank === 2
      ? "md:pb-3"
      : "md:pb-1 md:translate-y-1"
    : "";
  const avatarClass = isPodium ? "h-14 w-14" : "h-10 w-10";
  const rankNumClass = isPodium ? "text-2xl" : "text-lg";

  return (
    <li
      className={`roster-card-in group relative flex flex-col justify-between overflow-hidden border ${roleInfo.border} bg-[#0D0E10] p-4 transition-all duration-500 motion-safe:hover:scale-[1.015] ${roleInfo.glow} ${orderClass} ${stepClass}`}
      style={{ animationDelay: `${Math.min(rank - 1, 11) * 60}ms` }}
    >
      {/* Reddish pulse line — the connective thread across every card */}
      <span
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#E1483F]/50 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100 group-hover:via-[#E1483F]/80"
        aria-hidden="true"
      />

      <div>
        <div className="mb-3 flex items-center gap-3">
          <div
            className={`relative ${avatarClass} shrink-0 overflow-hidden rounded-full border border-[#232428] bg-[#111214]`}
          >
            {member.avatar_url ? (
              <img
                src={member.avatar_url}
                alt={member.display_name ?? "Member"}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-mono text-sm uppercase text-[#6E7075]">
                {member.display_name?.[0] ?? "?"}
              </span>
            )}
            {rank === 1 && (
              <Crown
                className="absolute -top-1 left-1/2 h-3.5 w-3.5 -translate-x-1/2 text-[#C9A227]"
                aria-hidden="true"
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[15px] font-medium leading-tight text-[#EDEAE2] transition-colors duration-300 group-hover:text-[#F6DAD6]">
              {member.display_name || "Anonymous Fan"}
            </h3>
            <div
              className={`mt-1 inline-flex items-center gap-1 border px-1.5 py-[1px] font-mono text-[10px] uppercase tracking-wider ${roleInfo.border} ${roleInfo.bg} ${roleInfo.text}`}
            >
              <img src={roleInfo.icon} alt="" className="h-2.5 w-2.5 rounded-full" />
              {roleInfo.label}
            </div>
          </div>

          <span
            className={`${rankNumClass} shrink-0 italic text-[#232428]`}
            style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
            aria-hidden="true"
          >
            {String(rank).padStart(2, "0")}
          </span>
        </div>

        {member.bio ? (
          <p className="mb-3 line-clamp-2 text-xs leading-snug text-[#8B8D93]">
            {member.bio}
          </p>
        ) : (
          <p className="mb-3 text-xs italic text-[#4C4E52]">No bio provided.</p>
        )}

        {member.achievements && (
          <p
            className="mb-3 flex items-center gap-1.5 text-[11px] text-[#8B8D93]"
            title={member.achievements}
          >
            <Award className="h-3 w-3 shrink-0 text-[#4C4E52]" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate">{member.achievements}</span>
          </p>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-[#1A1B1E] pt-3 font-mono text-[11px] text-[#6E7075]">
        <span className="flex items-center gap-1.5">
          <Heart className="h-3 w-3" />
          {member.likes_count ?? 0} Likes
        </span>

        {canLike ? (
          <button
            type="button"
            onClick={() => onToggleLike(member.user_id, liked)}
            aria-label={liked ? "Remove hit" : "Give a hit"}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wider transition-all active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090B] ${
              liked
                ? "border-[#E1483F]/50 bg-[#E1483F]/10 text-[#E1483F] focus-visible:ring-[#E1483F]/70"
                : "border-[#232428] text-[#8B8D93] hover:border-[#E1483F]/40 hover:text-[#EDEAE2] focus-visible:ring-[#3A3B3F]"
            }`}
          >
            <Heart className={`h-2.5 w-2.5 ${liked ? "fill-current" : ""}`} />
            {liked ? "Hit" : "Like"}
          </button>
        ) : !isAuthenticated ? (
          <span className="text-[10px] uppercase text-[#4C4E52]">
            Joined {formatJoined(member.created_at)}
          </span>
        ) : null}
      </div>
    </li>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Members() {
  const { members, loading, toggleLike } = useMembers();
  const { user } = useAuth();

  const handleLike: ToggleLike = (targetUserId, currentlyLiked) => {
    if (!user) return;
    toggleLike(targetUserId, currentlyLiked);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#08090B] font-mono text-[#EDEAE2]">
        <div className="h-14 w-14 animate-spin rounded-full border border-[#232428] border-t-[#E1483F]" />
        <p className="mt-6 animate-pulse text-[11px] uppercase tracking-[0.35em] text-[#5C5E63]">
          Tallying The Roster
        </p>
      </div>
    );
  }

  const podium = members.slice(0, 3);
  const rest = members.slice(3);
  const totalLikes = members.reduce((sum, m) => sum + (m.likes_count ?? 0), 0);
  const topMember = members[0];
  const tickerSource = members.slice(0, Math.min(members.length, 10));

  return (
    <div className="relative min-h-screen w-full bg-[#08090B] font-sans text-[#EDEAE2]">
      {/* Ambient grain — the one texture flourish, kept very quiet */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      />

      {/* Ticker tape — a fixed LIVE marker plus live standings scrolling */}
      {tickerSource.length > 0 && (
        <div className="relative z-10 flex items-center overflow-hidden border-b border-[#1A1B1E] bg-[#0B0C0D] py-2.5 pl-4">
          <span className="mr-4 flex shrink-0 items-center gap-2 border-r border-[#1A1B1E] pr-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#E1483F]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E1483F] opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E1483F]" />
            </span>
            Live
          </span>

          <div
            className="roster-ticker-track flex w-max items-center gap-10 whitespace-nowrap font-mono text-[11px] tracking-[0.15em] text-[#6E7075]"
            aria-hidden="true"
          >
            {[...tickerSource, ...tickerSource].map((m, i) => {
              const info = getRoleBadge(m.role);
              return (
                <span key={i} className="flex items-center gap-2.5">
                  <TrendingUp className="h-3 w-3 text-[#C9A227]" />
                  <span className={info.text}>{info.label.toUpperCase()}</span>
                  <span className="text-[#EDEAE2]">
                    {m.display_name || "Anonymous Fan"}
                  </span>
                  <span>{m.likes_count ?? 0} Likes</span>
                  <span className="text-[#3A3B3F]">/</span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
        {/* Header */}
        <header className="mb-16 flex flex-col gap-8 border-b border-[#1A1B1E] pb-10 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.35em] text-[#6E7075]">
              Club Roster &amp; Leaderboard
            </span>
            <h1
              className="text-5xl italic leading-[0.95] sm:text-7xl"
              style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
            >
              The <span className="not-italic font-normal text-[#4C4E52]">Community</span>
            </h1>
          </div>

          <dl className="flex gap-8 font-mono text-xs text-[#6E7075] sm:gap-12">
            <div>
              <dt className="uppercase tracking-[0.2em]">Members</dt>
              <dd className="mt-1 text-2xl tabular-nums text-[#EDEAE2]">
                {members.length}
              </dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.2em]">Likes Logged</dt>
              <dd className="mt-1 text-2xl tabular-nums text-[#E1483F]">
                {totalLikes}
              </dd>
            </div>
            <div className="max-w-[10rem]">
              <dt className="uppercase tracking-[0.2em]">Most Loved</dt>
              <dd className="mt-1 truncate text-2xl text-[#C9A227]">
                {topMember?.display_name || "—"}
              </dd>
            </div>
          </dl>
        </header>

        {/* Empty state */}
        {members.length === 0 ? (
          <div className="border border-dashed border-[#232428] py-24 text-center">
            <h3 className="mb-2 text-xl font-light text-[#8B8D93]">
              No Entries On The Ledger
            </h3>
            <p className="font-mono text-xs uppercase tracking-wider text-[#5C5E63]">
              Be the first to create a profile and claim rank one.
            </p>
          </div>
        ) : (
          <>
            {/* Podium — top 3, bottom-aligned so rank 1 stands tallest */}
            <ul
              className="mb-5 grid grid-cols-1 items-end gap-4 md:grid-cols-3 md:gap-5"
              aria-label="Top ranked members"
            >
              {podium.map((member, idx) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  rank={idx + 1}
                  currentUserId={user?.id}
                  isAuthenticated={!!user}
                  onToggleLike={handleLike}
                />
              ))}
            </ul>

            {/* Everyone else — same card, uniform grid */}
            {rest.length > 0 && (
              <ul
                className="grid grid-cols-1 gap-4 border-t border-[#1A1B1E] pt-10 md:grid-cols-2 md:gap-5 md:pt-12 lg:grid-cols-3 xl:grid-cols-4"
                aria-label="Full roster"
              >
                {rest.map((member, idx) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    rank={idx + 4}
                    currentUserId={user?.id}
                    isAuthenticated={!!user}
                    onToggleLike={handleLike}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,500&display=swap');

        .roster-ticker-track {
          animation: roster-ticker 34s linear infinite;
        }
        @keyframes roster-ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .roster-card-in {
          animation: roster-card-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes roster-card-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .roster-ticker-track,
          .roster-card-in {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}