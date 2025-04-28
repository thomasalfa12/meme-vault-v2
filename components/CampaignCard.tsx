import React from "react";
import { Campaign } from "../hooks/useCampaign"; // Pastikan type ini ada
import Image from "next/image";

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const { name, imageUrl, description } = campaign;

  return (
    <div className="relative rounded-3xl p-4 border-2 border-transparent bg-gray-900/70 backdrop-blur-lg transition-all hover:scale-105 hover:border-pink-500 group overflow-hidden shadow-md hover:shadow-2xl">
      {/* Lighting background effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition duration-300 rounded-3xl"></div>

      <div className="relative z-10">
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={300}
          className="rounded-xl object-cover"
        />
        <h2 className="text-xl font-bold mt-4 text-white">{name}</h2>
        <p className="text-gray-300 mt-2 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default CampaignCard;
