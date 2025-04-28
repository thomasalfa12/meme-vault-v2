"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../../components/ui/Button";
import HeroAnimation from "../ui/HeroAnimation";
import { FloatingEmojis } from "../../components/ui/FloatingEmojis";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Background animation */}
      <HeroAnimation />

      {/* Floating emojis */}
      <FloatingEmojis />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
          Unlock Secret Memes 🔥
        </h1>
        <p className="text-lg md:text-2xl text-white/80 mb-8">
          Fund, Predict, and Earn. Support meme creators and earn early!
        </p>
        <Link href="/campaigns">
          <Button size="lg">Explore Campaigns</Button>
        </Link>
      </motion.div>
    </section>
  );
}
