// src/hooks/useWallet.ts
import { useAccount, useWalletClient } from 'wagmi';

export function useWallet() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const signer = walletClient; // mirip signer di ethers.js

  return {
    account: address,
    signer,
  };
}
