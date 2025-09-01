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
export class ReceiptForm {


  @Prop({ type: String  , required: true , unique: true , index: true })
  businessNumber!: string;
  
  @Prop({
    type: {
      public_id: { type: String },
      secure_url: { type: String },
    },
    required: false,
    default: null,
  })
  logoUrl?: {
    public_id: string;
    secure_url: string;
  }; // صورة الشعار

  @Prop({ type: [String], enum: ['main', 'localized' , "main & localized"] , default: ["main & localized"] })
  printLanguages?: string[]; // لغة أو أكثر 

  @Prop({ enum: ['ar', 'en'], default: 'ar' })
  primaryLanguage?: string;

  @Prop({ enum: ['ar', 'en'], default: 'en' })
  secondaryLanguage?: string;

  @Prop()
  headerText?: string; // أعلى الفاتورة

  @Prop()
  footerText?: string; // أسفل الفاتورة

  @Prop()
  invoiceTitle?: string; // عنوان الفاتورة

  @Prop({ default: true })
  showOrderNumber?: boolean;

  @Prop({ default: false })
  showCalories?: boolean;

  @Prop({ default: true })
  showSubtotal?: boolean;

  @Prop({ default: false })
  showRounding?: boolean;

  @Prop({ default: false })
  showClosedBy?: boolean;

  @Prop({ default: false })
  showCreatedBy?: boolean;

  @Prop({ default: false })
  showCheckNumber?: boolean;

  @Prop({ default: false })
  hideFreeModiferOptions?: boolean;

  @Prop({ default: false })
  printCustomerPhoneNumberInPickupOrders?: boolean;

}

export type ReceiptFormDocument = HydratedDocument<ReceiptForm>;
export const ReceiptFormSchema = SchemaFactory.createForClass(ReceiptForm);


export const RECEIPT_FORM_MODEL = 'ReceiptForm';
export const ReceiptFormModel = MongooseModule.forFeature([
  { name: RECEIPT_FORM_MODEL, schema: ReceiptFormSchema }
]);

export const getReceiptFormModel = (): DataBaseRepository<ReceiptFormDocument> => {

  let connection = ConnectionManager.getConnection("main");
  
  const model = connection.models[RECEIPT_FORM_MODEL] || connection.model(RECEIPT_FORM_MODEL, ReceiptFormSchema) as unknown as Model<ReceiptFormDocument>;
  return new DataBaseRepository<ReceiptFormDocument>(model);
};


