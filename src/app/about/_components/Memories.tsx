"use client";


const memories = [
    {
        emoji: "📸",
        title: "Photos",
        text: "Every celebration, every victory pose, every funny moment.",
        color: "bg-[#FFD93D]",
        rotate: "-rotate-2",
    },
    {
        emoji: "📖",
        title: "Stories",
        text: "Match reports, rivalries and legendary incidents.",
        color: "bg-[#72E06A]",
        rotate: "rotate-2",
    },
    {
        emoji: "😂",
        title: "Bloopers",
        text: "Because mistakes sometimes become the best memories.",
        color: "bg-[#FF5D73]",
        rotate: "-rotate-1",
    },
    {
        emoji: "🏆",
        title: "Records",
        text: "Winners, MVPs and moments worth remembering.",
        color: "bg-[#4F7CFF]",
        rotate: "rotate-1",
    },
];


export default function Memories() {

    return (

        <section className="px-6 py-20">


            <div className="mx-auto max-w-xl">



                {/* Heading */}


                <div
                    className="
inline-block
rounded-xl
border-4
border-black
bg-[#72E06A]
px-5
py-2
font-black
uppercase
shadow-[5px_5px_0_#111]
rotate-2
"
                >
                    Why this website?
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
                    Because
                    <br />

                    <span
                        className="
bg-black
px-3
text-[#FFF8DC]
"
                    >
                        memories
                    </span>

                    <br />

                    should stay.
                </h2>




                <p
                    className="
mt-8
text-lg
font-bold
leading-relaxed
"
                >
                    Years pass, players change, but the stories
                    remain. This website is our little digital
                    stadium where every PPL memory gets a place.
                </p>





                {/* Memory Grid */}


                <div
                    className="
mt-14
grid
grid-cols-1
gap-8
"
                >


                    {
                        memories.map((item) => (

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


                                <div
                                    className="
text-5xl
"
                                >
                                    {item.emoji}
                                </div>



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
mt-3
font-bold
leading-relaxed
"
                                >
                                    {item.text}
                                </p>


                            </div>

                        ))
                    }



                </div>



            </div>






            {/* Quote Poster */}


            <div
                className="
mx-auto
mt-32
max-w-xl
"
            >


                <div
                    className="
relative
"
                >


                    {/* Shadow Layer */}

                    <div
                        className="
absolute
inset-0
translate-x-3
translate-y-3
rounded-[2.5rem]
bg-black
"
                    />



                    <div
                        className="
relative

rounded-[2.5rem]

border-4
border-black

bg-[#FF7A00]

px-8
py-12

text-center

"
                    >


                        <div
                            className="
text-6xl
"
                        >
                            🏏
                        </div>



                        <p
                            className="
mt-8

text-4xl

font-black

uppercase

leading-tight
"
                        >

                            "Remember when
                            <br />

                            we thought

                            <br />

                            we were IPL stars?"

                        </p>



                        <div
                            className="
mt-8

inline-block

rounded-xl

border-4
border-black

bg-white

px-5
py-3

text-xl

font-black

shadow-[4px_4px_0_#111]
"
                        >
                            😂 Still do.
                        </div>



                    </div>


                </div>



            </div>





        </section>

    )

}