import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';


export async function uploadImageStream(file: Express.Multer.File): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'sida-images' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result as UploadApiResponse);
      },
    );

    file.stream.pipe(uploadStream); // ✅ استخدم الخاصية مش method
  });
}
