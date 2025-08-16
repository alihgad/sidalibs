import { getConnectionToken, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Model, Types } from "mongoose";
import { DeliveryStatus } from "../../../common/type";
import { ConnectionManager } from "../../connection.manager";
import { DataBaseRepository } from "../../DataBase.repository";




@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Order {
    @Prop({ trim: true })
    refranceNumber!: number;

    @Prop({ trim: true })
    orderNumber!: string;

    @Prop({
        type: {
            branchId: { type: Types.ObjectId, ref: 'Branch' },
            name: { type: String, required: true },
        }, trim: true
    })
    branch!: {
        branchId: Types.ObjectId;
        name: string;
    };

    @Prop({ trim: true })
    orderStatus!: string;

    @Prop({ trim: true })
    orderType!: string;

    @Prop({ trim: true })
    openedTime!: Date;

    @Prop({ trim: true })
    closedTime!: Date;

    @Prop({ trim: true })
    receivedTime!: Date;

    @Prop({ trim: true })
    visitorsCount!: number;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    closedBy!: Types.ObjectId;

    @Prop({ trim: true })
    checkNumber!: number;

    @Prop({
        type: {
            customerId: { type: Types.ObjectId, ref: 'Customer' },
            name: { type: String },
            phone: { type: String },
            address: { type: String },
        }
    })
    customer!: {
        customerId: Types.ObjectId;
        name: string;
        phone: string;
        address: string;
    };

    @Prop({ type: String, enum: DeliveryStatus, default: DeliveryStatus.PENDING, trim: true })
    deliveryStatus!: DeliveryStatus;
    @Prop({
        type: {
            driverName: String,
            driberPhoneNumber: String
        }
    })
    deriver!: {
        driverName: string,
        driberPhoneNumber: string
    }

    @Prop({ type: Number })
    subTotal!: number

    @Prop({ type: Number })
    discount!: number

    @Prop({ type: Number, default: 0 })
    totalFees!: number

    @Prop({ type: Number, default: 0 })
    totalTaxes!: number

    @Prop({ type: Number, default: 0 })
    roundingAmount!: number

    @Prop({ type: Number, default: 0 })
    finalPrice!: number


    @Prop({ type: [Types.ObjectId], ref: "tags" })
    tags!: Types.ObjectId[]

    @Prop({ type: [{
        productId: Types.ObjectId,
        quantity: Number,
        price: Number,
        discount: Number,
        note: String,
        total: Number,
    }], ref: "products" })
    products!: {
        productId: Types.ObjectId,
        quantity: number,
        price: number,
        discount: number,
        note: string,
    }[]

    @Prop({ type: [{
        taxId: Types.ObjectId,
        taxName: String,
        taxValue: Number,
    }], ref: "taxes" })
    taxes!: {
        taxId: Types.ObjectId,
        taxName: string,
        taxValue: number,
    }[]

    @Prop({ type: [{
        name: String,
        value: Number,
        addedAt: Date,
        refundReferenceNumber: Types.ObjectId
    }] })
    payments!: {
        name: string,
        value: number,
        addedAt: Date,
        refundReferenceNumber?: Types.ObjectId
    }[]

    

}


export const OrderSchema = SchemaFactory.createForClass(Order);
export type OrderDocument = HydratedDocument<Order> 

export const getOrderModel=(bussinessNumber:string)=>{
    if(!bussinessNumber){
        throw new Error("bussinessNumber is required in Order model")
    }
    let connection = ConnectionManager.getConnection(bussinessNumber);
    const model = connection.models['Order'] || connection.model('Order', OrderSchema) as unknown as Model<OrderDocument>;
    return new DataBaseRepository<OrderDocument>(model);
}











