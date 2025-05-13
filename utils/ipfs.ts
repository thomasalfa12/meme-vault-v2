export async function uploadFileToIPFS(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/ipfs/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to upload to IPFS: ${errorText}`);
  }

  const data = await res.json();
  return data.url;
}
