import mongoose, { HydratedDocument, Types } from "mongoose";
import { DeliveryStatus, OrderStatus, OrderType } from "../../../common/type";
import { DataBaseRepository } from "../../DataBase.repository";
export declare class Order {
    referenceNumber: number;
    orderNumber: string;
    branch: {
        branchId: Types.ObjectId;
        name: string;
    };
    orderStatus: OrderStatus;
    statusHistory: {
        status: OrderStatus;
        timestamp: Date;
        userId?: Types.ObjectId;
        notes?: string;
    }[];
    orderType: OrderType;
    openedTime: Date;
    closedTime: Date;
    receivedTime: Date;
    visitorsCount: number;
    createdBy: Types.ObjectId;
    closedBy: Types.ObjectId;
    checkNumber: number;
    customer: {
        customerId: Types.ObjectId;
        name: string;
        phone: string;
        address: string;
    };
    deliveryStatus: DeliveryStatus;
    cancellationReason?: string;
    cancelledAt?: Date;
    cancelledBy?: Types.ObjectId;
    refundReason?: string;
    refundedAt?: Date;
    refundedBy?: Types.ObjectId;
    driver: {
        driverName: string;
        driverPhoneNumber: string;
    };
    subTotal: number;
    discount: number;
    totalFees: number;
    totalTaxes: number;
    roundingAmount: number;
    finalPrice: number;
    tags: Types.ObjectId[];
    products: {
        productId: Types.ObjectId;
        quantity: number;
        unitPrice: number;
        discount: number;
        total: number;
        note?: string;
        additions?: Types.ObjectId[];
    }[];
    taxes: {
        taxId: Types.ObjectId;
        taxName: string;
        taxValue: number;
    }[];
    payments: {
        paymentMethod: string;
        amount: number;
        reference?: string;
        timestamp: Date;
        status: string;
        refundReference?: Types.ObjectId;
        processingFee?: number;
    }[];
    createdAt: Date;
}
export declare const OrderSchema: mongoose.Schema<Order, mongoose.Model<Order, any, any, any, mongoose.Document<unknown, any, Order, any> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Order, mongoose.Document<unknown, {}, mongoose.FlatRecord<Order>, {}> & mongoose.FlatRecord<Order> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type OrderDocument = HydratedDocument<Order>;
export declare const getOrderModel: (bussinessNumber: string) => DataBaseRepository<mongoose.Document<unknown, {}, Order, {}> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=order.model.d.ts.map