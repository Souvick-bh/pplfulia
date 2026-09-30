import HistoryFramer from '../Components/HistoryFramer'

export default function HomeContent() {
  return (
    <main
      className="
      min-h-screen
      w-full
      bg-[#f5f0e8]
      px-4
      py-12
      "
    >
      <section
        className="
        mx-auto
        flex
        max-w-6xl
        flex-col
        items-center
        gap-10
        "
      >
        {/* Video */}

        <div
          className="
          w-full
          border-4
          border-black
          bg-black
          shadow-[10px_10px_0_black]

          "
        >
          <video
            src="/videos/ppl.mp4"

            autoPlay
            muted
            loop
            preload="auto"
            playsInline

            className="
            block
            h-auto
            w-full
            object-cover
            "
          />
        </div>

        {/* Story */}

        <div
          className="
          w-full
          border-4
          border-black

          bg-yellow-300

          p-6
          md:p-10

          shadow-[8px_8px_0_black]

          "
        >
          <p
            className="
            max-w-5xl

            text-left
            text-3xl
            md:text-5xl

            font-black

            uppercase

            leading-[1.05]

            tracking-tight
            "
          >
            Wanna watch how a bunch of friends started their own cricket league to keep nostalgic
            memories alive?
          </p>

          <div
            className="
            mt-6

            border-t-4
            border-black

            pt-4

            font-mono
            text-sm
            font-bold
            uppercase
            "
          >
            A story of friendship • cricket • memories
          </div>
        </div>

        {/* Timeline */}

        <div
          className="
          w-full
          border-t-4
          border-black
          pt-10
          "
        >
          <HistoryFramer />
        </div>
      </section>
    </main>
  )
}
