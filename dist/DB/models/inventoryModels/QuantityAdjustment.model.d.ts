import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class QuantityAdjustment {
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
        quantity: number;
        code: string;
        price: number;
        total: number;
    }[];
}
export type QuantityAdjustmentDocument = HydratedDocument<QuantityAdjustment>;
export declare const QuantityAdjustmentSchema: import("mongoose").Schema<QuantityAdjustment, Model<QuantityAdjustment, any, any, any, import("mongoose").Document<unknown, any, QuantityAdjustment, any, {}> & QuantityAdjustment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, QuantityAdjustment, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<QuantityAdjustment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<QuantityAdjustment> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const QUANTITY_ADJUSTMENT_MODEL = "QUANTITY_ADJUSTMENT_MODEL";
export declare const QuantityAdjustmentModel: import("@nestjs/common").DynamicModule;
export declare const getQuantityAdjustmentModel: (businessNumber: string) => DataBaseRepository<QuantityAdjustmentDocument>;
//# sourceMappingURL=QuantityAdjustment.model.d.ts.map