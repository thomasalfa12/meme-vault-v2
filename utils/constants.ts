// export const UNLOCKER_FACTORY_ADDRESS = "0x14b0542c28a9e1b1febef659989c2a858a62c7f4"; // Ganti dengan address UnlockerTokenFactory lu
// export const MEME_CAMPAIGN_MANAGER_ADDRESS = "0xdeb4ed3f1f514750abe916d6b6c89bdd548a055d"; // Ganti dengan address MemeCampaignManager lu

// import UnlockerTokenFactoryABI from "../abi/UnlockerTokenFactory.json";
// import MemeCampaignManagerABI from "../abi/MemeCampaignManager.json";

// export { UnlockerTokenFactoryABI, MemeCampaignManagerABI };


import type { Abi } from "viem"; // <-- tambah ini
import MemeCampaignManager from "../abi/MemeCampaignManager.json";
import UnlockerTokenFactory from "../abi/UnlockerTokenFactory.json";

export const MEME_CAMPAIGN_MANAGER_ADDRESS = "0xdeb4ed3f1f514750abe916d6b6c89bdd548a055d";
export const UNLOCKER_FACTORY_ADDRESS = "0x14b0542c28a9e1b1febef659989c2a858a62c7f4";

// Solusi bener
export const MemeCampaignManagerABI = MemeCampaignManager as Abi;
export const UnlockerTokenFactoryABI = UnlockerTokenFactory as Abi;
