import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class PriceAdjustment {
    referenceNumber: string;
    branch: Types.ObjectId;
    reason: Types.ObjectId;
    workDate: Date;
    createdBy: Types.ObjectId;
    sendBy: Types.ObjectId;
    sendAt: Date;
    productsCount: number;
    isSent: boolean;
    materials: {
        materialId: Types.ObjectId;
        name: string;
        oldPrice: number;
        newPrice: number;
        code: string;
        storageUnit: string;
    }[];
    createdAt?: Date;
    updatedAt?: Date;
}
export type PriceAdjustmentDocument = HydratedDocument<PriceAdjustment>;
export declare const PriceAdjustmentSchema: import("mongoose").Schema<PriceAdjustment, Model<PriceAdjustment, any, any, any, import("mongoose").Document<unknown, any, PriceAdjustment, any, {}> & PriceAdjustment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PriceAdjustment, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PriceAdjustment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PriceAdjustment> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const PRICE_ADJUSTMENT_MODEL = "PRICE_ADJUSTMENT_MODEL";
export declare const PriceAdjustmentModel: import("@nestjs/common").DynamicModule;
export declare const getPriceAdjustmentModel: (businessNumber: string) => DataBaseRepository<PriceAdjustmentDocument>;
export declare const getPriceAdjustmentCollection: (businessNumber: string) => any;
//# sourceMappingURL=PriceAdjustment.model.d.ts.map