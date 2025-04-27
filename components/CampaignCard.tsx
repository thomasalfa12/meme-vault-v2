import React from 'react';
import { Campaign } from '../hooks/useCampaign'; // Pastikan type ini ada
import Image from 'next/image';

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const { name, imageUrl, description } = campaign;

  return (
    <div className="rounded-xl border p-4 shadow hover:shadow-lg transition">
      <Image
        src={imageUrl}
        alt={name}
        width={400}
        height={300}
        className="rounded-md object-cover"
      />
      <h2 className="text-xl font-bold mt-2">{name}</h2>
      <p className="text-gray-500 mt-1">{description}</p>
    </div>
  );
};

export default CampaignCard;
