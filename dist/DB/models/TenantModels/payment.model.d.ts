import { Document, HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export type PaymentDocument = Payment & Document;
export declare class Payment {
    tenantId: string;
    amount: number;
    type: 'subscription' | 'purchase' | 'other';
    status: 'completed' | 'failed' | 'pending';
    notes?: string;
    paidAt: Date;
    items: [string];
    countery: string;
    plan: string;
}
export type paymentDocument = HydratedDocument<Payment> & {
    _id: string;
};
export declare const paymentSchema: import("mongoose").Schema<Payment, Model<Payment, any, any, any, Document<unknown, any, Payment, any> & Payment & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Payment, Document<unknown, {}, import("mongoose").FlatRecord<Payment>, {}> & import("mongoose").FlatRecord<Payment> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const payment_MODEL = "payment_MODEL";
export declare const paymentModel: import("@nestjs/common").DynamicModule;
export declare const PaymentSchema: import("mongoose").Schema<Payment, Model<Payment, any, any, any, Document<unknown, any, Payment, any> & Payment & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Payment, Document<unknown, {}, import("mongoose").FlatRecord<Payment>, {}> & import("mongoose").FlatRecord<Payment> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const getPaymentModel: () => DataBaseRepository<paymentDocument>;
//# sourceMappingURL=payment.model.d.ts.map