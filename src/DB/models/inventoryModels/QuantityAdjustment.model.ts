
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
  collection: 'quantityAdjustment'
})
export class QuantityAdjustment {
  // Add your properties here
  @Prop({ type: Types.ObjectId, required: true, ref: 'Branch' })
  branch!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'reason' })
  reason!: Types.ObjectId;

  @Prop({ type: Date, required: true })
  workDate!: Date;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  createdBy!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  sendBy!: Types.ObjectId;

  @Prop({ type: Date, required: true })
  sendAt!: Date;

  @Prop({ type: Number, required: true })
  productsCount!: number;

  @Prop({ type: [{
    materialId: { type: Types.ObjectId, required: true, ref: 'Material' },
    quantity: { type: Number, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
  }], required: true })
  materials!: {
    materialId: Types.ObjectId;
    quantity: number;
    code: string;
    price: number;
    total: number;
  }[];
}

export type QuantityAdjustmentDocument = HydratedDocument<QuantityAdjustment>;
export const QuantityAdjustmentSchema = SchemaFactory.createForClass(QuantityAdjustment);


export const QUANTITY_ADJUSTMENT_MODEL = 'QUANTITY_ADJUSTMENT_MODEL';
export const QuantityAdjustmentModel = MongooseModule.forFeature([
  { name: 'QuantityAdjustment', schema: QuantityAdjustmentSchema }
]);

export const getQuantityAdjustmentModel = (businessNumber: string): DataBaseRepository<QuantityAdjustmentDocument> => {
  if (!businessNumber) {
    throw new Error("businessNumber is required in quantity adjustment model")
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  const model = connection.models['QuantityAdjustment'] || connection.model('QuantityAdjustment', QuantityAdjustmentSchema) as unknown as Model<QuantityAdjustmentDocument>;
  return new DataBaseRepository<QuantityAdjustmentDocument>(model);
}


