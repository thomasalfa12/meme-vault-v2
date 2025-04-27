import { useState, useEffect } from 'react';

// ⬇️ Tambahin ini untuk export type Campaign
export type Campaign = {
    id: string;
    name: string; // ⬅️ Tambah ini
    description: string; // ⬅️ Tambah ini
    title: string;
    goalAmount: string;
    raisedAmount: string;
    deadline: string;
    imageUrl: string;
  };

export function useCampaign(id: string) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    async function fetchCampaign() {
      // contoh fetch dummy
      setCampaign({
        id,
        name: 'Example Campaign Name',
        description: 'This is a description of the campaign.',
        title: 'Example Meme Campaign',
        goalAmount: '1',
        raisedAmount: '0.5',
        deadline: '2025-05-01',
        imageUrl: 'https://placekitten.com/400/300'
      });
      
    }
    fetchCampaign();
  }, [id]);

  return { campaign };
}
