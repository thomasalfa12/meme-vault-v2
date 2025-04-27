import { useCallback } from 'react';
import { ethers } from 'ethers';
import UniswapRouterAbi from '../abi/UniswapRouter.json';

// Ganti ini ke address UniswapV2/V3 router sesuai chain
const UNISWAP_ROUTER_ADDRESS = '0xYourRouterAddressHere';

interface UniswapRouter extends ethers.BaseContract {
  swapExactETHForTokens(
    amountOutMin: bigint,
    path: string[],
    to: string,
    deadline: bigint,
    overrides: { value: bigint }
  ): Promise<ethers.TransactionResponse>;
}

export function useUniswapHook(provider: ethers.JsonRpcProvider, signer: ethers.JsonRpcSigner) {
  const swapExactETHForTokens = useCallback(
    async (amountOutMin: bigint, path: string[], to: string) => {
      try {
        const router = new ethers.Contract(
          UNISWAP_ROUTER_ADDRESS,
          UniswapRouterAbi,
          provider
        ).connect(signer) as UniswapRouter;

        const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 5); // 5 menit dari sekarang

        const tx = await router.swapExactETHForTokens(
          amountOutMin,
          path,
          to,
          deadline,
          { value: amountOutMin } // Jumlah ETH yang dikirim
        );

        await tx.wait();
        console.log('Swap berhasil:', tx.hash);
      } catch (error) {
        console.error('Swap gagal:', error);
        throw error;
      }
    },
    [provider, signer]
  );

  return {
    swapExactETHForTokens,
  };
}
