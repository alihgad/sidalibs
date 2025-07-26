import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { TransferStatus, TransferType } from '../../../common/type';

// Enum for transfer status


@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'transfers'
})
export class Transfer {
  @Prop({ required: true, type: String, unique: true, index: true })
  referenceNumber!: string; // رقم مرجعي للنقل - Transfer reference number

  @Prop({ required: true, type: {
    sourceId: { type: Types.ObjectId },
    sourceName: { type: String }
  } })
  source!: {
    sourceId: Types.ObjectId;
    sourceName: string;
  };

  @Prop({ required: true, type: {
    destinationId: { type: Types.ObjectId },
    destinationName: { type: String }
  } })
  destination!:{
    destinationId: Types.ObjectId;
    destinationName: string;
  };

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  createdBy!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  submittedBy?: Types.ObjectId;

  @Prop({ type: Date })
  submittedAt?: Date;


  @Prop({ required: true, type: Date })
  workDate!: Date;

  
  @Prop({ type: String, required: true, enum: Object.values(TransferType) })
  transferType!: TransferType; // نوع النقل - Type of transfer

  @Prop({ type: String, required: true, enum: Object.values(TransferStatus), default: TransferStatus.DRAFT })
  status!: TransferStatus; // حالة النقل - Status



  // Transfer items
  @Prop({ type: [{
    materialId: { type: Types.ObjectId, ref: 'Materials' },
    materialName: { type: String },
    materialCode: { type: String },
    quantity: { type: Number, min: 0 },
    receivedQuantity: { type: Number, min: 0 },
    transferVariance: { type: Number, min: 0 },
    unitCost: { type: Number, min: 0 },
    totalCost: { type: Number, min: 0 },
  }] })
  items?: [{
    materialId: Types.ObjectId;
    materialName: string;
    materialCode: string;
    quantity: number;
    receivedQuantity: number;
    transferVariance: number;
    unitCost: number;
    totalCost: number;
  }];

 

  @Prop({ type: Date })
  dateDueToReceive?: Date;

  @Prop({ type: String })
  notes?: string;

  @Prop({ type: String })
  transferReceivingReference?: string;

  @Prop({ type: String })
  transferSendingReference?: string;


  @Prop({ type: Number })
  totalCost?: number;

  @Prop({ type: Number })
  totalItems?: number;




}

export type TransferDocument = HydratedDocument<Transfer>;
export const TransferSchema = SchemaFactory.createForClass(Transfer);

// Indexes for better performance
TransferSchema.index({ referenceNumber: 1 });
TransferSchema.index({ status: 1 });
TransferSchema.index({ transferType: 1 });
TransferSchema.index({ sourceLocationType: 1 });
TransferSchema.index({ sourceLocationId: 1 });
TransferSchema.index({ destinationLocationType: 1 });
TransferSchema.index({ destinationLocationId: 1 });
TransferSchema.index({ requestedDate: 1 });
TransferSchema.index({ approvedDate: 1 });
TransferSchema.index({ shippedDate: 1 });
TransferSchema.index({ receivedDate: 1 });
TransferSchema.index({ expectedDeliveryDate: 1 });
TransferSchema.index({ requestedBy: 1 });
TransferSchema.index({ approvedBy: 1 });
TransferSchema.index({ shippedBy: 1 });
TransferSchema.index({ receivedBy: 1 });
TransferSchema.index({ trackingNumber: 1 });
TransferSchema.index({ isDeleted: 1 });
TransferSchema.index({ createdAt: -1 });

// Compound indexes
TransferSchema.index({ sourceLocationId: 1, status: 1 });
TransferSchema.index({ destinationLocationId: 1, status: 1 });
TransferSchema.index({ referenceNumber: 1, isDeleted: 1 }, { unique: true });
TransferSchema.index({ status: 1, isDeleted: 1 });
TransferSchema.index({ requestedDate: 1, status: 1 });

export const TRANSFER_MODEL = 'TRANSFER_MODEL';
export const TransferModel = MongooseModule.forFeature([
  { name: 'Transfer', schema: TransferSchema }
]);

export const getTransferModel = (businessNumber: string): DataBaseRepository<TransferDocument> => {
  if (!businessNumber) {
    throw new Error('businessNumber is required in transfer model');
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  
  // Register required models for refs
  if (!connection.models['Warehouse']) {
    const { WarehouseSchema } = require('./warehouse.model');
    connection.model('Warehouse', WarehouseSchema);
  }
  if (!connection.models['Branch']) {
    const { BranchSchema } = require('../TenantModels/branch.model');
    connection.model('Branch', BranchSchema);
  }
  if (!connection.models['Materials']) {
    const { MaterialsSchema } = require('./materials.model');
    connection.model('Materials', MaterialsSchema);
  }
  if (!connection.models['User']) {
    const { UserSchema } = require('../userModels/users.model');
    connection.model('User', UserSchema);
  }

  const model = connection.models['Transfer'] || connection.model('Transfer', TransferSchema) as unknown as Model<TransferDocument>;
  return new DataBaseRepository<TransferDocument>(model);
} 