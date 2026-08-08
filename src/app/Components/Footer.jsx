"use client";

import { motion } from "framer-motion";
import { IoLogoYoutube, IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";

const socials = [
    {
        name: "YouTube",
        href: "https://youtube.com/@pplfulia?si=NnMmQRHxSrm-vqpo",
        icon: IoLogoYoutube,
        glowColor: "hover:text-red-500 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]",
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/pplfulia/profilecard/?igsh=MXNuaHNzaDlyaXB1dg==",
        icon: IoLogoInstagram,
        glowColor: "hover:text-pink-500 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]",
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61566263444046&mibextid=ZbWKwL",
        icon: IoLogoFacebook,
        glowColor: "hover:text-blue-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]",
    },
];

export default function Footer() {
    return (
        <footer className="relative w-full pt-10 pb-16 flex flex-col items-center justify-center overflow-hidden">
            {/* Ambient Red Glow Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-32 bg-red-600/10 blur-[130px] pointer-events-none rounded-full" />

            {/* Glowing Top Divider Line */}
            <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-red-800/40 to-transparent mb-12" />

            {/* Header Text */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-8"
            >
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <h2 className="text-xs font-mono tracking-[0.4em] uppercase text-neutral-400">
                    Connect With Us
                </h2>
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            </motion.div>

            {/* Floating Unboxed Icons */}
            <div className="flex items-center gap-6 z-10">
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
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{ y: -6, scale: 1.12 }}
                            whileTap={{ scale: 0.95 }}
                            className={`group relative flex items-center justify-center w-14 h-14 rounded-full border border-neutral-800/90 bg-neutral-950/40 text-neutral-400 backdrop-blur-sm transition-all duration-300 ${social.glowColor}`}
                        >
                            <Icon className="text-2xl transition-transform duration-300 group-hover:scale-110" />
                        </motion.a>
                    );
                })}
            </div>

            {/* Minimal Copyright Tagline */}
            <p className="mt-12 text-[11px] font-mono tracking-[0.25em] text-neutral-600 uppercase">
                © {new Date().getFullYear()} PPL Fulia <span className="text-red-900">•</span> All Rights Reserved
            </p>
        </footer>
    );
}