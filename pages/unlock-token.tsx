import { useState } from "react";
import { useAccount, useConfig } from "wagmi";
import { writeContract } from "wagmi/actions";
import { UNLOCKER_FACTORY_ADDRESS } from "../utils/constants";
import { UnlockerTokenFactoryABI } from "../utils/constants";

export default function UnlockTokenPage() {
  const { address: userAddress } = useAccount();
  const config = useConfig();

  const [tokenAddress, setTokenAddress] = useState("");
  const [unlockAmount, setUnlockAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const unlockToken = async () => {
    if (!userAddress) {
      alert("Connect your wallet first");
      return;
    }

    try {
      setLoading(true);
      await writeContract(config, {
        abi: UnlockerTokenFactoryABI,
        address: UNLOCKER_FACTORY_ADDRESS,
        functionName: "unlockToken",
        args: [tokenAddress, BigInt(unlockAmount)],
      });
      alert("Token unlocked!");
    } catch (err) {
      console.error("Error unlocking token:", err);
      alert("Failed to unlock token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Unlock Token</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Token Address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Unlock Amount"
          value={unlockAmount}
          onChange={(e) => setUnlockAmount(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          onClick={unlockToken}
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Unlocking..." : "Unlock Token"}
        </button>
      </div>
    </div>
  );
}
