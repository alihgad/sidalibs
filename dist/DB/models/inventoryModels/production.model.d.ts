import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ProductionStatus, ProductionType } from '../../../common/type';
export declare class Production {
    referenceNumber: string;
    status: ProductionStatus;
    type: ProductionType;
    branchId: Types.ObjectId;
    createdBy: Types.ObjectId;
    sendBy: Types.ObjectId;
    workDate: Date;
    createdAt: string;
    sendAt: string;
    totalCost: number;
    totalQuantity: number;
    materials: {
        materialId: Types.ObjectId;
        code: number;
        quantity: number;
        cost: number;
        finalCost: number;
    }[];
}
export type ProductionDocument = HydratedDocument<Production>;
export declare const ProductionSchema: import("mongoose").Schema<Production, Model<Production, any, any, any, import("mongoose").Document<unknown, any, Production, any> & Production & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Production, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Production>, {}> & import("mongoose").FlatRecord<Production> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const PRODUCTION_MODEL = "PRODUCTION_MODEL";
export declare const ProductionModel: import("@nestjs/common").DynamicModule;
export declare const getProductionModel: (businessNumber: string) => DataBaseRepository<ProductionDocument>;
//# sourceMappingURL=production.model.d.ts.map