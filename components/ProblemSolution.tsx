import { motion } from "framer-motion";
import { ShieldCheck, Lock, HandCoins, Gift } from "lucide-react";

export default function ProblemSolution() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Problem & Solution
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Understanding the challenges and how Meme Vault solves them.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Problem Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-indigo-50 rounded-3xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-semibold text-indigo-700 mb-6">
            Problem
          </h3>
          <div className="space-y-6 text-indigo-900 text-left">
            <div className="flex items-start space-x-4">
              <ShieldCheck className="w-8 h-8 text-indigo-600" />
              <span>Creators monetize memes only once.</span>
            </div>
            <div className="flex items-start space-x-4">
              <Lock className="w-8 h-8 text-indigo-600" />
              <span>No privacy-focused platform for exclusive memes.</span>
            </div>
          </div>
        </motion.div>

        {/* Solution Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-pink-50 rounded-3xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-semibold text-pink-700 mb-6">
            Solution
          </h3>
          <div className="space-y-6 text-pink-900 text-left">
            <div className="flex items-start space-x-4">
              <Lock className="w-8 h-8 text-pink-600" />
              <span>Memes are locked until the funding goal is reached.</span>
            </div>
            <div className="flex items-start space-x-4">
              <HandCoins className="w-8 h-8 text-pink-600" />
              <span>Community crowdfunds together to unlock memes.</span>
            </div>
            <div className="flex items-start space-x-4">
              <Gift className="w-8 h-8 text-pink-600" />
              <span>Early supporters get exclusive rewards after reveal.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
