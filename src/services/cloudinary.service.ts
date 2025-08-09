import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // اسم الـ Cloud Name من حسابك
  api_key: process.env.CLOUDINARY_API_KEY,       // API Key
  api_secret: process.env.CLOUDINARY_API_SECRET, // API Secret
  secure: true, // يضمن إن الروابط هتكون https
});

export async function uploadImageStream(file: Express.Multer.File): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    // Check if file buffer exists
    if (!file.buffer) {
      return reject(new Error('File buffer is not available'));
    }

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

    // Create a readable stream from buffer
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null); // End the stream
    bufferStream.pipe(uploadStream);
  });
}

