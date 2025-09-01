import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { Express } from 'express'
import * as fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // اسم الـ Cloud Name من حسابك
  api_key: process.env.CLOUDINARY_API_KEY,       // API Key
  api_secret: process.env.CLOUDINARY_API_SECRET, // API Secret
  secure: true, // يضمن إن الروابط هتكون https
});

export async function uploadImageStream(file: Express.Multer.File): Promise<UploadApiResponse> {

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'sida-images',
        resource_type: 'auto' // Automatically detect file type
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result as UploadApiResponse)
      },
    );

    // Handle both memory storage (buffer) and disk storage (path)
    if (file.buffer) {
      // Memory storage: use buffer

      const bufferStream = new Readable();
      bufferStream.push(file.buffer);
      bufferStream.push(null); // End the stream
      bufferStream.pipe(uploadStream);
    } else if (file.path) {
      // Disk storage: read from file path

      const fileStream = fs.createReadStream(file.path);
      fileStream.pipe(uploadStream);
    } else {
      // Neither buffer nor path available
      reject(new Error('File data is not available. File must have either buffer (memory storage) or path (disk storage). Please check your Multer configuration.'));
    }
  });
}

// Function to delete image from Cloudinary
export async function deleteImage(publicId: string): Promise<any> {
  try {

    const result = await cloudinary.uploader.destroy(publicId);

    return result;
  } catch (error) {

    throw error;
  }
}

// Function to delete multiple images from Cloudinary
export async function deleteMultipleImages(publicIds: string[]): Promise<any> {
  try {

    const result = await cloudinary.api.delete_resources(publicIds);

    return result;
  } catch (error) {

    throw error;
  }
}

// Function to delete all images in a folder
export async function deleteFolderImages(folderPath: string): Promise<any> {
  try {

    const result = await cloudinary.api.delete_resources_by_prefix(folderPath);

    return result;
  } catch (error) {

    throw error;
  }
}






