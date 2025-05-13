import React from "react";

const DualFeeSlider = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) => {
  const fee = value;
  const communityFee = 100 - fee;

  return (
    <div className="w-full">
      {/* Labels */}
      <div className="flex justify-between text-sm font-medium px-1 mb-1">
        <div className="flex items-center gap-1 text-blue-400">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          Fee Receiver <span className="text-blue-300">{fee}%</span>
        </div>
        <div className="flex items-center gap-1 text-red-400">
          Community <span className="text-red-300">{communityFee}%</span>
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
        </div>
      </div>

      {/* Track container */}
      <div className="relative w-full h-3 rounded-full bg-zinc-800 overflow-hidden">
        {/* Left fill (blue) with glow */}
        <div
          className="absolute top-0 left-0 h-3 bg-blue-500 shadow-[0_0_10px_#3b82f6] transition-all duration-300"
          style={{ width: `${fee}%` }}
        />
        {/* Right fill (red) with glow */}
        <div
          className="absolute top-0 right-0 h-3 bg-red-500 shadow-[0_0_10px_#ef4444] transition-all duration-300"
          style={{ width: `${communityFee}%` }}
        />

        {/* Invisible slider for input */}
        <input
          type="range"
          min="0"
          max="100"
          value={fee}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-3 appearance-none bg-transparent z-10 relative cursor-pointer"
        />
      </div>

      {/* Thumb styling */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: white;
          border: 3px solid #3b82f6;
          margin-top: -12px;
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.7), 0 0 4px white;
          transition: box-shadow 0.2s ease-in-out;
        }

        input[type="range"]::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: white;
          border: 3px solid #3b82f6;
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.7), 0 0 4px white;
          transition: box-shadow 0.2s ease-in-out;
        }

        input[type="range"] {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default DualFeeSlider;
