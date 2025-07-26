import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class InventorySpot {
    branch: {
        branchId: Types.ObjectId;
        branchName: string;
    };
    workDate: Date;
    createdBy: Types.ObjectId;
    sendBy: Types.ObjectId;
    sendAt: Date;
    isDeleted: boolean;
    totalDiffCost: string;
    items: {
        materialId: Types.ObjectId;
        materialName: String;
        materialCode: String;
        insertedQuantity: String;
        materialQuantity: String;
        diffQuantity: String;
        diffPercent: String;
        diffCost: String;
    }[];
    deletedBy: Types.ObjectId;
    deletedAt: Date;
}
export type InventorySpotDocument = HydratedDocument<InventorySpot>;
export declare const InventorySpotSchema: import("mongoose").Schema<InventorySpot, Model<InventorySpot, any, any, any, import("mongoose").Document<unknown, any, InventorySpot, any> & InventorySpot & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InventorySpot, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<InventorySpot>, {}> & import("mongoose").FlatRecord<InventorySpot> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const INVENTORY_SPOT_MODEL = "INVENTORY_SPOT_MODEL";
export declare const InventorySpotModel: import("@nestjs/common").DynamicModule;
export declare const getInventorySpotModel: (businessNumber: string) => DataBaseRepository<InventorySpotDocument>;
//# sourceMappingURL=inventorySpot.model.d.ts.map