import { Document, Types } from 'mongoose';
export type WarehouseDocument = Warehouse & Document;
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
}
export declare const WarehouseSchema: import("mongoose").Schema<Warehouse, import("mongoose").Model<Warehouse, any, any, any, Document<unknown, any, Warehouse, any> & Warehouse & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Warehouse, Document<unknown, {}, import("mongoose").FlatRecord<Warehouse>, {}> & import("mongoose").FlatRecord<Warehouse> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=warehouse.model.d.ts.map