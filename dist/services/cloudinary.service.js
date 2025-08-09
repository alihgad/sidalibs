"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageStream = uploadImageStream;
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // اسم الـ Cloud Name من حسابك
    api_key: process.env.CLOUDINARY_API_KEY, // API Key
    api_secret: process.env.CLOUDINARY_API_SECRET, // API Secret
    secure: true, // يضمن إن الروابط هتكون https
});
async function uploadImageStream(file) {
    return new Promise((resolve, reject) => {
        // Check if file buffer exists
        if (!file.buffer) {
            return reject(new Error('File buffer is not available'));
        }
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            folder: 'sida-images',
            resource_type: 'auto' // Automatically detect file type
        }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
        // Create a readable stream from buffer
        const bufferStream = new stream_1.Readable();
        bufferStream.push(file.buffer);
        bufferStream.push(null); // End the stream
        bufferStream.pipe(uploadStream);
    });
}
