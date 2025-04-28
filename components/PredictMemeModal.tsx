import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PredictMemeModalProps {
  campaignId: string;
}

export default function PredictMemeModal({
  campaignId,
}: PredictMemeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [prediction, setPrediction] = useState<"viral" | "flop" | null>(null);

  const handleVote = () => {
    console.log(`Voting ${prediction} for campaign ${campaignId}`);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full"
      >
        🔮 Predict Viral
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Predict Meme's Future</h2>
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setPrediction("viral")}
                  className={`flex-1 p-3 rounded-lg font-bold ${
                    prediction === "viral"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  🚀 Viral
                </button>
                <button
                  onClick={() => setPrediction("flop")}
                  className={`flex-1 p-3 rounded-lg font-bold ${
                    prediction === "flop"
                      ? "bg-red-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  💤 Flop
                </button>
              </div>
              <button
                onClick={handleVote}
                disabled={!prediction}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-bold disabled:opacity-50"
              >
                Vote Now
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-3 w-full py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
