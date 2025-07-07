import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class ProductGroup {
    name: string;
    secondaryName?: string;
    isDeleted: boolean;
}
export type ProductGroupDocument = HydratedDocument<ProductGroup> & {
    _id: string;
};
export declare const ProductGroupSchema: import("mongoose").Schema<ProductGroup, Model<ProductGroup, any, any, any, import("mongoose").Document<unknown, any, ProductGroup, any> & ProductGroup & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductGroup, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProductGroup>, {}> & import("mongoose").FlatRecord<ProductGroup> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Product_GROUP_MODEL = "ProductGroup";
export declare const ProductGroupModel: import("@nestjs/common").DynamicModule;
export declare const getProductGroupsModel: (businessNumber: string) => DataBaseRepository<ProductGroupDocument>;
//# sourceMappingURL=groups.model.d.ts.map