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


  @Prop({ type: String, required: true, unique: true , index: true })
  businessNumber!: string; // Business name

  @Prop({ type: {
    secure_url: String,
    public_id: String,
  }, required: false })
  displayAppCoverPhoto?: {
    secure_url: string;
    public_id: string;
  };

 

}

export type SettingsDocument = HydratedDocument<Settings>;

export const SettingsSchema = SchemaFactory.createForClass(Settings);

export const getSettingsModel = (): DataBaseRepository<SettingsDocument> => {
  const connection = ConnectionManager.getConnection("main");
  
  const model = connection.models['Settings'] || connection.model('Settings', SettingsSchema) as unknown as Model<SettingsDocument>;

  return new DataBaseRepository<SettingsDocument>(model);
};



