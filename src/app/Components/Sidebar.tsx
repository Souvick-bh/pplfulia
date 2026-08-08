"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Icons kept for future use
    const sidebarItems = [
        { name: "Home", path: "/" },
        { name: "Members", path: "/members" },
        { name: "Blogs", path: "/seasons" },
        { name: "Gallery", path: "/gallery" },
        { name: "About", path: "/about" },
    ];

    return (
        <nav className="mt-12 ml-6 flex flex-col space-y-2 text-white">
            {sidebarItems.map((item, index) => (
                <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                >
                    {/* Left accent line */}
                    <span
                        className={`
                            absolute left-0 top-1/2 h-7 w-[2px]
                            -translate-y-1/2 bg-white
                            origin-center transition-all duration-300
                            ${
                                activeIndex === index
                                    ? "scale-y-100 opacity-100"
                                    : "scale-y-0 opacity-0"
                            }
                        `}
                    />

                    <Link
                        href={item.path}
                        className="group flex items-center py-2 pl-3"
                    >
                        <span
                            className={`
                                text-2xl md:text-3xl
                                font-light
                                transition-all duration-300 ease-out
                                ${
                                    activeIndex === index
                                        ? "translate-x-2 opacity-100 tracking-wider"
                                        : "translate-x-0 opacity-75 tracking-normal"
                                }
                            `}
                        >
                            {item.name}
                        </span>
                    </Link>
                </div>
            ))}
        </nav>
    );
}