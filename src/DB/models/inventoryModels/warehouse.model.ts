import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'warehouses'
})
export class Warehouse {
  @Prop({ required: true, type: String, unique: true })
  name!: string; // اسم المستودع - Warehouse name

  @Prop({ type: String })
  secondaryName!: string; // الاسم الثانوي - Secondary name in another language

  @Prop({ required: true, type: String })
  endOfDayTime!: string; // نهاية يوم المخزون - End of day time (format: HH:MM)

  @Prop({ required: true, type: String, unique: true })
  referenceNumber!: string; // الرقم المرجعي - Reference code (e.g., W01)

  @Prop({  type: Number })
  latitude!: number; // خط العرض - Latitude (e.g., 24.78657)

  @Prop({  type: Number })
  longitude!: number; // خط الطول - Longitude (e.g., 46.614142)


  @Prop({ type: Boolean, default: true })
  isActive!: boolean; // Whether the warehouse is active

  @Prop({ type: String })
  description?: string; // Optional description

  @Prop({ type: String })
  address?: string; // Optional address

  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  // Timestamps (automatically added by Mongoose)
  createdAt?: Date;
  updatedAt?: Date;
}

export type WarehouseDocument = HydratedDocument<Warehouse>;
export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);

// Indexes for better performance
WarehouseSchema.index({ name: 1 });
WarehouseSchema.index({ referenceNumber: 1 });
WarehouseSchema.index({ isActive: 1 });
WarehouseSchema.index({ isDeleted: 1 });
WarehouseSchema.index({ createdAt: -1 });

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





