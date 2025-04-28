"use client";

import { motion } from "framer-motion";

const floatingEmojis = [
  "🚀",
  "😂",
  "🐸",
  "🔥",
  "🌟",
  "🪐",
  "😎",
  "👽",
  "💥",
  "🎉",
];

export default function HeroAnimation() {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Dynamic Lighting */}
      <motion.div
        className="absolute w-[1200px] h-[1200px] rounded-full bg-gradient-radial from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl"
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 200,
          ease: "linear",
        }}
        style={{
          top: "-300px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Main Glowing Ring */}
      <motion.div
        className="absolute w-[500px] h-[500px] border-[10px] border-purple-500 rounded-full blur-2xl opacity-40"
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Inner rotating ring */}
      <motion.div
        className="absolute w-[400px] h-[400px] border-[2px] border-dashed border-pink-400 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Floating Emojis */}
      {floatingEmojis.map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-3xl"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}
