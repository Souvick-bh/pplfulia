"use client";
import { FaSquareXTwitter, FaGithub, FaInstagram } from "react-icons/fa6";

export default function About() {

  return (
    <div className="bg-[#000000] text-[#ffffff] min-h-screen flex flex-col justify-between">
      {/* Main Content Container */}
      <div className="w-full max-w-4xl mx-auto px-6 pt-10 lg:pt-20">
        
        {/* Intro */}
        <div className="text-lg lg:text-2xl">
          What happens when a group of high school friends, some with cricketing talent and most with too much free time, decide to start something epic?{" "}
          <span className="text-[#ea5e00]">Panchayet Premiere League</span> happens.
        </div>

        {/* Main Section */}
        <div className="mt-12 flex flex-col gap-10">
          <div>
            <h1 className="text-2xl lg:text-3xl text-shadow-lg/30 text-shadow-[#ea5e00] text-center font-bold">
              From Gallis to Glory
            </h1>
            <div className="text-lg lg:text-2xl mt-6">
              What started as a friendly neighborhood tournament quickly turned into an annual festival of chaos, charisma, and cricket. We have had:
              <div className="flex flex-col items-center mt-6 text-[#ea5e00] font-medium gap-1">
                <div>Match-fixing allegations</div>
                <div>Rain-interrupted matches</div>
                <div>MVP awards</div>
              </div>
            </div>
            <div className="text-lg lg:text-2xl mt-6">
              And guess what? We are not just still going — we are growing! This year marks our{" "}
              <span className="text-[#ea5e00]">6th Season</span>, and the spirit is crazier than ever. More teams, more sledging, and hopefully, fewer torn ligaments.
            </div>
          </div>

          <div className="text-xl lg:text-3xl mt-6">
            We are now building this website to preserve those memories, honor those classic moments, and give our beloved league the stage it deserves. Because one day, we will look back at this and say:{" "}
            <span className="text-[#ea5e00]">Remember when we thought we were IPL stars?</span>
          </div>

          <div className="text-xl lg:text-3xl mt-6 mb-16">
            Browse through old photos, match reports, bloopers, and the drama that only true PPL fans understand. Whether you are one of us or just here to laugh at us — Welcome to Panchayet Premiere League. Where friendship meets fierce competition...
          </div>
        </div>

        {/* Developer Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-lg md:text-2xl pb-20 pt-10 ">
          <span className="text-zinc-400">The Dev : Souvick Bhowmick</span>
          <div className="flex flex-row items-center gap-5">
            <a href="https://x.com/SouvickBho17054" target="_blank" rel="noreferrer">
              <FaSquareXTwitter className="cursor-pointer text-amber-50 hover:text-[#ea5e00] transition-colors" />
            </a>
            <a href="https://github.com/Souvick-bh" target="_blank" rel="noreferrer">
              <FaGithub className="cursor-pointer text-amber-50 hover:text-[#ea5e00] transition-colors" />
            </a>
            <a href="https://www.instagram.com/__souvick_bhowmick__/" target="_blank" rel="noreferrer">
              <FaInstagram className="cursor-pointer text-amber-50 hover:text-[#ea5e00] transition-colors" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}