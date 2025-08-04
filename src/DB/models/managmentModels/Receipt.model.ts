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

  @Prop({ type: [String], enum: ['main', 'localized' , "main & localized"] , default: ["main & localized"] })
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

  @Prop({ default: false })
  showCheckNumber!: boolean;

  @Prop({ default: false })
  hideFreeModiferOptions!: boolean;

  @Prop({ default: false })
  printCustomerPhoneNumberInPickupOrders!: boolean;

}

export type ReceiptDocument = HydratedDocument<Receipt>;
export const ReceiptSchema = SchemaFactory.createForClass(Receipt);


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


