import { Schema, Model, Document } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export interface Supplier extends Document {
    supplierCode: string;
    name: string;
    phone: string;
    email?: string;
    address?: string;
    contactPerson?: string;
    totalOrders: number;
    lastOrder?: Date;
    accountBalance: number;
    isDeleted: boolean;
    isBlacklisted: boolean;
    creditAccount: boolean;
    notes?: string;
}
export declare const supplierSchema: Schema<Supplier, Model<Supplier, any, any, any, Document<unknown, any, Supplier, any> & Supplier & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Supplier, Document<unknown, {}, import("mongoose").FlatRecord<Supplier>, {}> & import("mongoose").FlatRecord<Supplier> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export type SupplierDocument = Supplier & Document;
export declare const getSupplierModel: (businessNumber: string) => DataBaseRepository<SupplierDocument>;
//# sourceMappingURL=supplier.model.d.ts.map