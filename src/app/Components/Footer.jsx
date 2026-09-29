"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  IoLogoYoutube,
  IoLogoInstagram,
  IoLogoFacebook,
} from "react-icons/io5";

const socials = [
  {
    name: "YouTube",
    href: "https://youtube.com/@pplfulia?si=NnMmQRHxSrm-vqpo",
    icon: IoLogoYoutube,
    bg: "bg-[#FF5D73]",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/pplfulia/profilecard/?igsh=MXNuaHNzaDlyaXB1dg==",
    icon: IoLogoInstagram,
    bg: "bg-[#FFD93D]",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61566263444046&mibextid=ZbWKwL",
    icon: IoLogoFacebook,
    bg: "bg-[#4F7CFF]",
  },
];

export default function Footer() {
   const [visits, setVisits] = useState(null);

  useEffect(() => {
    fetch("/api/visit")
      .then((res) => {
        if (!res.ok) throw new Error("API Error");

        return res.json();
      })

      .then((data) => {
        setVisits(data.visits);
      })

      .catch((err) => {
        console.error("Failed to fetch visits", err);
      });
  }, []);

  return (
    <footer
      className="
relative
bg-[#FFF8DC]
px-6
pt-20
pb-10
overflow-hidden
"
    >
      <div
        className="
mx-auto
max-w-5xl
"
      >
        {/* TITLE */}

        <div
          className="
text-center
"
        >
          <div
            className="
inline-block
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
            Follow PPL
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
            Stay
            <br />
            Connected
          </h2>

          <p
            className="
mt-5
font-bold
text-lg
"
          >
            More matches. More memories. More chaos.
          </p>
        </div>

        {/* SOCIAL CARDS */}

        <div
          className="
mt-14
flex
justify-center
gap-5
"
        >
          {socials.map((social, index) => {
            const Icon = social.icon;

            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                  rotate: index % 2 === 0 ? 3 : -3,
                }}
                className="
flex
flex-col
items-center
gap-3
"
              >
                <div
                  className={`
${social.bg}

h-16
w-16

flex
items-center
justify-center

border-4
border-black

rounded-2xl

shadow-[6px_6px_0_#111]

`}
                >
                  <Icon
                    className="
text-3xl
text-black
"
                  />
                </div>

                <span
                  className="
font-black
uppercase
text-sm
"
                >
                  {social.name}
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* VISITOR SCOREBOARD */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          className="
mx-auto
mt-16
max-w-xs

border-4
border-black

bg-black
text-white

p-6

shadow-[8px_8px_0_#FF7A00]

text-center

rotate-1
"
        >
          <p
            className="
font-mono
text-sm
uppercase
tracking-widest
text-[#FFD93D]
"
          >
            PPL Visitors
          </p>

          <div
            className="
mt-3
text-5xl
font-black
"
          >
            {visits !== null ? visits.toLocaleString() : "..."}
          </div>
        </motion.div>

        {/* COPYRIGHT */}

        <div
          className="
mt-16

border-t-4
border-black

pt-6

text-center

font-bold

uppercase

text-sm
"
        >
          © {new Date().getFullYear()} PPL Fulia
          <br />
          <span
            className="
text-[#FF7A00]
"
          >
            Where Friendship Meets Competition
          </span>
        </div>
      </div>
    </footer>
  );
}
