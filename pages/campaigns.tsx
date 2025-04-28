import { SidebarProvider } from "../components/context/SidebarContext";
import CampaignLayout from "../components/layout/CampaignLayout";
import CampaignCard from "../components/CampaignCard";
import { useAccount, useConfig } from "wagmi";
import { readContract } from "wagmi/actions";
import { useState, useEffect, useCallback } from "react";
import {
  MEME_CAMPAIGN_MANAGER_ADDRESS,
  MemeCampaignManagerABI,
} from "../utils/constants";

export default function CampaignsPage() {
  const { address } = useAccount();
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
      setCampaigns(data as any[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return (
    <SidebarProvider>
      <CampaignLayout>
        <h1 className="text-2xl font-bold mb-6 text-white">
          Explore Campaigns
        </h1>
        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign, idx) => (
              <CampaignCard key={idx} campaign={campaign} />
            ))}
          </div>
        )}
      </CampaignLayout>
    </SidebarProvider>
  );
}
