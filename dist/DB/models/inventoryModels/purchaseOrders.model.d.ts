import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { DeliveryTime, PurchaseOrderStatus } from '../../../common/type';
export declare class PurchaseOrders {
    referenceNumber: string;
    supplier: {
        supplierId: Types.ObjectId;
        supplierName: string;
    };
    branch: {
        branchId: Types.ObjectId;
        branchName: string;
    };
    status: PurchaseOrderStatus;
    deliveryDate: Date;
    businessDate: Date;
    deliveryTime: DeliveryTime;
    createdBy: Types.ObjectId;
    additionalCost: number;
    notes?: string;
    items: {
        materialId: Types.ObjectId;
        materialName: string;
        code: string;
        availableQuantity: number;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
    }[];
    submittedBy?: Types.ObjectId;
    submittedAt?: Date;
    approvedBy?: Types.ObjectId;
    approvedAt?: Date;
    rejectedBy?: Types.ObjectId;
    rejectedAt?: Date;
    cancelledBy?: Types.ObjectId;
    cancelledAt?: Date;
}
export type PurchaseOrdersDocument = HydratedDocument<PurchaseOrders>;
export declare const PurchaseOrdersSchema: import("mongoose").Schema<PurchaseOrders, Model<PurchaseOrders, any, any, any, import("mongoose").Document<unknown, any, PurchaseOrders, any> & PurchaseOrders & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PurchaseOrders, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PurchaseOrders>, {}> & import("mongoose").FlatRecord<PurchaseOrders> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const PURCHASE_ORDERS_MODEL = "PURCHASE_ORDERS_MODEL";
export declare const PurchaseOrdersModel: import("@nestjs/common").DynamicModule;
export declare const getPurchaseOrdersModel: (businessNumber: string) => DataBaseRepository<PurchaseOrdersDocument>;
export declare const getPurchaseOrdersCollection: (businessNumber: string) => any;
//# sourceMappingURL=purchaseOrders.model.d.ts.map