'use client'

const events = [
  {
    year: '2020',
    title: 'The Beginning',
    text: 'A bunch of school friends decided to stop only arguing about cricket and actually play.',
    emoji: '🏏',
    color: 'bg-[#FFD93D]',
    rotate: '-rotate-2',
  },
  {
    year: '2022',
    title: 'The Chaos Begins',
    text: 'Friendly matches became serious battles. Rivalries were born. Sledging became a tradition.',
    emoji: '🔥',
    color: 'bg-[#FF7A00]',
    rotate: 'rotate-2',
  },
  {
    year: '2025',
    title: 'Season 6',
    text: 'More teams, more drama, more memories. PPL became bigger than anyone imagined.',
    emoji: '🏆',
    color: 'bg-[#72E06A]',
    rotate: '-rotate-1',
  },
]

const legendaryMoments = [
  {
    text: '⚡ Match-fixing allegations',
    color: 'bg-[#FF5D73]',
  },
  {
    text: '🌧 Rain interrupted matches',
    color: 'bg-[#4F7CFF]',
  },
  {
    text: '🏆 MVP awards',
    color: 'bg-[#FFD93D]',
  },
]

export default function Timeline() {
  return (
    <section className="relative px-6 py-20">
      {/* Heading Sticker */}

      <div className="mx-auto max-w-xl">
        <div
          className="
          inline-block
          rounded-xl
          border-4
          border-black
          bg-[#FF7A00]
          px-5
          py-3
          text-sm
          font-black
          uppercase
          shadow-[5px_5px_0_#111]
          rotate-2
        "
        >
          Our Story
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
          From Gallis
          <br />
          <span
            className="
            inline-block
            bg-black
            px-3
            text-[#FFF8DC]
            -rotate-2
          "
          >
            To Glory
          </span>
        </h2>

        <p
          className="
          mt-8
          text-lg
          font-bold
          leading-relaxed
        "
        >
          What started as a friendly neighbourhood tournament slowly transformed into an annual
          festival of chaos, charisma and cricket.
        </p>
      </div>

      {/* Timeline */}

      <div
        className="
        relative
        mx-auto
        mt-16
        max-w-xl
      "
      >
        {/* Vertical Line */}

        <div
          className="
          absolute
          left-5
          top-0
          h-full
          w-1
          bg-black
        "
        />

        <div className="space-y-12">
          {events.map((event) => (
            <div
              key={event.year}
              className="
              relative
              flex
              gap-6
            "
            >
              {/* Dot */}

              <div
                className="
                relative
                z-10
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border-4
                border-black
                bg-white
                text-xl
              "
              >
                {event.emoji}
              </div>

              {/* Card */}

              <div
                className={`
                flex-1
                rounded-3xl
                border-4
                border-black
                ${event.color}
                p-5
                shadow-[7px_7px_0_#111]
                ${event.rotate}
              `}
              >
                <div
                  className="
                  inline-block
                  rounded-lg
                  border-2
                  border-black
                  bg-white
                  px-3
                  py-1
                  text-sm
                  font-black
                "
                >
                  {event.year}
                </div>

                <h3
                  className="
                  mt-4
                  text-2xl
                  font-black
                  uppercase
                "
                >
                  {event.title}
                </h3>

                <p
                  className="
                  mt-3
                  font-bold
                  leading-relaxed
                "
                >
                  {event.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legendary Moments */}

      <div className="mx-auto mt-24 max-w-xl">
        <h3
          className="
          text-3xl
          font-black
          uppercase
        "
        >
          Things that made PPL AWESOME...
        </h3>

        <div className="mt-8 space-y-5">
          {legendaryMoments.map((item, index) => (
            <div
              key={item.text}
              className={`
              rounded-2xl
              border-4
              border-black
              ${item.color}
              px-5
              py-5
              text-lg
              font-black
              shadow-[6px_6px_0_#111]
              ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}
            `}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
