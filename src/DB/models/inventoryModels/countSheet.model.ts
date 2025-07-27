import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';





@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'countSheets'
})
export class CountSheet {
  @Prop({ required: true, type: String, unique: true })
  referenceNumber!: string; // رقم مرجعي للجرد - Count sheet reference number

  @Prop({ required: true, type: String })
  name!: string; // عنوان ورقة الجرد - Count sheet name

  @Prop({ type: String })
  secondaryName?: string; // الاسم الثانوي - Secondary name

  @Prop({ required: true, type: [{
    itemId: { type: String },
    itemName: { type: String },
    itemCode: { type: String },
    itemStorageUnit: { type: String },
    itemRecipeUnit: { type: String },
    isDeleted: { type: Boolean, default: false },
  }] })
  items!: [{
    itemId: string;
    itemName: string;
    itemCode: string;
    itemStorageUnit: string;
    itemRecipeUnit: string;
    isDeleted: boolean;
  }];

  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean; // محذوف أم لا - Soft delete flag

  @Prop({ type: Date })
  deletedAt?: Date; // تاريخ الحذف - Deletion date


}

export type CountSheetDocument = HydratedDocument<CountSheet>;
export const CountSheetSchema = SchemaFactory.createForClass(CountSheet);

// Indexes for better performance
CountSheetSchema.index({ referenceNumber: 1 });
CountSheetSchema.index({ name: 1 });
CountSheetSchema.index({ secondaryName: 1 });
CountSheetSchema.index({ isDeleted: 1 });
CountSheetSchema.index({ createdAt: -1 });

// Compound index for unique reference number per business
CountSheetSchema.index({ referenceNumber: 1, isDeleted: 1 }, { unique: true });

export const COUNT_SHEET_MODEL = 'COUNT_SHEET_MODEL';
export const CountSheetModel = MongooseModule.forFeature([
  { name: 'CountSheet', schema: CountSheetSchema }
]);

export const getCountSheetModel = (businessNumber: string): DataBaseRepository<CountSheetDocument> => {
  if (!businessNumber) {
    throw new Error('businessNumber is required in count sheet model');
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  const model = connection.models['CountSheet'] || connection.model('CountSheet', CountSheetSchema) as unknown as Model<CountSheetDocument>;
  return new DataBaseRepository<CountSheetDocument>(model);
} 