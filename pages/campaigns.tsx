// pages/campaigns.tsx

import { useEffect, useState, useCallback } from "react";
import { useAccount, useConfig } from "wagmi";
import { readContract } from "wagmi/actions";
import { MEME_CAMPAIGN_MANAGER_ADDRESS } from "../utils/constants"; // Import address
import { MemeCampaignManagerABI } from "../utils/constants"; // Import ABI

export default function CampaignsPage() {
  const { address: userAddress } = useAccount();
  const config = useConfig();

  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      const data = await readContract(config, {
        abi: MemeCampaignManagerABI,
        address: MEME_CAMPAIGN_MANAGER_ADDRESS,
        functionName: "getCampaigns",
      });
      console.log("Campaigns:", data);
      setCampaigns(data as any[]);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]); // fix warning react-hooks

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Campaigns</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {campaigns.map((campaign, index) => (
            <li key={index} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{campaign.title}</h2>
              <p>Creator: {campaign.creator}</p>
              <p>Goal Amount: {campaign.goalAmount.toString()}</p>
              <p>Raised Amount: {campaign.raisedAmount.toString()}</p>
              <p>
                Deadline:{" "}
                {new Date(Number(campaign.deadline) * 1000).toLocaleString()}
              </p>
              <p>Status: {campaign.unlocked ? "Unlocked" : "Locked"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
