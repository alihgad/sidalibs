import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Sales {
    invoiceNumber: string;
    cashierId: Types.ObjectId;
    branchId: Types.ObjectId;
    customerId?: Types.ObjectId;
    totalAmount: number;
    taxAmount: number | null;
    discountAmount: number | null;
    finalAmount: number;
    paymentMethod: string | null;
    status: string | null;
    items: {
        productId: Types.ObjectId;
        productName: string;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
        discount: number;
        tax: number;
    }[];
    notes?: string;
    completedAt?: Date;
    cancelledAt?: Date;
    cancellationReason?: string;
    cancelledBy?: Types.ObjectId;
    isRefunded: boolean;
    refundedAt?: Date;
    refundedBy?: Types.ObjectId;
    refundReason?: string;
}
export type SalesDocument = HydratedDocument<Sales>;
export declare const SalesSchema: import("mongoose").Schema<Sales, Model<Sales, any, any, any, import("mongoose").Document<unknown, any, Sales, any> & Sales & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Sales, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Sales>, {}> & import("mongoose").FlatRecord<Sales> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const SALES_MODEL = "SALES_MODEL";
export declare const SalesModel: import("@nestjs/common").DynamicModule;
export declare const getSalesModel: (businessNumber: string) => DataBaseRepository<SalesDocument>;
//# sourceMappingURL=sales.model.d.ts.map