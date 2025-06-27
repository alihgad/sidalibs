import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Coupon {
    name: string;
    code: string;
    discount: Types.ObjectId;
    maxUsage: number;
    startDate: Date;
    endDate: Date;
    isDeleted: boolean;
    isActive: boolean;
}
export type CouponDocument = HydratedDocument<Coupon> & {
    _id: string;
};
export declare const CouponSchema: import("mongoose").Schema<Coupon, Model<Coupon, any, any, any, import("mongoose").Document<unknown, any, Coupon, any> & Coupon & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Coupon, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Coupon>, {}> & import("mongoose").FlatRecord<Coupon> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const COUPON_MODEL = "Coupon";
export declare const CouponModel: import("@nestjs/common").DynamicModule;
export declare const getCouponModel: (businessNumber: string) => DataBaseRepository<CouponDocument>;
//# sourceMappingURL=coupon.model.d.ts.map