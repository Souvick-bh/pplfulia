"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const history = [
    {
        title: "Kasukabe Defence Group",
        date: "21 March 2020",
        description: "The beginning of the community and foundation.",
        tag: "Inception",
    },
    {
        title: "PPL Season 1",
        date: "22 October 2020",
        description: "Inaugural league launch with 3 teams.",
        tag: "League",
    },
    {
        title: "PPL Season 2",
        date: "11 October 2021",
        description: "Expanded format and live community streams.",
        tag: "Major Event",
    },
    {
        title: "PPL Season 3",
        date: "1 October 2022",
        description: "Record prize pool and international reach.",
        tag: "Milestone",
    },
    {
        title: "PPL Season 4",
        date: "20 October 2023",
        description: "Introduced double-elimination bracket system.",
        tag: "Tournament",
    },
    {
        title: "PPL Season 5",
        date: "9 October 2024",
        description: "The biggest competitive season to date.",
        tag: "Current Era",
    },
];

export default function HistoryFramer() {
    const [showHistory, setShowHistory] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollToNode = (index: number) => {
        setActiveIndex(index);
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = 294; // Compact card width (270px) + gap (24px)
            container.scrollTo({
                left: index * cardWidth,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="flex flex-col items-center py-6 w-full max-w-6xl mx-auto px-4 overflow-hidden">
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowHistory((prev) => !prev)}
                className="group relative flex items-center gap-2.5 rounded-full border border-neutral-800 bg-neutral-950/90 px-6 py-2.5 text-xl font-light text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:border-red-600 hover:shadow-red-950/40"
            >
                <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent font-normal">
                    Timeline & History
                </span>
                <motion.span
                    animate={{ rotate: showHistory ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "backOut" }}
                    className="text-red-500 text-lg"
                >
                    ↓
                </motion.span>
            </motion.button>

            {/* Horizontal Timeline Container */}
            <AnimatePresence>
                {showHistory && (
                    <motion.div
                        initial={{ opacity: 0, y: -12, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -12, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full mt-8"
                    >
                        {/* Compact Progress Nav Bar */}
                        <div className="flex items-center justify-center gap-1.5 mb-6">
                            {history.map((item, idx) => (
                                <button
                                    key={item.title}
                                    onClick={() => scrollToNode(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        activeIndex === idx
                                            ? "w-6 bg-red-600 shadow-md shadow-red-600/50"
                                            : "w-1.5 bg-neutral-800 hover:bg-neutral-600"
                                    }`}
                                    aria-label={`Go to ${item.title}`}
                                />
                            ))}
                        </div>

                        <div className="relative py-2">
                            {/* Horizontal Line backdrop */}
                            <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-red-900/30 to-transparent" />

                            {/* Scrollable track */}
                            <div
                                ref={scrollContainerRef}
                                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none px-8 py-3 cursor-grab active:cursor-grabbing"
                                style={{ scrollbarWidth: "none" }}
                            >
                                {history.map((item, index) => {
                                    const isActive = activeIndex === index;

                                    return (
                                        <motion.div
                                            key={item.title}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.04 }}
                                            onClick={() => setActiveIndex(index)}
                                            className="snap-center shrink-0 w-[260px] md:w-[270px]"
                                        >
                                            <div
                                                className={`group relative rounded-xl border p-4 backdrop-blur-xl transition-all duration-300 ${
                                                    isActive
                                                        ? "border-red-600/80 bg-neutral-900/95 shadow-xl shadow-red-950/50 -translate-y-1"
                                                        : "border-neutral-800/90 bg-neutral-950/80 hover:border-red-900/50 hover:bg-neutral-900/60"
                                                }`}
                                            >
                                                {/* Header: Index & Date */}
                                                <div className="flex items-center justify-between gap-2 mb-2">
                                                    <span className="text-xs font-mono font-bold text-red-400 bg-red-950/60 border border-red-800/40 px-2 py-0.5 rounded">
                                                        #{String(index + 1).padStart(2, "0")}
                                                    </span>
                                                    <span className="text-xs font-mono text-neutral-400">
                                                        {item.date}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-md font-medium text-white group-hover:text-red-200 transition-colors line-clamp-1">
                                                    {item.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="mt-1 text-md text-neutral-400 leading-snug line-clamp-2">
                                                    {item.description || "Key community development phase."}
                                                </p>

                                                {/* Footer: Tag & Indicator */}
                                                <div className="mt-3 pt-2 border-t border-neutral-800/60 flex items-center justify-between">
                                                    <span className="text-[10px] uppercase font-mono tracking-wider text-red-400/90">
                                                        {item.tag || "Milestone"}
                                                    </span>
                                                    <div
                                                        className={`h-1.5 w-1.5 rounded-full ${
                                                            isActive
                                                                ? "bg-red-500 animate-pulse"
                                                                : "bg-neutral-700"
                                                        }`}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}