"use client";
import { motion } from "framer-motion";

export default function ProblemSolution() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-6">Problem & Solution</h2>
        <p className="text-lg text-gray-300">
          Here is the problem we are solving and how we do it!
        </p>
      </motion.div>
    </section>
  );
}
