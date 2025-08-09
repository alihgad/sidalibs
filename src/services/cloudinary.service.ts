import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // اسم الـ Cloud Name من حسابك
  api_key: process.env.CLOUDINARY_API_KEY,       // API Key
  api_secret: process.env.CLOUDINARY_API_SECRET, // API Secret
  secure: true, // يضمن إن الروابط هتكون https
});

export async function uploadImageStream(file: Express.Multer.File): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'sida-images' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result as UploadApiResponse)
      },
    );

    file.stream.pipe(uploadStream); // ✅ استخدم الخاصية مش method
  });
}
