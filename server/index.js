/**
 * SOLANA FORGE BACKEND
 * Handles secure file uploads to Irys (Arweave) and metadata generation.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const Irys = require('@irys/sdk');

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 3001;

// Allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:3000', // Adjust to your frontend URL
}));

app.use(express.json());

// --- IRYS CONFIGURATION ---
// You need a private key in your .env file: PRIVATE_KEY=...
const getIrys = async () => {
  const network = "devnet"; // Change to "mainnet" for production
  const token = "solana";
 
  const irys = new Irys({
    network, 
    token, 
    key: process.env.PRIVATE_KEY, 
    config: { providerUrl: "https://api.devnet.solana.com" } 
  });
  return irys;
};

// --- ENDPOINTS ---

// 1. Upload Image
app.post('/api/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Uploading image to Irys...");
    const irys = await getIrys();
    
    // Fund Irys node (Check balance and fund if needed in production)
    // const size = req.file.size;
    // const price = await irys.getPrice(size);
    // await irys.fund(price);

    const response = await irys.uploadFile(req.file.path);
    const fileUrl = `https://gateway.irys.xyz/${response.id}`;
    
    // Cleanup temp file
    fs.unlinkSync(req.file.path);

    console.log("Image uploaded:", fileUrl);
    res.json({ url: fileUrl });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Failed to upload image to storage" });
  }
});

// 2. Upload Metadata JSON
app.post('/api/upload-metadata', async (req, res) => {
  try {
    const metadata = req.body;
    
    if (!metadata || !metadata.name) {
      return res.status(400).json({ error: "Invalid metadata" });
    }

    console.log("Uploading metadata JSON...");
    const irys = await getIrys();
    const metadataString = JSON.stringify(metadata);
    
    const response = await irys.upload(metadataString);
    const metadataUrl = `https://gateway.irys.xyz/${response.id}`;

    console.log("Metadata uploaded:", metadataUrl);
    res.json({ url: metadataUrl });

  } catch (error) {
    console.error("Metadata Error:", error);
    res.status(500).json({ error: "Failed to upload metadata" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});