/**
 * CONNECTS TO LOCAL BACKEND SERVER (server/index.js)
 * Switch 'USE_MOCK' to false to use the real backend.
 */

const API_URL = "http://localhost:3001/api";
const USE_MOCK = true; // <--- CHANGE THIS TO FALSE when backend is running

export const uploadToStorage = async (file: File | null): Promise<string> => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (file) {
          resolve(URL.createObjectURL(file)); 
        } else {
          resolve("https://picsum.photos/400/400");
        }
      }, 1500);
    });
  }

  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${API_URL}/upload-image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Upload failed");
    const data = await response.json();
    return data.url;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to connect to backend storage service");
  }
};

export const uploadMetadataJson = async (metadata: any): Promise<string> => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Uploaded Metadata Mock:", metadata);
        resolve(`https://arweave.net/mock-metadata-hash-${Date.now()}`);
      }, 1000);
    });
  }

  try {
    const response = await fetch(`${API_URL}/upload-metadata`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) throw new Error("Metadata upload failed");
    const data = await response.json();
    return data.url;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to connect to backend storage service");
  }
};