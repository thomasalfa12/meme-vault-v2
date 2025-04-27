// src/services/ipfsService.ts

// Ini dummy upload ke IPFS (nanti bisa ganti pake real API seperti web3.storage)
export async function uploadToIPFS(file: File): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://ipfs.io/ipfs/fakeCID/${file.name}`);
      }, 1000);
    });
  }
  