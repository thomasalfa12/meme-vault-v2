"use client";

import { useState } from "react";
import { useWalletClient } from "wagmi";
import { BrowserProvider, ethers } from "ethers";

import {
  MEME_CAMPAIGN_MANAGER_ADDRESS,
  MemeCampaignManagerABI,
} from "../utils/constants";
import { uploadFileToIPFS, uploadMetadataToIPFS } from "../utils/ipfs";

export default function CreateCampaign() {
  const { data: walletClient } = useWalletClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [memeFile, setMemeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!walletClient) {
      alert("Wallet not connected!");
      return;
    }
    if (!memeFile) {
      alert("Please upload a meme file!");
      return;
    }

    try {
      setLoading(true);

      const provider = new BrowserProvider(walletClient.transport);
      const signer = await provider.getSigner();

      // 1. Upload Meme Image
      const imageUrl = await uploadFileToIPFS(memeFile);

      // 2. Upload Metadata
      const metadata = {
        title,
        description,
        image: imageUrl,
      };
      const metadataUrl = await uploadMetadataToIPFS(metadata);

      // 3. Create Campaign
      const manager = new ethers.Contract(
        MEME_CAMPAIGN_MANAGER_ADDRESS,
        MemeCampaignManagerABI,
        signer
      );

      const tx = await manager.createCampaign(
        metadataUrl,
        ethers.parseEther(goalAmount),
        Math.floor(new Date(deadline).getTime() / 1000)
      );

      await tx.wait();
      alert("Campaign created successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setGoalAmount("");
      setDeadline("");
      setMemeFile(null);
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
      <textarea
        className="border p-2 rounded"
        placeholder="Short Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setMemeFile(e.target.files?.[0] || null)}
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
