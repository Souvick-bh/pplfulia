"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
    const pathname = usePathname();
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const sidebarItems = [
        { name: "Home", path: "/" },
        { name: "Members", path: "/members" },
        { name: "Blogs", path: "/seasons" },
        { name: "Gallery", path: "/gallery" },
        { name: "About", path: "/about" },
    ];

    return (
        <nav className="mt-12 ml-6 flex flex-col space-y-2 text-white">
            {sidebarItems.map((item, index) => {
                const isCurrentRoute = pathname === item.path;
                // Highlight if hovered OR if it's the current route (when nothing else is hovered)
                const isHighlighted =
                    hoverIndex !== null
                        ? hoverIndex === index
                        : isCurrentRoute;

                return (
                    <div
                        key={item.path}
                        className="relative"
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                    >
                        {/* Accent Indicator Line */}
                        <span
                            className={`
                                absolute left-0 top-1/2 h-8 w-[3px]
                                -translate-y-1/2 rounded-r-full bg-red-600
                                origin-center transition-all duration-300 ease-out
                                ${
                                    isHighlighted
                                        ? "scale-y-100 opacity-100 shadow-[0_0_12px_rgba(220,38,38,0.8)]"
                                        : "scale-y-0 opacity-0"
                                }
                            `}
                        />

                        <Link
                            href={item.path}
                            className="group flex items-center py-2.5 pl-5 rounded-xl transition-all duration-200 active:scale-98"
                        >
                            <span
                                className={`
                                    text-2xl md:text-3xl font-light
                                    transition-all duration-300 ease-out
                                    ${
                                        isHighlighted
                                            ? "translate-x-2 text-white font-normal tracking-wider opacity-100"
                                            : "translate-x-0 text-neutral-400 tracking-normal opacity-70"
                                    }
                                `}
                            >
                                {item.name}
                            </span>
                        </Link>
                    </div>
                );
            })}
        </nav>
    );
}