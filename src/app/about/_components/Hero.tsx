'use client'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-12 pb-20">
      {/* Floating Decorations */}

      {/* Top Left Star */}
      <div
        className="
        absolute
        left-5
        top-10
        text-5xl
        rotate-12
        animate-bounce
      "
      >
        ⭐
      </div>

      {/* Top Right Cricket Ball */}
      <div
        className="
          absolute
          right-5
          top-20
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          border-4
          border-black
          bg-[#FF5D73]
          text-3xl
          shadow-[5px_5px_0_#111]
          rotate-12
        "
      >
        🏏
      </div>

      {/* Bottom Left Sticker */}

      <div
        className="
          absolute
          left-4
          bottom-28
          rounded-xl
          border-4
          border-black
          bg-[#FFD93D]
          px-4
          py-2
          text-sm
          font-black
          uppercase
          shadow-[5px_5px_0_#111]
          -rotate-12
        "
      >
        Since 2020 🔥
      </div>

      {/* Bottom Right Sticker */}

      <div
        className="
          absolute
          right-4
          bottom-20
          rounded-xl
          border-4
          border-black
          bg-[#72E06A]
          px-4
          py-2
          font-black
          shadow-[5px_5px_0_#111]
          rotate-6
        "
      >
        Season 6 🏆
      </div>

      {/* Main Content */}

      <div className="mx-auto max-w-xl">
        {/* Label */}

        <div
          className="
            inline-block
            rounded-full
            border-4
            border-black
            bg-[#4F7CFF]
            px-5
            py-2
            text-sm
            font-black
            uppercase
            shadow-[4px_4px_0_#111]
            rotate-[-2deg]
          "
        >
          🏏 About PPL
        </div>

        {/* Main Heading */}

        <h1
          className="
            mt-10
            text-6xl
            font-black
            uppercase
            leading-[0.85]
            tracking-tight
            text-[#111]
            sm:text-7xl
          "
        >
          Panchayet
          <br />
          <span
            className="
              inline-block
              rounded-xl
              bg-[#FF7A00]
              px-3
              py-1
              shadow-[6px_6px_0_#111]
              rotate-[-2deg]
            "
          >
            Premiere
          </span>
          <br />
          League
        </h1>

        {/* Intro Card */}

        <div
          className="
            mt-12
            rounded-3xl
            border-4
            border-black
            bg-white
            p-6
            text-xl
            font-bold
            leading-relaxed
            shadow-[8px_8px_0_#111]
            rotate-1
          "
        >
          What happens when a bunch of high school friends, some cricket talent, and unlimited free
          time collide?
          <br />
          <br />
          <span
            className="
              inline-block
              rounded-lg
              bg-[#FFD93D]
              px-2
              py-1
              shadow-[3px_3px_0_#111]
            "
          >
            PPL happens.
          </span>
        </div>

        {/* Bottom Hero Message */}

        <div
          className="
            mt-14
            flex
            items-center
            justify-center
            gap-3
            text-center
            text-xl
            font-black
            uppercase
          "
        >
          <span className="text-4xl">🤝</span>

          <span>
            Friends.
            <br />
            Cricket.
            <br />
            Chaos.
          </span>

          <span className="text-4xl">🔥</span>
        </div>
      </div>

      {/* Decorative Lines */}

      <div
        className="
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          text-4xl
          font-black
          tracking-widest
        "
      >
        ✦ ✦ ✦
      </div>
    </section>
  )
}
