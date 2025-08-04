import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { TransferStatus, TransferType } from '../../../common/type';
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'transfers'
})
export class Transfer {
  @Prop({ required: true, type: String, unique: true  })
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

  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean; // محذوف أم لا - Soft delete flag

  @Prop({ type: Types.ObjectId, ref: 'User' })
  deletedBy?: Types.ObjectId; // المستخدم المحذوف - User who deleted

  @Prop({ type: Date })
  deletedAt?: Date; // تاريخ الحذف - Deletion date

  @Prop({ type: Boolean, default: false })
  isSend!: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  sendBy?: Types.ObjectId;

  @Prop({ type: Date })
  sendAt?: Date;

  @Prop({ type: Boolean, default: false })
  isReceived!: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  receivedBy?: Types.ObjectId;

  @Prop({ type: Date })
  receivedAt?: Date;

  @Prop({ type: Boolean, default: false })
  isRejected!: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  rejectedBy?: Types.ObjectId;

  @Prop({ type: Date })
  rejectedAt?: Date;
}

export type TransferDocument = HydratedDocument<Transfer>;
export const TransferSchema = SchemaFactory.createForClass(Transfer);



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
