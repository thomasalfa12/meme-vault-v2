import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File as FormidableFile } from 'formidable';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data'; // <- ini dari NPM, bukan browser

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Form parse error' });

    const uploaded = files.file;
    if (!uploaded) return res.status(400).json({ error: 'No file uploaded' });

    const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;
    const stream = fs.createReadStream(file.filepath);

    const formData = new FormData();
    formData.append('file', stream, file.originalFilename || 'upload');

    try {
      const ipfsRes = await axios.post(
        `${process.env.IPFS_ENDPOINT}/api/v0/add`,
        formData,
        {
          auth: {
            username: process.env.IPFS_PROJECT_ID!,
            password: process.env.IPFS_PROJECT_SECRET!,
          },
          headers: formData.getHeaders(), // <- ini sekarang valid
        }
      );

      const ipfsHash = ipfsRes.data.Hash;
      res.status(200).json({ url: `https://ipfs.io/ipfs/${ipfsHash}` });
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: 'IPFS upload failed' });
    }
  });
}
