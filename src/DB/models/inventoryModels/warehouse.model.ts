import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { DeliveryTime } from '../../../common/type';
// import { ID } from '@nestjs/common';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'warehouses'
})
export class Warehouse {
  @Prop({ required: true, type: String, unique: true, index: true })
  name!: string; // اسم المستودع - Warehouse name

  @Prop({ type: String })
  secondaryName!: string; // الاسم الثانوي - Secondary name in another language

  @Prop({ required: true, type: String , enum: DeliveryTime })
  endOfDayTime!: DeliveryTime; // نهاية يوم المخزون - End of day time (format: HH:MM)

  @Prop({ required: true, type: String, unique: true, index: true })
  referenceNumber!: string; // الرقم المرجعي - Reference code (e.g., W01)

  @Prop({  type: Number })
  latitude!: number; // خط العرض - Latitude (e.g., 24.78657)

  @Prop({  type: Number })
  longitude!: number; // خط الطول - Longitude (e.g., 46.614142)


  @Prop({ type: String })
  description?: string; // Optional description

  @Prop({ type: String })
  address?: string; // Optional address

  @Prop({ type: Types.ObjectId , ref: 'User' })
  updatedBy?: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @Prop({ type: Types.ObjectId , ref: 'User' })
  deletedBy?: Types.ObjectId;

  @Prop({ type: Date })
  deletedAt?: Date;

}

export type WarehouseDocument = HydratedDocument<Warehouse>;
export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);

// Indexes for better performance
WarehouseSchema.index({ isDeleted: 1 });
WarehouseSchema.index({ createdAt: -1 });
WarehouseSchema.index({ updatedBy: 1 });
WarehouseSchema.index({ deletedBy: 1 });

// Compound index for unique name per business
WarehouseSchema.index({ name: 1, isDeleted: 1 });

export const WAREHOUSE_MODEL = 'WAREHOUSE_MODEL';
export const WarehouseModel = MongooseModule.forFeature([
  { name: 'Warehouse', schema: WarehouseSchema }
]);

export const getWarehouseModel = (businessNumber: string): DataBaseRepository<WarehouseDocument> => {
  if (!businessNumber) {
    throw new Error('businessNumber is required in warehouse model');
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  const model = connection.models['Warehouse'] || connection.model('Warehouse', WarehouseSchema) as unknown as Model<WarehouseDocument>;
  return new DataBaseRepository<WarehouseDocument>(model);
}





