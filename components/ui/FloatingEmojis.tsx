import { motion } from "framer-motion";

const floatingEmojis = ["🚀", "😂", "🐸", "🔥", "🌟"];

export function FloatingEmojis() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {floatingEmojis.map((emoji, idx) => (
        <motion.div
          key={idx}
          className="absolute text-4xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
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
