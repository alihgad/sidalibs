import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { DeliveryTime, PurchaseOrderStatus } from '../../../common/type';

// Delivery time enum (24 hours with 30-minute intervals)


// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'purchaseOrders'
})
export class PurchaseOrders {
  // Add your properties here
  @Prop({ type: String, required: true })
  referenceNumber!: string;

  @Prop({
    type: {
      supplierId: { type: Types.ObjectId, ref: 'Supplier', required: true },
      supplierName: { type: String, required: true },
    }, required: true
  })
  supplier!: {
    supplierId: Types.ObjectId;
    supplierName: string;
  };

  @Prop({
    type: {
      branchId: { type: Types.ObjectId, ref: 'Branch', required: true },
      branchName: { type: String, required: true },
    }, required: true
  })
  branch!: {
    branchId: Types.ObjectId;
    branchName: string;
  };

  @Prop({ type: String, required: true, enum: Object.values(PurchaseOrderStatus), default: PurchaseOrderStatus.DRAFT })
  status!: PurchaseOrderStatus;

  @Prop({ type: Date, required: true })
  deliveryDate!: Date;

  @Prop({ type: Date, required: true })
  businessDate!: Date;

  @Prop({ type: String, required: true, enum: Object.values(DeliveryTime) })
  deliveryTime!: DeliveryTime;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy!: Types.ObjectId;


  @Prop({ type: Number, min: 0, default: 0 })
  additionalCost!: number;


  @Prop({ type: String })
  notes?: string;

  @Prop({
    type: [{
      materialId: { type: Types.ObjectId, ref: 'Material' },
      materialName: { type: String },
      code: { type: String },
      availableQuantity: { type: Number, min: 0 },
      unitPrice: { type: Number, min: 0 },
      quantity: { type: Number, min: 1 },
      totalPrice: { type: Number, min: 0 }
    }]
  })
  items!: {
    materialId: Types.ObjectId;
    materialName: string;
    code: string;
    availableQuantity: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  submittedBy?: Types.ObjectId;

  @Prop({ type: Date })
  submittedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  approvedBy?: Types.ObjectId;

  @Prop({ type: Date })
  approvedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  rejectedBy?: Types.ObjectId;

  @Prop({ type: Date })
  rejectedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  cancelledBy?: Types.ObjectId;

  @Prop({ type: Date })
  cancelledAt?: Date;




}

export type PurchaseOrdersDocument = HydratedDocument<PurchaseOrders>;
export const PurchaseOrdersSchema = SchemaFactory.createForClass(PurchaseOrders);

// Indexes for better performance
PurchaseOrdersSchema.index({ requestNumber: 1 });
PurchaseOrdersSchema.index({ branchId: 1 });
PurchaseOrdersSchema.index({ requestedBy: 1 });
PurchaseOrdersSchema.index({ status: 1 });
PurchaseOrdersSchema.index({ requestDate: -1 });
PurchaseOrdersSchema.index({ isDeleted: 1 });
PurchaseOrdersSchema.index({ createdAt: -1 });

export const PURCHASE_ORDERS_MODEL = 'PURCHASE_ORDERS_MODEL';
export const PurchaseOrdersModel = MongooseModule.forFeature([
  { name: 'PurchaseOrders', schema: PurchaseOrdersSchema }
]);

export const getPurchaseOrdersModel = (businessNumber: string): DataBaseRepository<PurchaseOrdersDocument> => {
  if (!businessNumber) {
    throw new Error("businessNumber is required in purchase orders model")
  }
  let connection = ConnectionManager.getConnection(businessNumber);

  // Register required models for refs
  if (!connection.models['Branch']) {
    const { BranchSchema } = require('../TenantModels/branch.model');
    connection.model('Branch', BranchSchema);
  }
  if (!connection.models['User']) {
    const { UserSchema } = require('../userModels/users.model');
    connection.model('User', UserSchema);
  }
  if (!connection.models['Material']) {
    const { MaterialsSchema } = require('./materials.model');
    connection.model('Material', MaterialsSchema);
  }
  if (!connection.models['Supplier']) {
    const { supplierSchema } = require('./supplier.model');
    connection.model('Supplier', supplierSchema);
  }

  const model = connection.models['PurchaseOrders'] || connection.model('PurchaseOrders', PurchaseOrdersSchema) as unknown as Model<PurchaseOrdersDocument>;
  return new DataBaseRepository<PurchaseOrdersDocument>(model);
}

export const getPurchaseOrdersCollection = (businessNumber: string): any => {
  if (!businessNumber) {
    throw new Error("businessNumber is required in purchase orders model")
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  const collection = connection.collection('purchaseOrders');
  return collection;
} 