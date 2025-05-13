import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface Campaign {
  id: number;
  name: string;
  symbol: string;
  imgURL: string;
  creator: string;
  goalAmount: number;
  raisedAmount: number;
  finalized: boolean;
  mode: number;
  token: string;
  pool: string;
}

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const progress =
    campaign.goalAmount > 0
      ? Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100)
      : 0;

  const [imgSrc, setImgSrc] = useState(campaign.imgURL);

  const handleImageError = () => {
    if (imgSrc.includes("ipfs.io")) {
      setImgSrc(imgSrc.replace("ipfs.io", "nftstorage.link"));
    } else {
      setImgSrc("/fallback.png");
    }
  };

  const modeLabels = ["Simple", "Advanced Normal", "Advanced Degen"];

  return (
    <Link href={`/campaign/${campaign.id}`}>
      <div className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition p-4 cursor-pointer">
        <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
          <Image
            src={imgSrc}
            alt={campaign.name}
            fill
            className="object-cover"
            onError={handleImageError}
          />
        </div>

        <h2 className="text-lg font-semibold text-white truncate mb-1">
          {campaign.name}
        </h2>
        <p className="text-sm text-gray-400 mb-1">Symbol: {campaign.symbol}</p>
        <p className="text-sm text-gray-400 mb-1">
          Mode: {modeLabels[campaign.mode]}
        </p>
        <p className="text-sm text-gray-400 mb-2">
          Oleh: {campaign.creator.slice(0, 6)}...{campaign.creator.slice(-4)}
        </p>

        <div className="w-full bg-gray-700 h-2 rounded mb-2">
          <div
            className="h-full bg-green-500 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-300 mb-1">
          {campaign.raisedAmount.toFixed(2)} / {campaign.goalAmount.toFixed(2)}{" "}
          ETH
        </p>

        <p
          className={`text-xs font-semibold ${
            !campaign.finalized ? "text-green-400" : "text-red-400"
          }`}
        >
          {!campaign.finalized ? "Masih berlangsung" : "Terkunci / Selesai"}
        </p>
      </div>
    </Link>
  );
}
