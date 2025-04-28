"use client";

import { parseEther } from "viem/utils";
import { useState } from "react";
import { useWalletClient } from "wagmi";

import {
  MEME_CAMPAIGN_MANAGER_ADDRESS,
  MemeCampaignManagerABI,
} from "../utils/constants";

export default function CreateCampaign() {
  const { data: walletClient } = useWalletClient();

  const [title, setTitle] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!walletClient) {
      alert("Wallet not connected!");
      return;
    }

    try {
      setLoading(true);

      const txHash = await walletClient.writeContract({
        address: MEME_CAMPAIGN_MANAGER_ADDRESS,
        abi: MemeCampaignManagerABI,
        functionName: "createCampaign",
        args: [
          title,
          tokenName,
          tokenSymbol,
          parseEther(goalAmount),
          Math.floor(new Date(deadline).getTime() / 1000),
        ],
      });

      alert(`Campaign created successfully! TX Hash: ${txHash}`);

      setTitle("");
      setTokenName("");
      setTokenSymbol("");
      setGoalAmount("");
      setDeadline("");
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">Create New Meme Campaign</h1>

      <input
        className="border p-2 rounded"
        placeholder="Campaign Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Token Name"
        value={tokenName}
        onChange={(e) => setTokenName(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Token Symbol (max 6 chars)"
        value={tokenSymbol}
        maxLength={6}
        onChange={(e) => setTokenSymbol(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Goal Amount (ETH)"
        value={goalAmount}
        onChange={(e) => setGoalAmount(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button
        onClick={handleCreate}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Campaign"}
      </button>
    </div>
  );
}
