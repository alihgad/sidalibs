import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class ProductCategory {
    name: string;
    secondaryName?: string;
    referenceNumber: string;
    isDeleted: boolean;
}
export type ProductCategoryDocument = HydratedDocument<ProductCategory> & {
    _id: string;
};
export declare const ProductCategorySchema: import("mongoose").Schema<ProductCategory, Model<ProductCategory, any, any, any, import("mongoose").Document<unknown, any, ProductCategory, any> & ProductCategory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductCategory, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProductCategory>, {}> & import("mongoose").FlatRecord<ProductCategory> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Product_CATEGORY_MODEL = "ProductCategory";
export declare const ProductCategoryModel: import("@nestjs/common").DynamicModule;
export declare const getProductCategoriesModel: (businessNumber: string) => DataBaseRepository<ProductCategoryDocument>;
//# sourceMappingURL=categories.model.d.ts.map