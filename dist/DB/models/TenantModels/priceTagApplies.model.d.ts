import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class PriceTagApplies {
    name: string;
    secondName: string;
    orderTag: Types.ObjectId;
    autoApplyToNewBranches: boolean;
    specificBranches: Types.ObjectId[];
    isDeleted: boolean;
}
export type PriceTagAppliesDocument = HydratedDocument<PriceTagApplies> & {
    _id: string;
};
export declare const PriceTagAppliesSchema: import("mongoose").Schema<PriceTagApplies, Model<PriceTagApplies, any, any, any, import("mongoose").Document<unknown, any, PriceTagApplies, any, {}> & PriceTagApplies & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PriceTagApplies, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PriceTagApplies>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PriceTagApplies> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const PRICE_TAG_APPLIES_MODEL = "PriceTagApplies";
export declare const PriceTagAppliesModel: import("@nestjs/common").DynamicModule;
export declare const getPriceTagAppliesModel: (businessNumber: string) => DataBaseRepository<PriceTagAppliesDocument>;
//# sourceMappingURL=priceTagApplies.model.d.ts.map