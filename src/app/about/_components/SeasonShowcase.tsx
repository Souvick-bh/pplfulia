'use client'

const chaos = [
  {
    emoji: '⚡',
    title: 'Match Drama',
    text: 'Every season had controversies, arguments and legendary decisions.',
    color: 'bg-[#FF5D73]',
    rotate: 'rotate-2',
  },
  {
    emoji: '🌧',
    title: 'Rain Chaos',
    text: 'The weather had its own plans. Matches stopped, excuses started.',
    color: 'bg-[#4F7CFF]',
    rotate: '-rotate-2',
  },
  {
    emoji: '😤',
    title: 'Sledging Wars',
    text: 'Friendship lasted until someone got out for a duck.',
    color: 'bg-[#FFD93D]',
    rotate: 'rotate-1',
  },
  {
    emoji: '🏆',
    title: 'MVP Moments',
    text: 'Heroes were created. Legends were debated.',
    color: 'bg-[#72E06A]',
    rotate: '-rotate-1',
  },
  {
    emoji: '😂',
    title: 'Bloopers',
    text: 'Some moments were better than the actual matches.',
    color: 'bg-[#FF7A00]',
    rotate: 'rotate-2',
  },
  {
    emoji: '❤️',
    title: 'Friendship',
    text: 'The real trophy was the memories we created.',
    color: 'bg-white',
    rotate: '-rotate-2',
  },
]

export default function SeasonShowcase() {
  return (
    <section className="px-6 py-20">
      {/* Chaos Heading */}

      <div className="mx-auto max-w-xl">
        <div
          className="
          inline-block
          rounded-xl
          border-4
          border-black
          bg-[#4F7CFF]
          px-5
          py-2
          font-black
          uppercase
          shadow-[5px_5px_0_#111]
          -rotate-2
        "
        >
          The Chaos
        </div>

        <h2
          className="
          mt-8
          text-5xl
          font-black
          uppercase
          leading-none
        "
        >
          Things that made
          <br />
          <span
            className="
            bg-[#FF7A00]
            px-3
            shadow-[5px_5px_0_#111]
          "
          >
            PPL Legendary
          </span>
        </h2>
      </div>

      {/* Chaos Grid */}

      <div
        className="
        mx-auto
        mt-14
        grid
        max-w-xl
        grid-cols-1
        gap-8
      "
      >
        {chaos.map((item) => (
          <div
            key={item.title}
            className={`
              ${item.color}
              ${item.rotate}
              rounded-3xl
              border-4
              border-black
              p-6
              shadow-[8px_8px_0_#111]
            `}
          >
            <div className="text-5xl">{item.emoji}</div>

            <h3
              className="
              mt-5
              text-3xl
              font-black
              uppercase
            "
            >
              {item.title}
            </h3>

            <p
              className="
              mt-4
              font-bold
              leading-relaxed
            "
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Season Showcase */}

      <div
        className="
        relative
        mx-auto
        mt-32
        max-w-xl
      "
      >
        {/* Background Shape */}

        <div
          className="
          absolute
          inset-0
          translate-x-3
          translate-y-3
          rounded-[3rem]
          bg-black
        "
        />

        <div
          className="
          relative
          rounded-[3rem]
          border-4
          border-black
          bg-[#FFD93D]
          px-8
          py-12
          text-center
        "
        >
          <p
            className="
            text-sm
            font-black
            uppercase
            tracking-[0.4em]
          "
          >
            Still going strong
          </p>

          <div
            className="
            mt-5
            text-[180px]
            font-black
            leading-none
            text-[#FF7A00]
            drop-shadow-[8px_8px_0_#111]
          "
          >
            6
          </div>

          <h3
            className="
            text-4xl
            font-black
            uppercase
          "
          >
            Seasons
          </h3>

          <p
            className="
            mt-8
            text-xl
            font-bold
            leading-relaxed
          "
          >
            Six seasons of cricket, chaos, friendships, rivalries and unforgettable memories.
          </p>

          {/* Mini Stats */}

          <div
            className="
            mt-10
            grid
            grid-cols-3
            gap-3
          "
          >
            <div
              className="
              rounded-xl
              border-4
              border-black
              bg-white
              p-3
              font-black
            "
            >
              🏏
              <br />
              Matches
            </div>

            <div
              className="
              rounded-xl
              border-4
              border-black
              bg-[#72E06A]
              p-3
              font-black
            "
            >
              🏆
              <br />
              Winners
            </div>

            <div
              className="
              rounded-xl
              border-4
              border-black
              bg-[#FF5D73]
              p-3
              font-black
            "
            >
              😂
              <br />
              Stories
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
