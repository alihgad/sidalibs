import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { TransferStatus } from '../../../common/type';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'transferOrders'
})
export class TransferOrder {
    @Prop({ required: true, type: String, unique: true, index: true })
    referenceNumber!: string; // رقم أمر النقل - Transfer order number

    @Prop({
        required: true, type: {
            wareHouseId: String,
            wareHouseName: String
        }
    })
    wareHouse!: {
        wareHouseId: string,
        wareHouseName: string
    }

    @Prop({
        required: true, type: {
            destinationId: String,
            destinationName: String
        }
    })
    destination!: {
        destinationId: string,
        destinationName: string
    }

    @Prop({ required: true, type: Date })
    workDate!: Date;

    @Prop({ required: true, type: {
        userId: String,
        userName: String
    } })
    createdBy!: {
        userId: string,
        userName: string
    };

    @Prop({ type: String })
    notes?: string;

    @Prop({  type: String , default: TransferStatus.DRAFT})
    status!: TransferStatus;

    @Prop({ required: true, type: [{
        itemId: String,
        itemName: String,
        itemCode: String,
        quantity: Number,
        availableQuantity: Number,
    }] })
    items!: {
        itemId: string,
        itemName: string,
        itemCode: string,
        quantity: number,
        availableQuantity: number,
    }[];

    @Prop({ type: Boolean, default: false })
    isSubmitted!: boolean;

    @Prop({ type: String })
    submittedBy?: string;

    @Prop({ type: Date })
    submittedAt?: Date;

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean; // محذوف أم لا - Soft delete flag

    @Prop({ type: Date })
    deletedAt?: Date; // تاريخ الحذف - Deletion date

}

export type TransferOrderDocument = HydratedDocument<TransferOrder>;
export const TransferOrderSchema = SchemaFactory.createForClass(TransferOrder);

// Indexes for better performance
TransferOrderSchema.index({ referenceNumber: 1 });
TransferOrderSchema.index({ status: 1 });
TransferOrderSchema.index({ 'wareHouse.wareHouseId': 1 });
TransferOrderSchema.index({ 'destination.destinationId': 1 });
TransferOrderSchema.index({ workDate: 1 });
TransferOrderSchema.index({ 'createdBy.userId': 1 });
TransferOrderSchema.index({ isSubmitted: 1 });
TransferOrderSchema.index({ submittedBy: 1 });
TransferOrderSchema.index({ submittedAt: 1 });
TransferOrderSchema.index({ isDeleted: 1 });
TransferOrderSchema.index({ deletedAt: 1 });
TransferOrderSchema.index({ createdAt: -1 });

// Compound indexes
TransferOrderSchema.index({ 'wareHouse.wareHouseId': 1, status: 1 });
TransferOrderSchema.index({ 'destination.destinationId': 1, status: 1 });
TransferOrderSchema.index({ referenceNumber: 1, isDeleted: 1 }, { unique: true });
TransferOrderSchema.index({ status: 1, isSubmitted: 1 });
TransferOrderSchema.index({ status: 1, isDeleted: 1 });
TransferOrderSchema.index({ workDate: 1, status: 1 });
TransferOrderSchema.index({ 'createdBy.userId': 1, status: 1 });

export const TRANSFER_ORDER_MODEL = 'TRANSFER_ORDER_MODEL';
export const TransferOrderModel = MongooseModule.forFeature([
    { name: 'TransferOrder', schema: TransferOrderSchema }
]);

export const getTransferOrderModel = (businessNumber: string): DataBaseRepository<TransferOrderDocument> => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in transfer order model');
    }
    let connection = ConnectionManager.getConnection(businessNumber);

    // Register required models for refs
    if (!connection.models['Materials']) {
        const { MaterialsSchema } = require('./materials.model');
        connection.model('Materials', MaterialsSchema);
    }
    if (!connection.models['User']) {
        const { UserSchema } = require('../userModels/users.model');
        connection.model('User', UserSchema);
    }

    const model = connection.models['TransferOrder'] || connection.model('TransferOrder', TransferOrderSchema) as unknown as Model<TransferOrderDocument>;
    return new DataBaseRepository<TransferOrderDocument>(model);
}





