import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { InventoryCountStatus } from '../../../common/type';
export declare class InventoryCount {
    refrenceNumber: string;
    branch: {
        branchId: Types.ObjectId;
        branchName: string;
    };
    status: InventoryCountStatus;
    items: {
        itemId: Types.ObjectId;
        itemName: string;
        itemCode: string;
        itemStorageUnit: string;
        itemInputQuantity: number;
        itemQuantity: number;
        itemVarianceQuantity: number;
        itemVariancePercentage: number;
        itemVarianceCost: number;
        itemCost: number;
    }[];
    workDate: Date;
    createdBy: Types.ObjectId;
    isSubmitted: boolean;
    submittedBy?: Types.ObjectId;
    submittedAt?: Date;
    totalVarianceCost: number;
    itemsCount: number;
    isDeleted: boolean;
    deletedBy?: Types.ObjectId;
    deletedAt?: Date;
    notes?: string;
}
export type InventoryCountDocument = HydratedDocument<InventoryCount>;
export declare const InventoryCountSchema: import("mongoose").Schema<InventoryCount, Model<InventoryCount, any, any, any, import("mongoose").Document<unknown, any, InventoryCount, any> & InventoryCount & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InventoryCount, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<InventoryCount>, {}> & import("mongoose").FlatRecord<InventoryCount> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const INVENTORY_COUNT_MODEL = "InventoryCount";
export declare const InventoryCountModel: import("@nestjs/common").DynamicModule;
export declare const getInventoryCountModel: (businessNumber: string) => DataBaseRepository<InventoryCountDocument>;
//# sourceMappingURL=inventoryCount.model.d.ts.map