import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FundMemeModalProps {
  campaignId: string;
}

export default function FundMemeModal({ campaignId }: FundMemeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const handleFund = () => {
    console.log(`Funding ${amount} ETH to campaign ${campaignId}`);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full"
      >
        💰 Fund Meme
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
              <h2 className="text-2xl font-bold mb-4">Fund this Meme!</h2>
              <input
                type="number"
                placeholder="Enter amount in ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border p-3 rounded-lg mb-4"
              />
              <button
                onClick={handleFund}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-bold"
              >
                Fund Now
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
