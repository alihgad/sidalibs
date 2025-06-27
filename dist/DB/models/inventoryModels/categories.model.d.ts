import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class inventoryCategory {
    name: string;
    secondaryName?: string;
    referenceNumber: string;
    isDeleted: boolean;
}
export type inventoryCategoryDocument = HydratedDocument<inventoryCategory> & {
    _id: string;
};
export declare const inventoryCategorySchema: import("mongoose").Schema<inventoryCategory, Model<inventoryCategory, any, any, any, import("mongoose").Document<unknown, any, inventoryCategory, any> & inventoryCategory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, inventoryCategory, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<inventoryCategory>, {}> & import("mongoose").FlatRecord<inventoryCategory> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const inventory_CATEGORY_MODEL = "inventoryCategory";
export declare const inventoryCategoryModel: import("@nestjs/common").DynamicModule;
export declare const getinventoryCategoriesModel: (businessNumber: string) => DataBaseRepository<inventoryCategoryDocument>;
//# sourceMappingURL=categories.model.d.ts.map