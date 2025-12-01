<<<<<<< HEAD


import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // Load env variables

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Main upload function
const uploadOnCloudinary = async (localFilePath) => {
  try {
    // If path is not valid
    if (!localFilePath) {
      console.error("❌ uploadOnCloudinary: No file path provided.");
      return null;
    }

    // Check if file exists before trying to upload
    if (!fs.existsSync(localFilePath)) {
      console.error("❌ uploadOnCloudinary: File does not exist at path:", localFilePath);
      return null;
    }

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // auto-detect image, video, etc.
      folder: "avatars",     // optional: put into a folder
    });

    // Delete local file after successful upload
    fs.unlinkSync(localFilePath);

    console.log("✅ File uploaded to Cloudinary:", response.secure_url);
    return response;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error.message || error);

    // Clean up the temp file if exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };
=======


import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // Load env variables

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Main upload function
const uploadOnCloudinary = async (localFilePath) => {
  try {
    // If path is not valid
    if (!localFilePath) {
      console.error("❌ uploadOnCloudinary: No file path provided.");
      return null;
    }

    // Check if file exists before trying to upload
    if (!fs.existsSync(localFilePath)) {
      console.error("❌ uploadOnCloudinary: File does not exist at path:", localFilePath);
      return null;
    }

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // auto-detect image, video, etc.
      folder: "avatars",     // optional: put into a folder
    });

    // Delete local file after successful upload
    fs.unlinkSync(localFilePath);

    console.log("✅ File uploaded to Cloudinary:", response.secure_url);
    return response;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error.message || error);

    // Clean up the temp file if exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };
>>>>>>> a44bf0de67fbc2d609efeb50a15bfa5ca0f8675d
