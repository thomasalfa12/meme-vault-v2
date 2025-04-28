import React from "react";

interface CampaignCardProps {
  campaign: any;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const goalAmount = parseFloat(campaign.goalAmount || 0);
  const raisedAmount = parseFloat(campaign.raisedAmount || 0);
  const progress =
    goalAmount > 0 ? Math.min((raisedAmount / goalAmount) * 100, 100) : 0;

  const getBadge = () => {
    if (progress >= 90) return "⏳ Almost Unlocked";
    if (progress >= 50) return "🔥 Trending";
    return null;
  };

  return (
    <div className="bg-[#1e293b] rounded-2xl p-4 shadow-lg hover:scale-[1.03] transition-transform overflow-hidden border border-gray-700 flex flex-col justify-between relative group">
      {/* Badge */}
      {getBadge() && (
        <span className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-xs text-white px-3 py-1 rounded-full shadow-md">
          {getBadge()}
        </span>
      )}

      <div>
        {/* Cover Placeholder */}
        <div className="h-40 bg-gray-800 rounded-xl mb-4 flex items-center justify-center text-4xl">
          🎯
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-white truncate">
          {campaign.title || "Untitled"}
        </h2>

        {/* Creator */}
        <p className="text-gray-400 text-sm mt-1 truncate">
          Creator: {campaign.creator}
        </p>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {raisedAmount} / {goalAmount} ETH
          </p>
        </div>

        {/* Deadline */}
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <p>Deadline:</p>
          <p>
            {new Date(Number(campaign.deadline) * 1000).toLocaleDateString()}
          </p>
        </div>

        {/* Status */}
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <p>Status:</p>
          <p
            className={campaign.unlocked ? "text-green-400" : "text-yellow-400"}
          >
            {campaign.unlocked ? "Unlocked" : "Locked"}
          </p>
        </div>
      </div>

      {/* View Details Button */}
      <button className="mt-5 w-full py-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl text-white font-semibold hover:opacity-90 transition-all active:scale-95">
        View Details
      </button>
    </div>
  );
};

export default CampaignCard;
