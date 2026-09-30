'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()

  const [hoverIndex, setHoverIndex] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Members', path: '/members' },
    { name: 'Seasons', path: '/seasons' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FFF7D6] border-b-4 border-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo / KDG Badge */}
        <Link href="/">
          <div
            className="
            flex items-center gap-2
            border-4 border-black
            bg-[#FF7A00]
            px-4 py-2
            font-black text-xl
            shadow-[5px_5px_0_#000]
            transition-all
            hover:-translate-y-1
            active:translate-x-1 active:translate-y-1
            active:shadow-none
          "
          >
            KDG
            <span className="text-2xl">🏏</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3">
          {navItems.map((item, index) => {
            const active = pathname === item.path

            const highlighted = hoverIndex !== null ? hoverIndex === index : active

            return (
              <div
                key={item.path}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(0)}
                className="relative"
              >
                <Link href={item.path}>
                  <div
                    className={`
                    relative
                    border-3 border-black
                    px-4 py-2
                    font-bold
                    transition-all duration-200

                    ${
                      highlighted
                        ? 'bg-[#FFD93D] -translate-y-1 shadow-[4px_4px_0_#000]'
                        : 'bg-white shadow-[3px_3px_0_#000]'
                    }

                    hover:-translate-y-1
                    hover:shadow-[4px_4px_0_#000]

                    active:translate-x-1
                    active:translate-y-1
                    active:shadow-none
                    `}
                  >
                    {item.name}

                    {active && (
                      <span
                        className="
                        absolute
                        -top-3
                        -right-3
                        rotate-12
                        bg-[#FF5D73]
                        border-2 border-black
                        px-2 py-0.5
                        text-xs
                        font-black
                      "
                      >
                        NOW
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            )
          })}
        </nav>

        {/* Profile + Mobile */}
        <div className="flex items-center gap-3">
          <Link href="/auth">
            <div
              className="
              border-4 border-black
              bg-[#6AA8FF]
              p-1
              shadow-[4px_4px_0_#000]
              hover:-translate-y-1
              transition-all
              "
            >
              <img
                src="/icons/membermonkey.jpg"
                alt="profile"
                className="
                h-9 w-9
                object-cover
                "
              />
            </div>
          </Link>

          {/* Mobile button */}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="
            md:hidden
            border-4 border-black
            bg-white
            p-2
            shadow-[3px_3px_0_#000]
            "
          >
            <div className="text-2xl font-black">{isMobileMenuOpen ? '×' : '☰'}</div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {isMobileMenuOpen && (
        <div
          className="
            md:hidden
            border-t-4 border-black
            bg-[#FFF7D6]
            px-5 py-5
            "
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const active = pathname === item.path

              return (
                <Link key={item.path} href={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                  <div
                    className={`
                    border-4 border-black
                    px-4 py-3
                    font-black
                    shadow-[4px_4px_0_#000]

                    ${active ? 'bg-[#72E06A]' : 'bg-white'}
                    `}
                  >
                    {item.name}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
