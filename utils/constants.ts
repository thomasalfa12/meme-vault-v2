import type { Abi } from "viem"; // <-- tambah ini
import MemeCampaignManager from "../abi/MemeCampaignManager.json";
import UnlockerTokenFactory from "../abi/UnlockerTokenFactory.json";

export const MEME_CAMPAIGN_MANAGER_ADDRESS = "0xadaddfe9a271523369a52246dc64408a26f9b98f";
export const UNLOCKER_FACTORY_ADDRESS = "0x7bdf631cc741a856bc64d8ebf15f4551d79ec2f0";

// Solusi bener
export const MemeCampaignManagerABI = MemeCampaignManager as Abi;
export const UnlockerTokenFactoryABI = UnlockerTokenFactory as Abi;
