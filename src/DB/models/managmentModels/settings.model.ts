import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Collection, Document, HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'Settings'
})
export class Settings {


  @Prop({ type: String, required: true, unique: true, index: true })
  businessNumber!: string; // Business name


  // -------------------- displayAppCoverPhoto --------------------

  @Prop({
    type: {
      secure_url: String,
      public_id: String,
    }, required: false
  })
  displayAppCoverPhoto?: {
    secure_url: string;
    public_id: string;
  };

  // -------------------- Kitchen Settings  --------------------

  @Prop({ type: String, enum: ['asAddedInCashier', 'basedOnMenuCategoryOrder'], default: 'asAddedInCashier' })
  kitchenOrderingMethod?: string; // طريقة تصنيف المطبخ: asAddedInCashier, basedOnMenuCategoryOrder



  @Prop({ type: Boolean, default: true })
  enablePrintingAndShowingDefaultAdditionOnReceiptAndKDS?: boolean; // تفعيل طباعة المطبخ


  // ------------------- Inventory Transactions ------------------


  @Prop({
    type: {
      secure_url: String,
      public_id: String,
    }, required: false
  })
  logo?: {
    secure_url: string;
    public_id: string;
  };

  @Prop({ type: String, required: false })
  headerText?: string; // Header text

  @Prop({ type: String, required: false })
  footerText?: string; // Footer text

  @Prop({ type: Boolean, default: false })
  RestrictInventoryTransactionsToAvailableQuantities?:boolean

}

export type SettingsDocument = HydratedDocument<Settings>;

export const SettingsSchema = SchemaFactory.createForClass(Settings);

export const getSettingsModel = (): DataBaseRepository<SettingsDocument> => {
  const connection = ConnectionManager.getConnection("main");

  const model = connection.models['Settings'] || connection.model('Settings', SettingsSchema) as unknown as Model<SettingsDocument>;

  return new DataBaseRepository<SettingsDocument>(model);
};



