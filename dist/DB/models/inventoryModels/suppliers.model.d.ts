import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Supplier {
    name: string;
    companyName: string;
    supplierCode: string;
    contactName: string;
    phone: string;
    primaryEmail: string;
    secondaryEmails?: string;
    materials?: Types.ObjectId[];
    isDeleted: boolean;
}
export type SupplierDocument = HydratedDocument<Supplier> & {
    _id: string;
};
export declare const SupplierSchema: import("mongoose").Schema<Supplier, Model<Supplier, any, any, any, import("mongoose").Document<unknown, any, Supplier, any> & Supplier & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Supplier, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Supplier>, {}> & import("mongoose").FlatRecord<Supplier> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const SUPPLIER_MODEL = "Supplier";
export declare const SupplierModel: import("@nestjs/common").DynamicModule;
export declare const getSuppliersModel: (businessNumber: string) => DataBaseRepository<SupplierDocument>;
//# sourceMappingURL=suppliers.model.d.ts.map