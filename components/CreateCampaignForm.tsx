'use client';

import { useState } from 'react';
import { uploadToIPFS } from '../utils/upload';

export default function CreateCampaignForm() {
  const [title, setTitle] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!file) {
        alert('Please upload a file.');
        return;
      }

      const fileUrl = await uploadToIPFS(file);

      console.log('Uploading campaign:', {
        title,
        goalAmount,
        deadline,
        fileUrl,
      });

      // TODO: panggil function smart contract untuk buat campaign
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <input
        type="text"
        placeholder="Campaign Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Goal Amount (ETH)"
        value={goalAmount}
        onChange={(e) => setGoalAmount(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="date"
        placeholder="Deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
        className="border p-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {loading ? 'Creating...' : 'Create Campaign'}
      </button>
    </form>
  );
}
