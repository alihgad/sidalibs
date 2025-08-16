import { getConnectionToken, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Model, Types } from "mongoose";
import { DeliveryStatus, OrderStatus, OrderType } from "../../../common/type";
import { ConnectionManager } from "../../connection.manager";
import { DataBaseRepository } from "../../DataBase.repository";




@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Order {
    @Prop({ trim: true })
    referenceNumber!: number;

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

    @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING, trim: true })
    orderStatus!: OrderStatus;

    @Prop({ type: [{
        status: { type: String, enum: OrderStatus, required: true },
        timestamp: { type: Date, default: Date.now },
        userId: { type: Types.ObjectId, ref: 'User' },
        notes: String
    }] })
    statusHistory!: {
        status: OrderStatus,
        timestamp: Date,
        userId?: Types.ObjectId,
        notes?: string
    }[]

    @Prop({ type: String, enum: OrderType, required: true, trim: true })
    orderType!: OrderType;

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

    @Prop({ trim: true })
    cancellationReason?: string;

    @Prop()
    cancelledAt?: Date;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    cancelledBy?: Types.ObjectId;

    @Prop({ trim: true })
    refundReason?: string;

    @Prop()
    refundedAt?: Date;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    refundedBy?: Types.ObjectId;
    @Prop({
        type: {
            driverName: String,
            driverPhoneNumber: String
        }
    })
    driver!: {
        driverName: string,
        driverPhoneNumber: string
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
        name: String,
        quantity: Number,
        unitPrice: Number,
        discount: Number,
        total: Number,
        note: String,
        additions: [{
            additionId: Types.ObjectId,
            name: String,
            price: Number
        }]
    }], ref: "products" })
    products!: {
        productId: Types.ObjectId,
        name: string,
        quantity: number,
        unitPrice: number,
        discount: number,
        total: number,
        note?: string,
        additions?: {
            additionId: Types.ObjectId,
            name: string,
            price: number
        }[]
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
        paymentMethod: { type: String, enum: ['cash', 'card', 'other'], required: true },
        amount: { type: Number, required: true, min: 0 },
        reference: String,
        timestamp: { type: Date, default: Date.now },
        status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'completed' },
        refundReference: Types.ObjectId,
        processingFee: Number
    }] })
    payments!: {
        paymentMethod: string,
        amount: number,
        reference?: string,
        timestamp: Date,
        status: string,
        refundReference?: Types.ObjectId,
        processingFee?: number
    }[]

    

}


export const OrderSchema = SchemaFactory.createForClass(Order);

// Pre-save hook to track status changes
OrderSchema.pre('save', function(next) {
    if (this.isModified('orderStatus')) {
        // Add to status history if status changed
        this.statusHistory.push({
            status: this.orderStatus,
            timestamp: new Date(),
            userId: this.get('modifiedBy'), // Will be set by the service
        });

        // Set cancellation/refund timestamps
        if (this.orderStatus === 'cancelled' && !this.cancelledAt) {
            this.cancelledAt = new Date();
        }
        if (this.orderStatus === 'refunded' && !this.refundedAt) {
            this.refundedAt = new Date();
        }
    }
    next();
});

export type OrderDocument = HydratedDocument<Order> 

export const getOrderModel=(bussinessNumber:string)=>{
    if(!bussinessNumber){
        throw new Error("bussinessNumber is required in Order model")
    }
    let connection = ConnectionManager.getConnection(bussinessNumber);
    const model = connection.models['Order'] || connection.model('Order', OrderSchema) as unknown as Model<OrderDocument>;
    return new DataBaseRepository<OrderDocument>(model);
}











