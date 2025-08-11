"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageStream = uploadImageStream;
exports.deleteImage = deleteImage;
exports.deleteMultipleImages = deleteMultipleImages;
exports.deleteFolderImages = deleteFolderImages;
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
const fs = __importStar(require("fs"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // اسم الـ Cloud Name من حسابك
    api_key: process.env.CLOUDINARY_API_KEY, // API Key
    api_secret: process.env.CLOUDINARY_API_SECRET, // API Secret
    secure: true, // يضمن إن الروابط هتكون https
});
async function uploadImageStream(file) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            folder: 'sida-images',
            resource_type: 'auto' // Automatically detect file type
        }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
        // Handle both memory storage (buffer) and disk storage (path)
        if (file.buffer) {
            // Memory storage: use buffer
            const bufferStream = new stream_1.Readable();
            bufferStream.push(file.buffer);
            bufferStream.push(null); // End the stream
            bufferStream.pipe(uploadStream);
        }
        else if (file.path) {
            // Disk storage: read from file path
            const fileStream = fs.createReadStream(file.path);
            fileStream.pipe(uploadStream);
        }
        else {
            // Neither buffer nor path available
            reject(new Error('File data is not available. File must have either buffer (memory storage) or path (disk storage). Please check your Multer configuration.'));
        }
    });
}
// Function to delete image from Cloudinary
async function deleteImage(publicId) {
    try {
        const result = await cloudinary_1.v2.uploader.destroy(publicId);
        return result;
    }
    catch (error) {
        throw error;
    }
}
// Function to delete multiple images from Cloudinary
async function deleteMultipleImages(publicIds) {
    try {
        const result = await cloudinary_1.v2.api.delete_resources(publicIds);
        return result;
    }
    catch (error) {
        throw error;
    }
}
// Function to delete all images in a folder
async function deleteFolderImages(folderPath) {
    try {
        const result = await cloudinary_1.v2.api.delete_resources_by_prefix(folderPath);
        return result;
    }
    catch (error) {
        throw error;
    }
}
