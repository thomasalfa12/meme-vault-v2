"use client";

import { SidebarProvider } from "../components/context/SidebarContext";
import CampaignLayout from "../components/layout/CampaignLayout";
import CampaignCard from "../components/create-campaign/CampaignCard";
import { useAccount, useConfig } from "wagmi";
import { readContract } from "wagmi/actions";
import { useState, useEffect, useCallback } from "react";
import {
  MEME_CAMPAIGN_MANAGER_ADDRESS,
  MemeCampaignManagerABI,
} from "../utils/constants";

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

export default function CampaignsPage() {
  const config = useConfig();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);

      const campaignCount = await readContract(config, {
        abi: MemeCampaignManagerABI,
        address: MEME_CAMPAIGN_MANAGER_ADDRESS,
        functionName: "campaignCount",
      });

      const total = Number(campaignCount);
      const campaignsFetched: Campaign[] = [];

      for (let i = 0; i < total; i++) {
        const data = await readContract(config, {
          abi: MemeCampaignManagerABI,
          address: MEME_CAMPAIGN_MANAGER_ADDRESS,
          functionName: "getCampaign",
          args: [BigInt(i)],
        });

        const [
          name,
          symbol,
          imgURL,
          creator,
          targetAmount,
          totalRaised,
          finalized,
          mode,
          token,
          pool,
        ] = data as [
          string,
          string,
          string,
          string,
          bigint,
          bigint,
          boolean,
          number,
          string,
          string
        ];

        campaignsFetched.push({
          id: i,
          name,
          symbol,
          imgURL,
          creator,
          goalAmount: Number(targetAmount) / 1e18,
          raisedAmount: Number(totalRaised) / 1e18,
          finalized,
          mode,
          token,
          pool,
        });
      }

      setCampaigns(campaignsFetched.reverse());
    } catch (err) {
      console.error("Gagal mengambil data campaign", err);
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
          Jelajahi Campaign
        </h1>
        {loading ? (
          <p className="text-gray-300">Memuat data...</p>
        ) : campaigns.length === 0 ? (
          <p className="text-gray-400">Belum ada campaign.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </CampaignLayout>
    </SidebarProvider>
  );
}
