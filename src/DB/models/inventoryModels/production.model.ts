import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { ProductionStatus, ProductionType } from '../../../common/type';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'production'
})
export class Production {

  @Prop({ type: String })
  referenceNumber!: string;

  @Prop({ type: String })
  status!: ProductionStatus;

  @Prop({ type: String, enum: Object.values(ProductionType) })
  type!: ProductionType;

  @Prop({ type: Types.ObjectId, ref: 'branch' })
  branchId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'user' })
  createdBy!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'user' })
  sendBy!: Types.ObjectId;

  @Prop({ type: Date })
  workDate!: Date;

  @Prop({ type: String })
  createdAt!: string;

  @Prop({ type: String })
  sendAt!: string;

  @Prop({ type: Number })
  totalCost!: number;

  @Prop({ type: Number })
  totalQuantity!: number;

  @Prop({ type: [{
    materialId: { type: Types.ObjectId, ref: 'Materials' },
    code: Number,
    quantity: Number,
    cost: Number,
    finalCost: Number,
  }]})
  materials!: {
    materialId: Types.ObjectId;
    code: number;
    quantity: number;
    cost: number;
    finalCost: number;
  }[];


  
}

export type ProductionDocument = HydratedDocument<Production>;
export const ProductionSchema = SchemaFactory.createForClass(Production);

export const PRODUCTION_MODEL = 'PRODUCTION_MODEL';
export const ProductionModel = MongooseModule.forFeature([
  { name: 'Production', schema: ProductionSchema }
]);

export const getProductionModel = (businessNumber: string): DataBaseRepository<ProductionDocument> => {
  if (!businessNumber) {
    throw new Error('businessNumber is required in production model');
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  
  const model = connection.models['Production'] || connection.model('Production', ProductionSchema) as unknown as Model<ProductionDocument>;
  return new DataBaseRepository<ProductionDocument>(model);
}
