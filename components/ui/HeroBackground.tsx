"use client";

import { motion } from "framer-motion";

export default function HeroAnimation() {
  return (
    <motion.div
      className="absolute top-0 left-1/2 transform -translate-x-1/2 z-0 opacity-20"
      animate={{
        rotate: 360,
      }}
      transition={{
        repeat: Infinity,
        duration: 60,
        ease: "linear",
      }}
    >
      <div className="w-[600px] h-[600px] relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-3xl opacity-30" />
        <div className="absolute inset-10 border-4 border-dashed border-purple-400 rounded-full animate-pulse" />
        <div className="absolute inset-20 border-2 border-dashed border-indigo-400 rounded-full animate-ping" />
      </div>
    </motion.div>

<motion.div
className="absolute inset-0 z-0"
animate={{
  backgroundColor: [
    "rgba(10, 10, 20, 1)",
    "rgba(20, 20, 30, 1)",
    "rgba(10, 10, 20, 1)",
  ],
}}
transition={{
  duration: 20,
  repeat: Infinity,
  repeatType: "reverse",
}}
/>

  );
}
