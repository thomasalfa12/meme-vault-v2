import { useEffect, useState } from "react";
import CampaignCard from "./CampaignCard";

type Campaign = {
  id: string;
  title: string;
  name: string;
  description: string;
  goalAmount: string;
  raisedAmount: string;
  deadline: string;
  imageUrl: string;
};

export default function TopCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    async function fetchTopCampaigns() {
      const dummyTopCampaigns: Campaign[] = [
        {
          id: "1",
          title: "Save The Kittens",
          name: "Kitten Rescue",
          description: "Help rescue and care for stray kittens.",
          goalAmount: "10",
          raisedAmount: "7",
          deadline: "2025-06-01",
          imageUrl: "https://placekitten.com/400/300",
        },
        {
          id: "2",
          title: "Memes For Trees",
          name: "Green Earth",
          description: "Plant a tree for every meme funded!",
          goalAmount: "20",
          raisedAmount: "15",
          deadline: "2025-08-15",
          imageUrl: "https://placekitten.com/400/301",
        },
        {
          id: "3",
          title: "Doge To The Moon",
          name: "Space Memes",
          description: "Help Doge go to space, one meme at a time!",
          goalAmount: "50",
          raisedAmount: "35",
          deadline: "2025-12-31",
          imageUrl: "https://placekitten.com/400/302",
        },
      ];

      setCampaigns(dummyTopCampaigns);
    }

    fetchTopCampaigns();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          Top Campaigns
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  );
}
