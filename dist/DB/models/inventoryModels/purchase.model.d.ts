import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { PurchaseStatus, PurchaseType } from '../../../common/type';
export declare class Purchase {
    referenceNumber: string;
    supplier: {
        supplierId: Types.ObjectId;
        supplierName: string;
    };
    branch: {
        branchId: Types.ObjectId;
        branchName: string;
    };
    type: PurchaseType;
    status: PurchaseStatus;
    purchaseDate: Date;
    totalAmount: number;
    taxAmount: number;
    discountAmount: number;
    finalAmount: number;
    items: {
        materialId: Types.ObjectId;
        materialName: string;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
        receivedQuantity: number;
    }[];
    createdBy: Types.ObjectId;
    receivedBy?: Types.ObjectId;
    receivedAt?: Date;
    notes?: string;
    returnedBy?: Types.ObjectId;
    returnedAt?: Date;
    returnedNotes?: string;
    invoiceDate?: Date;
    invoiceNumber?: string;
    additionalCosts?: string;
    paidTaxAmount?: number;
}
export type PurchaseDocument = HydratedDocument<Purchase>;
export declare const PurchaseSchema: import("mongoose").Schema<Purchase, Model<Purchase, any, any, any, import("mongoose").Document<unknown, any, Purchase, any> & Purchase & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Purchase, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Purchase>, {}> & import("mongoose").FlatRecord<Purchase> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const PURCHASE_MODEL = "PURCHASE_MODEL";
export declare const PurchaseModel: import("@nestjs/common").DynamicModule;
export declare const getPurchaseModel: (businessNumber: string) => DataBaseRepository<PurchaseDocument>;
//# sourceMappingURL=purchase.model.d.ts.map