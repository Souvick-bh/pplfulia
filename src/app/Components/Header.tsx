"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [kdg, setKdg] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Members", path: "/members" },
    { name: "Blogs", path: "/seasons" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-neutral-950/70 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Interactive KDG Switch */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setKdg((prev) => !prev)}
            className={`rounded-3xl border-2 border-neutral-700 px-4 py-1 text-sm font-semibold tracking-wide transition-all duration-300 hover:cursor-pointer hover:border-neutral-500 active:scale-95 ${
              kdg
                ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                : "bg-neutral-900 text-white"
            }`}
          >
            KDG
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item, index) => {
            const isCurrentRoute = pathname === item.path;
            const isHighlighted =
              hoverIndex !== null ? hoverIndex === index : isCurrentRoute;

            return (
              <div
                key={item.path}
                className="relative px-3 py-2"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <Link
                  href={item.path}
                  className="group flex items-center transition-all duration-200 active:scale-95"
                >
                  <span
                    className={`text-base font-light transition-all duration-300 ease-out ${
                      isHighlighted
                        ? "-translate-y-0.5 text-white font-normal tracking-wider opacity-100"
                        : "translate-y-0 text-neutral-400 tracking-normal opacity-70"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>

                {/* Horizontal Red Accent Line Indicator */}
                <span
                  className={`absolute bottom-0 left-1/2 h-[3px] -translate-x-1/2 rounded-t-full bg-red-600 transition-all duration-300 ease-out ${
                    isHighlighted
                      ? "w-8 opacity-100 shadow-[0_0_12px_rgba(220,38,38,0.8)]"
                      : "w-0 opacity-0"
                  }`}
                />
              </div>
            );
          })}
        </nav>

        {/* User Profile Button & Mobile Navigation Button */}
        <div className="flex items-center space-x-3">
          <Link href="/auth" className="group">
            <button className="relative flex items-center justify-center rounded-full border-2 border-neutral-700 bg-neutral-800 p-0.5 transition-all duration-300 group-hover:border-red-600 group-hover:shadow-[0_0_12px_rgba(220,38,38,0.5)] active:scale-95">
              <img
                className="h-9 w-9 rounded-full object-cover"
                src="/icons/membermonkey.jpg"
                alt="User Avatar"
              />
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="rounded-lg p-2 text-neutral-400 hover:text-white md:hidden"
            aria-label="Toggle Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="border-t border-neutral-800 bg-neutral-950 px-6 py-4 md:hidden">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isCurrentRoute = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-lg transition-all ${
                    isCurrentRoute
                      ? "bg-neutral-900 font-medium text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <span>{item.name}</span>
                  {isCurrentRoute && (
                    <span className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}