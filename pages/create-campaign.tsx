"use client";

import { useState } from "react";
import Image from "next/image";
import { useWalletClient, usePublicClient } from "wagmi";
import { parseEther } from "viem/utils";
import { uploadFileToIPFS } from "../utils/ipfs"; // pastikan ada fungsi upload IPFS
import {
  MEME_CAMPAIGN_MANAGER_ADDRESS,
  MemeCampaignManagerABI,
} from "../utils/constants";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateCampaignForm() {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [coinName, setCoinName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setImageFile(null);
    setImagePreview(null);
    setTitle("");
    setImageUrl("");
    setCoinName("");
    setTokenSymbol("");
    setGoalAmount("");
    setDeadline("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast.error("Ukuran gambar maksimal 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img =
        typeof window !== "undefined" ? new (window.Image as any)() : null;

      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const x = (img.width - size) / 2;
        const y = (img.height - size) / 2;
        ctx.drawImage(img, x, y, size, size, 0, 0, size, size);

        canvas.toBlob((blob) => {
          if (!blob) return;

          const croppedFile = new File([blob], file.name, { type: file.type });
          setImageFile(croppedFile);
          setImagePreview(URL.createObjectURL(croppedFile));
        }, file.type);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = async () => {
    if (!walletClient) {
      toast.error("Wallet not connected!");
      return;
    }

    if (!title || !coinName || !tokenSymbol || !goalAmount || !deadline) {
      toast.error("Please fill all fields!");
      return;
    }

    if (parseFloat(goalAmount) < 0.01) {
      toast.error("Goal must be at least 0.01 ETH");
      return;
    }

    try {
      setLoading(true);
      toast.loading("Uploading image...");

      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadFileToIPFS(imageFile);
      }

      toast.dismiss();
      toast.loading("Creating campaign on-chain...");

      const txHash = await walletClient.writeContract({
        address: MEME_CAMPAIGN_MANAGER_ADDRESS,
        abi: MemeCampaignManagerABI,
        functionName: "createCampaign",
        args: [
          title,
          coinName,
          tokenSymbol,
          imageUrl,
          parseEther(goalAmount),
          Math.floor(new Date(deadline).getTime() / 1000),
        ],
      });

      toast.loading("Waiting for transaction confirmation...");

      if (!publicClient) {
        toast.dismiss();
        toast.error("Public client not available");
        return;
      }

      await publicClient.waitForTransactionReceipt({ hash: txHash });

      toast.dismiss();
      toast.success("Campaign created!");
      resetForm();
      router.push("/campaigns");
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to create campaign!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a23] to-black flex items-center justify-center p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-10">
        {/* Preview Card */}
        {/* Preview Card */}
        <div className="flex-1 bg-[#161622] rounded-2xl p-6 shadow-lg flex flex-col justify-between relative">
          <div className="relative w-full aspect-square bg-gray-800 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </div>
          <h2 className="text-white text-xl font-bold truncate text-center">
            {tokenSymbol || "TICKER"}
          </h2>
          <p className="text-gray-400 text-sm mt-1 truncate text-center">
            {title || "Campaign Title"}
          </p>
          <p className="text-gray-500 text-sm mt-1 text-center">
            {goalAmount ? `${goalAmount} ETH Goal` : "0 ETH Goal"}
          </p>
        </div>

        {/* Form */}
        <div className="flex-1 bg-[#161622] rounded-2xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-6">
            Ready to Launch?
          </h1>

          <div className="flex flex-col gap-4">
            <label className="text-white font-medium">Add Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-white"
            />

            <input
              className="bg-gray-800 p-3 rounded-xl text-white placeholder-gray-400"
              placeholder="Campaign Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="bg-gray-800 p-3 rounded-xl text-white placeholder-gray-400"
              placeholder="Coin Name"
              value={coinName}
              onChange={(e) => setCoinName(e.target.value)}
            />

            <input
              className="bg-gray-800 p-3 rounded-xl text-white placeholder-gray-400"
              placeholder="Token Symbol (max 6 chars)"
              value={tokenSymbol}
              maxLength={6}
              onChange={(e) => setTokenSymbol(e.target.value)}
            />

            <input
              className="bg-gray-800 p-3 rounded-xl text-white placeholder-gray-400"
              placeholder="Goal Amount (ETH)"
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
            />

            <input
              className="bg-gray-800 p-3 rounded-xl text-white placeholder-gray-400"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />

            <button
              onClick={handleCreate}
              disabled={loading}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Create Campaign"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
