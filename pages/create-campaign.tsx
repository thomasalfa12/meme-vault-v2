"use client";

import { useState } from "react";
import Image from "next/image";
import { useWalletClient, usePublicClient } from "wagmi";
import { parseEther } from "viem/utils";
import { uploadFileToIPFS } from "../utils/ipfs";
import DualFeeSlider from "../components/ui/DualFeeSlider";
import { ConnectButton } from "@rainbow-me/rainbowkit";
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

  const [step, setStep] = useState<"simple" | "advanced">("simple");
  const [mode, setMode] = useState<"Normal" | "DegenA" | "DegenB">("Normal");
  const [creatorFeePercent, setCreatorFeePercent] = useState(70);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [coinName, setCoinName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [creatorFee, setCreatorFee] = useState(65);

  const resetForm = () => {
    setImageFile(null);
    setImagePreview(null);
    setTitle("");
    setCoinName("");
    setTokenSymbol("");
    setGoalAmount("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setMode("Normal");
    setCreatorFeePercent(70);
    setStep("simple");
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

  const toUnixTimestamp = (date: string, time: string) => {
    return Math.floor(new Date(`${date}T${time}`).getTime() / 1000);
  };

  const handleCreate = async () => {
    if (!walletClient) return toast.error("Wallet not connected!");

    if (
      !title ||
      !coinName ||
      !tokenSymbol ||
      !goalAmount ||
      !startDate ||
      !startTime ||
      !endDate ||
      !endTime
    ) {
      return toast.error("Please fill all fields!");
    }

    if (parseFloat(goalAmount) < 0.0005) {
      return toast.error("Goal must be at least 0.0005 ETH");
    }

    const startTimestamp = toUnixTimestamp(startDate, startTime);
    const endTimestamp = toUnixTimestamp(endDate, endTime);

    if (startTimestamp >= endTimestamp) {
      return toast.error("End time must be after start time");
    }

    try {
      setLoading(true);
      toast.loading("Uploading image...");

      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadFileToIPFS(imageFile);
      }

      toast.dismiss();
      toast.loading("Creating campaign...");

      const fee = step === "simple" ? "0" : "0.00077";

      const txHash = await walletClient.writeContract({
        address: MEME_CAMPAIGN_MANAGER_ADDRESS,
        abi: MemeCampaignManagerABI,
        functionName: "createCampaign",
        value: parseEther(fee),
        args: [
          title,
          coinName,
          tokenSymbol,
          imageUrl,
          parseEther(goalAmount),
          startTimestamp,
          endTimestamp,
          mode,
          BigInt(creatorFeePercent),
        ],
      });

      toast.loading("Waiting for confirmation...");
      await publicClient?.waitForTransactionReceipt({ hash: txHash });

      toast.dismiss();
      toast.success("Campaign created!");
      resetForm();
      router.push("/campaigns");
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a23] to-black p-6 flex flex-col items-center justify-center">
      <Toaster position="top-center" />
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8">
        {/* === Left: Form === */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Create Campaign</h1>
            <div className="space-x-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  step === "simple"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
                onClick={() => {
                  setStep("simple");
                  setMode("Normal");
                  setCreatorFeePercent(70);
                }}
              >
                Simple
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  step === "advanced"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
                onClick={() => setStep("advanced")}
              >
                Advanced
              </button>
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
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="preview"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              )}

              <input
                placeholder="Campaign Title"
                className="bg-gray-800 p-3 rounded-xl text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                placeholder="Coin Name"
                className="bg-gray-800 p-3 rounded-xl text-white"
                value={coinName}
                onChange={(e) => setCoinName(e.target.value)}
              />
              <input
                placeholder="Token Symbol"
                maxLength={6}
                className="bg-gray-800 p-3 rounded-xl text-white"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
              />
              <input
                placeholder="Goal Amount (ETH)"
                type="number"
                className="bg-gray-800 p-3 rounded-xl text-white"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  className="bg-gray-800 p-3 rounded-xl text-white"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="time"
                  className="bg-gray-800 p-3 rounded-xl text-white"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <input
                  type="date"
                  className="bg-gray-800 p-3 rounded-xl text-white"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <input
                  type="time"
                  className="bg-gray-800 p-3 rounded-xl text-white"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>

              {step === "advanced" && (
                <>
                  <div className="text-white font-medium">Campaign Mode</div>
                  <div className="flex gap-2">
                    {["Normal", "DegenA", "DegenB"].map((opt) => (
                      <button
                        key={opt}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          mode === opt
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300"
                        }`}
                        onClick={() => setMode(opt as any)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <label className="text-white font-medium">
                    Creator Fee Split
                  </label>
                  <DualFeeSlider value={creatorFee} onChange={setCreatorFee} />
                  {/* <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={creatorFeePercent}
                    onChange={(e) =>
                      setCreatorFeePercent(parseInt(e.target.value))
                    }
                    className="w-full accent-blue-500"
                    style={{
                      filter: "drop-shadow(0 0 4px rgba(59,130,246,0.8))",
                      transition: "all 0.2s ease-in-out",
                    }}
                  />
                  <div className="text-sm text-gray-400">
                    Creator: {creatorFeePercent}% | Burn:{" "}
                    {100 - creatorFeePercent}%
                  </div> */}
                </>
              )}

              {step === "simple" && (
                <div className="text-sm text-gray-400">
                  Mode: Normal | Creator fee 70%, Burn 30% (Free)
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

        {/* === Right: Preview === */}
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
          <div className="flex items-center justify-between text-sm text-purple-400 mb-1">
            <span>🚀 Fair Launch Active</span>
            <span className="text-red-400">0 / {goalAmount || "?"} ETH</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full" style={{ width: `0%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
