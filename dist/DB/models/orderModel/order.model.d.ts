import mongoose, { HydratedDocument, Types } from "mongoose";
import { DeliveryStatus } from "../../../common/type";
import { DataBaseRepository } from "../../DataBase.repository";
export declare class Order {
    refranceNumber: number;
    orderNumber: string;
    branch: {
        branchId: Types.ObjectId;
        name: string;
    };
    orderStatus: string;
    orderType: string;
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
    deriver: {
        driverName: string;
        driberPhoneNumber: string;
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
        price: number;
        discount: number;
        note: string;
    }[];
    taxes: {
        taxId: Types.ObjectId;
        taxName: string;
        taxValue: number;
    }[];
    payments: {
        name: string;
        value: number;
        addedAt: Date;
        refundReferenceNumber?: Types.ObjectId;
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