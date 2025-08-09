import { UploadApiResponse } from 'cloudinary';
export declare function uploadImageStream(file: Express.Multer.File): Promise<UploadApiResponse>;
export declare function deleteImage(publicId: string): Promise<any>;
export declare function deleteMultipleImages(publicIds: string[]): Promise<any>;
export declare function deleteFolderImages(folderPath: string): Promise<any>;
//# sourceMappingURL=cloudinary.service.d.ts.map