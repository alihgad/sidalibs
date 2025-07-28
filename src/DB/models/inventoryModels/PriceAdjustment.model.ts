import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'priceAdjustment'
})
export class PriceAdjustment {
  @Prop({ type: String, required: true })
  referenceNumber!: string;

  @Prop({ type: Types.ObjectId, required: true })
  branch!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Reason' })
  reason!: Types.ObjectId;

  @Prop({ type: Date, required: true })
  workDate!: Date;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  createdBy!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  sendBy!: Types.ObjectId;

  @Prop({ type: Date })
  sendAt!: Date;

  @Prop({ type: Number })
  productsCount!: number;

  @Prop({ type: Boolean, default: false })
  isSent!: boolean;

  @Prop({ type: [{
    materialId: { type: Types.ObjectId, ref: 'Materials' },
    name: { type: String },
    oldPrice: { type: Number },
    newPrice: { type: Number },
    code: { type: String },
    storageUnit: { type: String }
  }] })
  materials!: {
    materialId: Types.ObjectId;
    name: string;
    oldPrice: number;
    newPrice: number;
    code: string;
    storageUnit: string;
  }[];

  // Timestamps (automatically added by Mongoose)
  createdAt?: Date;
  updatedAt?: Date;
}

export type PriceAdjustmentDocument = HydratedDocument<PriceAdjustment>;
export const PriceAdjustmentSchema = SchemaFactory.createForClass(PriceAdjustment);

// Indexes for better performance
PriceAdjustmentSchema.index({ referenceNumber: 1 });
PriceAdjustmentSchema.index({ branch: 1 });
PriceAdjustmentSchema.index({ reason: 1 });
PriceAdjustmentSchema.index({ createdBy: 1 });
PriceAdjustmentSchema.index({ workDate: -1 });
PriceAdjustmentSchema.index({ isSent: 1 });
PriceAdjustmentSchema.index({ createdAt: -1 });

export const PRICE_ADJUSTMENT_MODEL = 'PRICE_ADJUSTMENT_MODEL';
export const PriceAdjustmentModel = MongooseModule.forFeature([
  { name: 'PriceAdjustment', schema: PriceAdjustmentSchema }
]);

export const getPriceAdjustmentModel = (businessNumber: string): DataBaseRepository<PriceAdjustmentDocument> => {
  if (!businessNumber) {
    throw new Error("businessNumber is required in price adjustment model")
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
  if (!connection.models['Materials']) {
      const { MaterialsSchema } = require('./materials.model');
  connection.model('Materials', MaterialsSchema);
  }
  if (!connection.models['Reason']) {
    const { ReasonSchema } = require('../TenantModels/reason.model');
    connection.model('Reason', ReasonSchema);
  }

  const model = connection.models['PriceAdjustment'] || connection.model('PriceAdjustment', PriceAdjustmentSchema) as unknown as Model<PriceAdjustmentDocument>;
  return new DataBaseRepository<PriceAdjustmentDocument>(model);
}

export const getPriceAdjustmentCollection = (businessNumber: string): any => {
  if (!businessNumber) {
    throw new Error("businessNumber is required in price adjustment model")
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  const collection = connection.collection('priceAdjustment');
  return collection;
} 