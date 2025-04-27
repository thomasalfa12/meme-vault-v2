import axios from 'axios';

export async function uploadToIPFS(file: File): Promise<string> {
  const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID!;
  const projectSecret = process.env.NEXT_PUBLIC_IPFS_PROJECT_SECRET!;

  const auth = 'Basic ' + Buffer.from(`${projectId}:${projectSecret}`).toString('base64');

  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('https://ipfs.infura.io:5001/api/v0/add', formData, {
    headers: {
      Authorization: auth,
      'Content-Type': 'multipart/form-data',
    },
  });

  const cid = response.data.Hash;
  return `https://ipfs.io/ipfs/${cid}`;
}
