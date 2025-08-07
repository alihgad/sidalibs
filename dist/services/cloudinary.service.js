"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageStream = uploadImageStream;
const cloudinary_1 = require("cloudinary");
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
