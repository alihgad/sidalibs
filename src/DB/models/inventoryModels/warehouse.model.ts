import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WarehouseDocument = Warehouse & Document;

@Schema({ timestamps: true })
export class Warehouse {
  @Prop({ required: true, type: String, unique: true, index: true })
  name!: string; // اسم المستودع - Warehouse name

  @Prop({ type: String })
  secondaryName!: string; // الاسم الثانوي - Secondary name in another language

  @Prop({ required: true, type: String })
  endOfDayTime!: string; // نهاية يوم المخزون - End of day time (format: HH:MM)

  @Prop({ required: true, type: String, unique: true, index: true })
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
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);

// Index for better query performance
WarehouseSchema.index({ isActive: 1 });


