"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAccount, useConfig } from "wagmi";
import { readContract } from "wagmi/actions";
import {
  MEME_CAMPAIGN_MANAGER_ADDRESS,
  MemeCampaignManagerABI,
} from "../../utils/constants";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

export default function TopCampaigns() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { address } = useAccount();
  const config = useConfig();
  const [campaigns, setCampaigns] = useState<any[]>([]);

  const fetchCampaigns = useCallback(async () => {
    try {
      const data = await readContract(config, {
        abi: MemeCampaignManagerABI,
        address: MEME_CAMPAIGN_MANAGER_ADDRESS,
        functionName: "getCampaignSummaries",
      });
      setCampaigns(data as any[]);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
    }
  }, [config]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  // Auto scroll effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;

    const move = () => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 1;
      }
      animationId = requestAnimationFrame(move);
    };

    animationId = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationId);
  }, [campaigns]);

  return (
    <section className="py-20 bg-gradient-to-b from-[#0D1B3E] via-[#0D1B3E] to-[#070707] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold animate-fade-in">
          🔥 Top Meme Campaigns
        </h2>
      </div>

      <div
        ref={containerRef}
        className="flex space-x-8 w-full overflow-hidden"
        style={{ whiteSpace: "nowrap" }}
      >
        {[...campaigns, ...campaigns].map((campaign, idx) => (
          <div key={idx} className="flex-shrink-0">
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              transitionSpeed={800}
              scale={1.02}
              gyroscope={true}
              glareEnable={true}
              glareMaxOpacity={0.2}
              className="bg-gradient-to-br from-blue-700 via-purple-800 to-black rounded-2xl overflow-hidden shadow-xl min-w-[300px] hover:scale-105 transition-transform duration-500"
            >
              {campaign.imageUrl ? (
                <Image
                  src={campaign.imageUrl}
                  alt={campaign.title || "Campaign"}
                  width={500}
                  height={500}
                  className="object-cover w-full h-48"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-800 text-4xl">
                  🎯
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">
                  {campaign.title || "Untitled"}
                </h3>
              </div>
            </Tilt>
          </div>
        ))}
      </div>
    </section>
  );
}
