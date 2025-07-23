import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Warehouse {
    name: string;
    secondaryName: string;
    endOfDayTime: string;
    referenceNumber: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
    description?: string;
    address?: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type WarehouseDocument = HydratedDocument<Warehouse>;
export declare const WarehouseSchema: import("mongoose").Schema<Warehouse, Model<Warehouse, any, any, any, import("mongoose").Document<unknown, any, Warehouse, any> & Warehouse & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Warehouse, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Warehouse>, {}> & import("mongoose").FlatRecord<Warehouse> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const WAREHOUSE_MODEL = "WAREHOUSE_MODEL";
export declare const WarehouseModel: import("@nestjs/common").DynamicModule;
export declare const getWarehouseModel: (businessNumber: string) => DataBaseRepository<WarehouseDocument>;
//# sourceMappingURL=warehouse.model.d.ts.map