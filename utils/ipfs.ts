import axios from "axios";

const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID!;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET!;
const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfsEndpoint = process.env.NEXT_PUBLIC_INFURA_IPFS_ENDPOINT || "https://ipfs.infura.io:5001";

export async function uploadFileToIPFS(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${ipfsEndpoint}/api/v0/add`, formData, {
    headers: {
      "Authorization": auth,
      "Content-Type": "multipart/form-data",
    },
  });

  const cid = res.data.Hash;
  return `https://ipfs.io/ipfs/${cid}`;
}
export async function fetchMetadataFromIPFS(cid: string) {
  const url = `https://ipfs.io/ipfs/${cid}`;
  const res = await axios.get(url);
  return res.data;
}

export async function uploadMetadataToIPFS(metadata: object) {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
  formData.append("file", blob);

  const res = await axios.post(`${ipfsEndpoint}/api/v0/add`, formData, {
    headers: {
      "Authorization": auth,
      "Content-Type": "multipart/form-data",
    },
  });

  const cid = res.data.Hash;
  return `https://ipfs.io/ipfs/${cid}`;
}
