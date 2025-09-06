import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Brand {
    name: string;
    type: string;
}
export type BrandDocument = HydratedDocument<Brand> & {
    _id: string;
};
export declare const BrandSchema: import("mongoose").Schema<Brand, Model<Brand, any, any, any, import("mongoose").Document<unknown, any, Brand, any, {}> & Brand & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Brand, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Brand>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Brand> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Brand_MODEL = "Brand_MODEL";
export declare const BrandModel: import("@nestjs/common").DynamicModule;
export declare const getBrandModel: (businessNumber: string) => DataBaseRepository<BrandDocument>;
//# sourceMappingURL=brand.model.d.ts.map