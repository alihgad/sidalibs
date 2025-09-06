import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { DeliveryTime } from '../../../common/type';
export declare class Warehouse {
    name: string;
    secondaryName: string;
    endOfDayTime: DeliveryTime;
    referenceNumber: string;
    latitude: number;
    longitude: number;
    description?: string;
    address?: string;
    updatedBy?: Types.ObjectId;
    isDeleted: boolean;
    deletedBy?: Types.ObjectId;
    deletedAt?: Date;
}
export type WarehouseDocument = HydratedDocument<Warehouse>;
export declare const WarehouseSchema: import("mongoose").Schema<Warehouse, Model<Warehouse, any, any, any, import("mongoose").Document<unknown, any, Warehouse, any, {}> & Warehouse & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Warehouse, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Warehouse>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Warehouse> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const WAREHOUSE_MODEL = "WAREHOUSE_MODEL";
export declare const WarehouseModel: import("@nestjs/common").DynamicModule;
export declare const getWarehouseModel: (businessNumber: string) => DataBaseRepository<WarehouseDocument>;
//# sourceMappingURL=warehouse.model.d.ts.map