import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { DiscountAppliesTo, DiscountType } from '../../../common/type';
export declare class Discount {
    name: string;
    appliesTo: DiscountAppliesTo[];
    secondaryName?: string;
    type: DiscountType[];
    referenceNumber?: string;
    isTaxable: boolean;
    isDeleted: boolean;
}
export type DiscountDocument = HydratedDocument<Discount> & {
    _id: string;
};
export declare const DiscountSchema: import("mongoose").Schema<Discount, Model<Discount, any, any, any, import("mongoose").Document<unknown, any, Discount, any> & Discount & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Discount, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Discount>, {}> & import("mongoose").FlatRecord<Discount> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const DISCOUNT_MODEL = "Discount";
export declare const DiscountModel: import("@nestjs/common").DynamicModule;
export declare const getDiscountModel: (businessNumber: string) => DataBaseRepository<DiscountDocument>;
//# sourceMappingURL=discounts.model.d.ts.map