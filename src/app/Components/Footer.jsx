"use client";
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { IoLogoYoutube, IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";

const socials = [
    {
        name: "YouTube",
        href: "https://youtube.com/@pplfulia?si=NnMmQRHxSrm-vqpo",
        icon: IoLogoYoutube,
        // Brand-specific accent styling for mobile & desktop
        iconColor: "text-red-500",
        borderColor: "border-red-500/30 md:border-neutral-800/90",
        bgColor: "bg-red-950/20 md:bg-neutral-950/40",
        glow: "hover:border-red-500/60 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]",
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/pplfulia/profilecard/?igsh=MXNuaHNzaDlyaXB1dg==",
        icon: IoLogoInstagram,
        iconColor: "text-pink-500",
        borderColor: "border-pink-500/30 md:border-neutral-800/90",
        bgColor: "bg-pink-950/20 md:bg-neutral-950/40",
        glow: "hover:border-pink-500/60 hover:shadow-[0_0_25px_rgba(236,72,153,0.35)]",
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61566263444046&mibextid=ZbWKwL",
        icon: IoLogoFacebook,
        iconColor: "text-blue-500",
        borderColor: "border-blue-500/30 md:border-neutral-800/90",
        bgColor: "bg-blue-950/20 md:bg-neutral-950/40",
        glow: "hover:border-blue-500/60 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]",
    },
];

export default function Footer() {
    const [visits, setVisits] = useState(null);

    useEffect(() => {
        fetch('/api/visit')
            .then((res) => {
                if (!res.ok) throw new Error('API Error');
                return res.json();
            })
            .then((data) => setVisits(data.visits))
            .catch((err) => console.error("Failed to fetch visit count:", err));
    }, []);

    return (
        <footer className="relative w-full pt-10 pb-12 px-4 flex flex-col items-center justify-center overflow-x-hidden">
            {/* Ambient Red Glow Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[500px] h-28 bg-red-600/15 blur-[90px] sm:blur-[120px] pointer-events-none rounded-full" />

            {/* Glowing Top Divider Line */}
            <div className="w-full max-w-xl h-[1px] bg-gradient-to-r from-transparent via-red-800/40 to-transparent mb-8 sm:mb-10" />

            {/* Header Text */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2.5 mb-6 sm:mb-8"
            >
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <h2 className="text-[11px] sm:text-xs font-mono tracking-[0.3em] sm:tracking-[0.4em] uppercase text-neutral-400">
                    Connect With Us
                </h2>
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            </motion.div>

            {/* Social Buttons Container */}
            <div className="flex items-center justify-center gap-5 sm:gap-8 z-10 w-full max-w-sm">
                {socials.map((social, index) => {
                    const Icon = social.icon;
                    return (
                        <motion.a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08, duration: 0.4 }}
                            whileHover={{ y: -5, scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div
                                className={`
                                    flex items-center justify-center
                                    w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-full
                                    border backdrop-blur-md
                                    transition-all duration-300
                                    active:scale-95 active:bg-neutral-900
                                    ${social.borderColor}
                                    ${social.bgColor}
                                    ${social.glow}
                                `}
                            >
                                <Icon className={`text-2xl sm:text-3xl ${social.iconColor} transition-transform duration-300 group-hover:scale-110`} />
                            </div>
                            
                            {/* Mobile-friendly Label */}
                            <span className="text-[10px] sm:text-xs font-mono text-neutral-400 group-hover:text-white transition-colors">
                                {social.name}
                            </span>
                        </motion.a>
                    );
                })}
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-8 z-10 flex flex-col items-center px-5 py-2.5 rounded-xl border border-neutral-800/80 bg-neutral-950/60 backdrop-blur-md shadow-inner"
            >
                <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase">
                    Monthly Visits
                </span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-red-500 tracking-wider">
                    {visits !== null ? visits.toLocaleString() : '...'}
                </span>
            </motion.div>

            {/* Minimal Copyright Tagline */}
            <p className="mt-10 sm:mt-12 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400 uppercase text-center">
                © {new Date().getFullYear()} PPL Fulia <span className="text-red-600">•</span> All Rights Reserved
            </p>
        </footer>
    );
}