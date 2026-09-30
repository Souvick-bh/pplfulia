'use client'

import { useAuth } from '../contexts/AuthContext'
import { useMembers } from '../hooks/useMembers'
import { Award, Crown, Heart, TrendingUp } from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Member = {
  id: string
  user_id: string
  display_name: string | null
  avatar_url?: string | null
  bio?: string | null
  achievements?: string | null
  role?: string
  likes_count?: number
  is_liked_by_user?: boolean
  created_at: string
}

type RoleKey = 'owner' | 'player' | 'member'

type RoleStyle = {
  label: string
  icon: string
  text: string
  border: string
  bg: string
  glow: string
}

type ToggleLike = (targetUserId: string, currentlyLiked: boolean) => void
const SIGNAL = '#FF3B30'

const ROLE_STYLES: Record<RoleKey, RoleStyle> = {
  owner: {
    label: 'OWNER',
    icon: '/icons/richmonkey.jpg',
    text: 'text-black',
    border: 'border-black',
    bg: 'bg-yellow-300',
    glow: '',
  },

  player: {
    label: 'PLAYER',
    icon: '/icons/playermonkey.jpg',
    text: 'text-black',
    border: 'border-black',
    bg: 'bg-green-300',
    glow: '',
  },

  member: {
    label: 'MEMBER',
    icon: '/icons/membermonkey.jpg',
    text: 'text-black',
    border: 'border-black',
    bg: 'bg-blue-300',
    glow: '',
  },
}

function getRoleBadge(role?: string): RoleStyle {
  const key = (role?.toLowerCase() ?? 'member') as RoleKey
  return ROLE_STYLES[key] ?? ROLE_STYLES.member
}

function formatJoined(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function MemberCard({
  member,
  rank,
  currentUserId,
  isAuthenticated,
  onToggleLike,
}: {
  member: Member
  rank: number
  currentUserId?: string
  isAuthenticated: boolean
  onToggleLike: ToggleLike
}) {
  const roleInfo = getRoleBadge(member.role)
  const liked = member.is_liked_by_user ?? false
  const canLike = isAuthenticated && currentUserId !== member.user_id
  const isPodium = rank <= 3

  const orderClass = isPodium
    ? rank === 1
      ? 'md:order-2'
      : rank === 2
        ? 'md:order-1'
        : 'md:order-3'
    : ''
  const stepClass = isPodium
    ? rank === 1
      ? 'md:pb-8 md:-translate-y-2'
      : rank === 2
        ? 'md:pb-3'
        : 'md:pb-1 md:translate-y-1'
    : ''
  const avatarClass = isPodium ? 'h-14 w-14' : 'h-10 w-10'
  const rankNumClass = isPodium ? 'text-2xl' : 'text-lg'

  return (
    <li
      className="
  group
  relative
  flex
  flex-col
  justify-between
  bg-white
  border-4
  border-black
  p-5
  shadow-[8px_8px_0_#000]
  transition-all
  duration-200
  hover:-translate-y-1
  hover:shadow-[12px_12px_0_#000]
  "
    >
      <div>
        <div className="flex items-center gap-4">
          <div
            className="
h-16
w-16
border-4
border-black
bg-yellow-200
overflow-hidden
"
          >
            {member.avatar_url ? (
              <img
                src={member.avatar_url}
                alt=""
                className="
h-full
w-full
object-cover
"
              />
            ) : (
              <div
                className="
flex
h-full
items-center
justify-center
font-black
text-2xl
"
              >
                {member.display_name?.[0] ?? '?'}
              </div>
            )}
          </div>

          <div>
            <h3
              className="
text-xl
font-black
uppercase
tracking-tight
"
            >
              {member.display_name || 'Anonymous'}
            </h3>

            <div
              className={`
inline-flex
items-center
gap-2
mt-2
px-2
py-1
border-2
border-black
font-black
text-xs
uppercase
${roleInfo.bg}
`}
            >
              <img src={roleInfo.icon} className="h-4 w-4" />

              {roleInfo.label}
            </div>
          </div>
        </div>

        {member.bio ? (
          <p
            className="
mt-5
font-medium
text-sm
leading-relaxed
"
          >
            {member.bio}
          </p>
        ) : (
          <p
            className="
mt-5
italic
text-gray-500
"
          >
            No bio.
          </p>
        )}

        {member.achievements && (
          <div
            className="
mt-4
border-l-4
border-black
pl-3
font-bold
text-sm
"
          >
            🏆 {member.achievements}
          </div>
        )}
      </div>

      <div
        className="
mt-6
flex
items-center
justify-between
border-t-4
border-black
pt-4
"
      >
        <div
          className="
font-black
uppercase
text-sm
"
        >
          ❤️ {member.likes_count ?? 0}
        </div>

        {canLike && (
          <button
            onClick={() => onToggleLike(member.user_id, liked)}

            className={`
border-4
border-black
px-4
py-2
font-black
uppercase
text-xs
transition
active:translate-x-1
active:translate-y-1

${liked ? 'bg-red-400' : 'bg-white hover:bg-yellow-300'}

`}
          >
            {liked ? 'Liked' : 'Like'}
          </button>
        )}
      </div>
    </li>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Members() {
  const { members, loading, toggleLike } = useMembers()
  const { user } = useAuth()

  const handleLike: ToggleLike = (targetUserId, currentlyLiked) => {
    if (!user) return
    toggleLike(targetUserId, currentlyLiked)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#08090B] font-mono text-[#EDEAE2]">
        <div className="h-14 w-14 animate-spin rounded-full border border-[#232428] border-t-[#E1483F]" />
        <p className="mt-6 animate-pulse text-[11px] uppercase tracking-[0.35em] text-[#5C5E63]">
          Tallying The Roster
        </p>
      </div>
    )
  }

  const podium = members.slice(0, 3)
  const rest = members.slice(3)
  const totalLikes = members.reduce((sum, m) => sum + (m.likes_count ?? 0), 0)
  const topMember = members[0]
  const tickerSource = members.slice(0, Math.min(members.length, 10))

  return (
    <div
      className="
min-h-screen
bg-[#f5f0e8]
text-black
"
    >
      {/* Ambient grain — the one texture flourish, kept very quiet */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          mixBlendMode: 'overlay',
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
              const info = getRoleBadge(m.role)
              return (
                <span key={i} className="flex items-center gap-2.5">
                  <TrendingUp className="h-3 w-3 text-[#C9A227]" />
                  <span className={info.text}>{info.label.toUpperCase()}</span>
                  <span className="text-[#EDEAE2]">{m.display_name || 'Anonymous Fan'}</span>
                  <span>{m.likes_count ?? 0} Likes</span>
                  <span className="text-[#3A3B3F]">/</span>
                </span>
              )
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
              className="
              text-6xl
              md:text-8xl
              font-black
              uppercase
              tracking-tighter
              "
            >
              THE
              <br />
              COMMUNITY
            </h1>
          </div>

          <dl
            className="
            grid
            grid-cols-3
            gap-4
            "
          >
            <div
              className="
            border-4
            border-black
            bg-yellow-300
            p-4
            shadow-[5px_5px_0_black]
            "
            >
              <dt className="font-black text-xs">MEMBERS</dt>

              <dd className="text-4xl font-black">{members.length}</dd>
            </div>

            <div
              className="
            border-4
            border-black
            bg-red-300
            p-4
            shadow-[5px_5px_0_black]
            "
            >
              <dt className="font-black text-xs">LIKES</dt>

              <dd className="text-4xl font-black">{totalLikes}</dd>
            </div>
          </dl>
        </header>

        {/* Empty state */}
        {members.length === 0 ? (
          <div className="border border-dashed border-[#232428] py-24 text-center">
            <h3 className="mb-2 text-xl font-light text-[#8B8D93]">No Entries On The Ledger</h3>
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
  .roster-ticker-track {
    animation: roster-ticker 28s linear infinite;
  }

  @keyframes roster-ticker {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-50%);
    }
  }


  /* Brutalist card entrance */
  .roster-card-in {
    animation: brutal-card-in 0.35s ease-out both;
  }


  @keyframes brutal-card-in {
    from {
      opacity: 0;
      transform: translate(8px, 8px);
    }

    to {
      opacity: 1;
      transform: translate(0,0);
    }
  }


  /* Sharp hover movement */
  .roster-card-in:hover {
    transform: translate(-3px,-3px);
  }


  /* Remove animation for accessibility */
  @media (prefers-reduced-motion: reduce) {

    .roster-ticker-track,
    .roster-card-in {

      animation: none;
      transition: none;

    }

  }
`}</style>
    </div>
  )
}
