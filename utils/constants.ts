import type { Abi } from "viem";
import MemeCampaignManager from "../abi/MemeCampaignManager.json";

export const MEME_CAMPAIGN_MANAGER_ADDRESS = "0x073fccD3C7aFD66B05C761062E38C5B0B5AC075b";

export const MemeCampaignManagerABI = MemeCampaignManager.abi as Abi;
