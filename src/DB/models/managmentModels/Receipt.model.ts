import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';

@Schema({ 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'receipts'
})
export class Receipt {
  @Prop()
  logoUrl?: {
    public_id: string;
    secure_url: string;
  }; // صورة الشعار

  @Prop({ type: [String], enum: ['main', 'localized' , "main & localized"] })
  printLanguages!: string[]; // لغة أو أكثر للطباعة

  @Prop({ enum: ['ar', 'en'], default: 'ar' })
  primaryLanguage!: string;

  @Prop({ enum: ['ar', 'en'], default: 'en' })
  secondaryLanguage!: string;

  @Prop()
  headerText?: string; // أعلى الفاتورة

  @Prop()
  footerText?: string; // أسفل الفاتورة

  @Prop()
  invoiceTitle?: string; // عنوان الفاتورة

  @Prop({ default: true })
  showOrderNumber!: boolean;

  @Prop({ default: false })
  showCalories!: boolean;

  @Prop({ default: true })
  showSubtotal!: boolean;

  @Prop({ default: false })
  showRounding!: boolean;

  @Prop({ default: false })
  showClosedBy!: boolean;

  @Prop({ default: false })
  showCreatedBy!: boolean;

  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  deletedBy?: Types.ObjectId;

  @Prop({ type: Date })
  deletedAt?: Date;
}

export type ReceiptDocument = HydratedDocument<Receipt>;
export const ReceiptSchema = SchemaFactory.createForClass(Receipt);

// Indexes for better performance
ReceiptSchema.index({ primaryLanguage: 1 });
ReceiptSchema.index({ secondaryLanguage: 1 });
ReceiptSchema.index({ printLanguages: 1 });
ReceiptSchema.index({ showOrderNumber: 1 });
ReceiptSchema.index({ showCalories: 1 });
ReceiptSchema.index({ showSubtotal: 1 });
ReceiptSchema.index({ showRounding: 1 });
ReceiptSchema.index({ showClosedBy: 1 });
ReceiptSchema.index({ showCreatedBy: 1 });
ReceiptSchema.index({ isDeleted: 1 });
ReceiptSchema.index({ deletedBy: 1 });
ReceiptSchema.index({ deletedAt: 1 });
ReceiptSchema.index({ createdAt: -1 });
ReceiptSchema.index({ updatedAt: -1 });

// Compound indexes
ReceiptSchema.index({ primaryLanguage: 1, isDeleted: 1 });
ReceiptSchema.index({ secondaryLanguage: 1, isDeleted: 1 });
ReceiptSchema.index({ showOrderNumber: 1, isDeleted: 1 });
ReceiptSchema.index({ showSubtotal: 1, isDeleted: 1 });

export const RECEIPT_MODEL = 'Receipt';
export const ReceiptModel = MongooseModule.forFeature([
  { name: RECEIPT_MODEL, schema: ReceiptSchema }
]);

export const getReceiptModel = (businessNumber: string): DataBaseRepository<ReceiptDocument> => {
  if (!businessNumber) {
    throw new Error('businessNumber is required in receipt model');
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  
  // Register required models for refs
  if (!connection.models['User']) {
    const { UserSchema } = require('./users.model');
    connection.model('User', UserSchema);
  }

  const model = connection.models[RECEIPT_MODEL] || connection.model(RECEIPT_MODEL, ReceiptSchema) as unknown as Model<ReceiptDocument>;
  return new DataBaseRepository<ReceiptDocument>(model);
};


