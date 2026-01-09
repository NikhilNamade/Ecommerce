import multer from "multer";
import cloudinary from "../config/cloudinary.config.js";


export const upload = multer();

export const uploadCloudinary = async (file) => {
  if (!file) throw new Error("No file provided");

  // ✅ allow only images
  if (!file.mimetype.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: process.env.CLODINARY_FOLDER, resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    ).end(file.buffer);
  });
};
