"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { parseEther } from "viem";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { uploadFileToIPFS } from "../utils/ipfs";
import {
  MEME_CAMPAIGN_MANAGER_ADDRESS,
  MemeCampaignManagerABI,
} from "../utils/constants";
import Image from "next/image";
import DualFeeSlider from "../components/ui/DualFeeSlider";
import { LabelledInput } from "../components/ui/LabelledInput";

export default function CreateCampaignPage() {
  const router = useRouter();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { address } = useAccount();

  const [step, setStep] = useState<"simple" | "advanced">("simple");
  const [mode, setMode] = useState<"Normal" | "DegenA">("Normal");
  const [creatorFee, setCreatorFee] = useState(85);

  const [coinName, setCoinName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setImageFile(null);
    setImagePreview(null);
    setCoinName("");
    setTokenSymbol("");
    setGoalAmount("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      toast.error("Image must be less than 1MB");
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
    if (!walletClient || !imageFile) {
      toast.error("Please connect wallet and upload image.");
      return;
    }
    if (!publicClient) {
      toast.error("Public client not available.");
      return;
    }

    if (!coinName || !tokenSymbol || !goalAmount) {
      return toast.error("Please fill all required fields.");
    }

    const parsedGoal = parseFloat(goalAmount);
    if (isNaN(parsedGoal) || parsedGoal <= 3) {
      return toast.error("Goal must be greather tahn 3 ETH");
    }

    try {
      setLoading(true);
      toast.loading("Uploading image to IPFS...");

      const imageUrl = await uploadFileToIPFS(imageFile);

      toast.dismiss();
      toast.loading("Creating campaign onchain...");

      const modeEnum = step === "simple" ? 0 : mode === "DegenA" ? 1 : 2;
      const fee = step === "simple" ? 85 : creatorFee;
      const goalInWei = parseEther(goalAmount);
      const communityFee = 100 - fee;

      const txHash = await walletClient.writeContract({
        address: MEME_CAMPAIGN_MANAGER_ADDRESS,
        abi: MemeCampaignManagerABI,
        functionName: "createCampaign",
        args: [
          coinName,
          tokenSymbol,
          imageUrl,
          goalInWei,
          modeEnum,
          fee,
          communityFee,
        ],
        value: step === "advanced" ? parseEther("0.00077") : 0n,
      });

      toast.dismiss();
      toast.loading("Waiting for confirmation...");
      await publicClient.waitForTransactionReceipt({ hash: txHash });

      toast.dismiss();
      toast.success("Campaign created!");
      resetForm();
      router.push("/campaigns");
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Failed to create campaign.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a23] to-black p-6 flex flex-col items-center justify-center">
      <Toaster position="top-center" />
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Create Campaign</h1>
            <div className="space-x-2">
              {[
                { label: "Simple", value: "simple" },
                { label: "Advanced", value: "advanced" },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    step === value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => {
                    setStep(value as "simple" | "advanced");
                    if (value === "simple") {
                      setMode("Normal");
                      setCreatorFee(85);
                    }
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#161622] rounded-2xl p-6">
            <div className="flex flex-col gap-4">
              <label className="text-white font-medium">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-white"
              />
              <LabelledInput
                label="Coin Name"
                placeholder="e.g. DogeCoin"
                maxLength={18}
                value={coinName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCoinName(e.target.value)
                }
              />
              <LabelledInput
                label="Token Symbol"
                placeholder="e.g. Doge"
                value={tokenSymbol}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTokenSymbol(e.target.value)
                }
              />
              <LabelledInput
                label="Fundraising Goal (in ETH)"
                placeholder="e.g. 3"
                type="number"
                min="0"
                value={goalAmount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setGoalAmount(e.target.value)
                }
              />

              {step === "advanced" && (
                <>
                  <div className="text-white font-medium">Campaign Mode</div>
                  <div className="flex gap-2">
                    {["Normal", "DegenA"].map((opt) => (
                      <button
                        key={opt}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          mode === opt
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300"
                        }`}
                        onClick={() => setMode(opt as "Normal" | "DegenA")}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <label className="text-white font-medium">
                    Creator Fee Split
                  </label>
                  <DualFeeSlider value={creatorFee} onChange={setCreatorFee} />
                </>
              )}

              {step === "simple" && (
                <div className="text-sm text-gray-400">
                  Mode: Normal | Creator Fee 85% | Burn 15% | Free
                </div>
              )}

              {walletClient ? (
                <button
                  onClick={handleCreate}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 mt-4"
                >
                  {loading
                    ? "Creating..."
                    : `Create Campaign (${
                        step === "simple" ? "Free" : "0.00077 ETH"
                      })`}
                </button>
              ) : (
                <ConnectButton label="Sign in" />
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-[#161622] rounded-2xl p-4 text-white h-fit">
          <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Preview"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-600">No Image</span>
            )}
          </div>

          <div className="text-lg font-bold mb-1">{tokenSymbol || "TOKEN"}</div>
          <div className="text-xs text-gray-400 mb-2">CA: 0x000...0000</div>
          <div className="text-sm text-purple-400 mb-1">
            🚀 Fair Launch Active
          </div>
          <div className="text-sm text-gray-300">
            Goal: {goalAmount || "0"} ETH
          </div>
          <div className="text-sm text-gray-300">
            Creator Fee: {creatorFee}% | Community: {100 - creatorFee}%
          </div>
        </div>
      </div>
    </div>
  );
}
