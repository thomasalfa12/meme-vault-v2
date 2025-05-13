import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { readContract, writeContract } from "wagmi/actions";
import { useAccount, useConfig, useWalletClient } from "wagmi";
import {
  MEME_CAMPAIGN_MANAGER_ADDRESS,
  MemeCampaignManagerABI,
} from "../../utils/constants";

export default function CampaignDetail() {
  const router = useRouter();
  const config = useConfig();
  const { id } = router.query;
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [campaign, setCampaign] = useState<any>(null);
  const [ethAmount, setEthAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchCampaign = async () => {
    if (!id) return;
    try {
      const data = await readContract(config, {
        abi: MemeCampaignManagerABI,
        address: MEME_CAMPAIGN_MANAGER_ADDRESS,
        functionName: "getCampaignById",
        args: [BigInt(id as string)],
      });
      setCampaign(data);
    } catch (err) {
      console.error("Failed to fetch campaign", err);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [id]);

  const handleParticipate = async () => {
    if (!walletClient || !address || !ethAmount || isNaN(Number(ethAmount))) {
      alert("Please enter a valid ETH amount.");
      return;
    }

    try {
      setIsLoading(true);
      await writeContract(config, {
        abi: MemeCampaignManagerABI,
        address: MEME_CAMPAIGN_MANAGER_ADDRESS,
        functionName: "participate",
        args: [BigInt(id as string)],
        value: BigInt(Number(ethAmount) * 1e18),
        account: address,
      });
      alert("Participation successful!");
      fetchCampaign(); // refresh campaign state
      setEthAmount("");
    } catch (err) {
      console.error("Participation failed", err);
      alert("Failed to participate.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!campaign) return <p className="text-white">Loading campaign...</p>;

  const formatEth = (value: bigint | number) =>
    (typeof value === "bigint" ? Number(value) : value).toFixed(2);

  return (
    <div className="max-w-2xl mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
      <p className="text-gray-400 mb-2">Creator: {campaign.creator}</p>
      <p className="text-gray-400 mb-2">
        Goal: {formatEth(campaign.goalAmount)} ETH — Raised:{" "}
        {formatEth(campaign.raisedAmount)} ETH
      </p>
      <p className="text-gray-400 mb-4">
        Deadline:{" "}
        {new Date(Number(campaign.deadline) * 1000).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <input
        type="number"
        placeholder="Amount in ETH"
        className="w-full p-2 text-black rounded mb-3"
        value={ethAmount}
        onChange={(e) => setEthAmount(e.target.value)}
        disabled={isLoading}
        min={0}
        step={0.01}
      />
      <button
        onClick={handleParticipate}
        className={`w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded ${
          isLoading ? "opacity-60 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Participate"}
      </button>
    </div>
  );
}
