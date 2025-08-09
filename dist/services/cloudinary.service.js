"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageStream = uploadImageStream;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // اسم الـ Cloud Name من حسابك
    api_key: process.env.CLOUDINARY_API_KEY, // API Key
    api_secret: process.env.CLOUDINARY_API_SECRET, // API Secret
    secure: true, // يضمن إن الروابط هتكون https
});
async function uploadImageStream(file) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder: 'sida-images' }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
        file.stream.pipe(uploadStream); // ✅ استخدم الخاصية مش method
    });
}
