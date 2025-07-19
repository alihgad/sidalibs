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
  collection: 'stockInBranch'
})
export class StockInBranch {
  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Materials', required: true })
  materialId!: Types.ObjectId;

  @Prop({ type: Number, required: true, min: 0, default: 0 })
  quantity!: number;

  @Prop({ type: Number, required: true, min: 0, default: 0 })
  price!: number;


}

export type StockInBranchDocument = HydratedDocument<StockInBranch>;
export const StockInBranchSchema = SchemaFactory.createForClass(StockInBranch);

// Compound index for unique branch-material combination
StockInBranchSchema.index({ branchId: 1, materialId: 1 }, { unique: true });

// Indexes for better performance
StockInBranchSchema.index({ branchId: 1 });
StockInBranchSchema.index({ materialId: 1 });
StockInBranchSchema.index({ quantity: 1 });
StockInBranchSchema.index({ createdAt: -1 });

export const STOCK_IN_BRANCH_MODEL = 'STOCK_IN_BRANCH_MODEL';
export const StockInBranchModel = MongooseModule.forFeature([
  { name: 'StockInBranch', schema: StockInBranchSchema }
]);

export const getStockInBranchModel = (businessNumber: string): DataBaseRepository<StockInBranchDocument> => {
  if (!businessNumber) {
    throw new Error("businessNumber is required in stock in branch model")
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  
  // Register required models for refs
  if (!connection.models['Branch']) {
    const { BranchSchema } = require('../TenantModels/branch.model');
    connection.model('Branch', BranchSchema);
  }
  if (!connection.models['Material']) {
    const { MaterialSchema } = require('./materials.model');
    connection.model('Material', MaterialSchema);
  }

  const model = connection.models['StockInBranch'] || connection.model('StockInBranch', StockInBranchSchema) as unknown as Model<StockInBranchDocument>;
  return new DataBaseRepository<StockInBranchDocument>(model);
}

