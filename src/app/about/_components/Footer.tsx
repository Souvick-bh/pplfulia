"use client";

import {
    FaSquareXTwitter,
    FaGithub,
    FaInstagram,
} from "react-icons/fa6";


const socials = [
    {
        icon: FaSquareXTwitter,
        name: "Twitter",
        link: "https://x.com/SouvickBho17054",
        color: "bg-[#111111]",
    },
    {
        icon: FaGithub,
        name: "Github",
        link: "https://github.com/Souvick-bh",
        color: "bg-[#4F7CFF]",
    },
    {
        icon: FaInstagram,
        name: "Instagram",
        link: "https://www.instagram.com/__souvick_bhowmick__/",
        color: "bg-[#FF5D73]",
    },
];


export default function Footer() {

    return (

        <section className="px-6 pb-16 pt-10">



            {/* Final CTA */}


            <div
                className="
mx-auto
max-w-xl
relative
"
            >


                {/* Black Shadow */}

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

px-6
py-12

text-center
"
                >


                    <div
                        className="
inline-block

rounded-full

border-4
border-black

bg-white

px-5
py-2

font-black

uppercase

shadow-[4px_4px_0_#111]
"
                    >
                        Welcome
                    </div>




                    <h2
                        className="
mt-8

text-6xl

font-black

uppercase

leading-[0.85]
"
                    >

                        Panchayet

                        <br />

                        <span
                            className="
text-[#FF7A00]
"
                        >
                            Premiere
                        </span>

                        <br />

                        League

                    </h2>




                    <p
                        className="
mt-8

text-xl

font-black

leading-relaxed
"
                    >
                        Where friendship meets
                        <br />
                        fierce competition.
                    </p>




                    <div
                        className="
mt-10

text-6xl
"
                    >
                        🏏🔥🏆
                    </div>



                </div>


            </div>








            {/* Developer Card */}


            <div
                className="
mx-auto

mt-24

max-w-xl
"
            >


                <div
                    className="
rounded-[2.5rem]

border-4

border-black

bg-white

p-8

shadow-[8px_8px_0_#111]

rotate-1
"
                >



                    <p
                        className="
text-center

text-sm

font-black

uppercase

tracking-[0.3em]

text-zinc-500
"
                    >
                        Built with ❤️ by
                    </p>




                    <h3
                        className="
mt-5

text-center

text-4xl

font-black

uppercase
"
                    >
                        Souvick
                        <br />
                        Bhowmick
                    </h3>




                    <p
                        className="
mt-4

text-center

font-bold

text-zinc-600
"
                    >
                        Designing memories,
                        one line of code at a time.
                    </p>





                    {/* Social Buttons */}


                    <div
                        className="
mt-8

flex

justify-center

gap-4
"
                    >


                        {
                            socials.map((social) => {

                                const Icon = social.icon;


                                return (

                                    <a

                                        key={social.name}

                                        href={social.link}

                                        target="_blank"

                                        rel="noreferrer"

                                        className={`
${social.color}

flex

h-14

w-14

items-center

justify-center

rounded-xl

border-4

border-black

text-2xl

text-white

shadow-[4px_4px_0_#111]

transition-all

hover:translate-x-1

hover:translate-y-1

hover:shadow-none
`}

                                    >

                                        <Icon />

                                    </a>

                                )

                            })

                        }


                    </div>




                </div>


            </div>







            {/* Bottom Decoration */}


            <div
                className="
mt-16

text-center

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