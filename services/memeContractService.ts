import { Contract } from 'ethers';
import { parseEther } from 'ethers';
import memeCampaignManagerAbi from '../abi/MemeCampaignManager.json';
import { MEME_CAMPAIGN_MANAGER_ADDRESS } from '../utils/constants';

interface CreateCampaignParams {
  title: string;
  ipfsUrl: string;
  goalAmount: string;
  deadline: string;
  creator: string;
  signer: any; // nanti kita benerin
}

export async function createMemeCampaign({
  title,
  ipfsUrl,
  goalAmount,
  deadline,
  creator,
  signer,
}: CreateCampaignParams) {
  if (!signer) throw new Error('Wallet not connected');

  const contract = new Contract(
    MEME_CAMPAIGN_MANAGER_ADDRESS,
    memeCampaignManagerAbi,
    signer
  );

  const goalInWei = parseEther(goalAmount);

  const tx = await contract.createCampaign(
    title,
    ipfsUrl,
    goalInWei,
    Math.floor(new Date(deadline).getTime() / 1000), // convert to seconds
    creator
  );

  await tx.wait();
}
