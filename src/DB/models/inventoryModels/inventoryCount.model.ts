import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { InventoryCountStatus } from '../../../common/type';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'inventoryCounts'
})
export class InventoryCount {
  @Prop({ type: String, required: true , unique: true })
  refrenceNumber!: string;

  @Prop({ type: {
    branchId: { type: Types.ObjectId },
    branchName: { type: String }
  } })
  branch!: {
    branchId: Types.ObjectId;
    branchName: string;
  };

  @Prop({ type: String, enum: Object.values(InventoryCountStatus), default: InventoryCountStatus.DRAFT })
  status!: InventoryCountStatus;


  @Prop({ type: [{
    itemId: { type: Types.ObjectId },
    itemName: { type: String },
    itemCode: { type: String },
    itemStorageUnit: { type: String },
    itemInputQuantity: { type: Number },
    itemQuantity: { type: Number },
    itemVarianceQuantity: { type: Number },
    itemVariancePercentage: { type: Number },
    itemVarianceCost: { type: Number },
    itemCost: { type: Number },
  }], default: [] })
  items!: {
    itemId: Types.ObjectId;
    itemName: string;
    itemCode: string;
    itemStorageUnit: string;
    itemInputQuantity: number;
    itemQuantity: number;
    itemVarianceQuantity: number;
    itemVariancePercentage: number;
    itemVarianceCost: number;
    itemCost: number;
  }[];

  @Prop({ type: Date })
  workDate!: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy!: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isSubmitted!: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  submittedBy?: Types.ObjectId;

  @Prop({ type: Date })
  submittedAt?: Date;

  @Prop({ type: Number })
  totalVarianceCost!: number;

  @Prop({ type: Number })
  itemsCount!: number;

  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  deletedBy?: Types.ObjectId;

  @Prop({ type: Date })
  deletedAt?: Date;

  @Prop({ type: String })
  notes?: string;


}

export type InventoryCountDocument = HydratedDocument<InventoryCount>;
export const InventoryCountSchema = SchemaFactory.createForClass(InventoryCount);

export const INVENTORY_COUNT_MODEL = 'InventoryCount';
export const InventoryCountModel = MongooseModule.forFeature([
  { name: INVENTORY_COUNT_MODEL, schema: InventoryCountSchema }
]);

export const getInventoryCountModel = (businessNumber: string): DataBaseRepository<InventoryCountDocument> => {
  if (!businessNumber) {
    throw new Error('businessNumber is required in inventoryCount model');
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  const model = connection.models[INVENTORY_COUNT_MODEL] || connection.model(INVENTORY_COUNT_MODEL, InventoryCountSchema) as unknown as Model<InventoryCountDocument>;
  return new DataBaseRepository<InventoryCountDocument>(model);
};



