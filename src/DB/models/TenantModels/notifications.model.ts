import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ConnectionManager } from "../../connection.manager";
import { DataBaseRepository } from "../../DataBase.repository";
import { HydratedDocument, Model } from "mongoose";

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  versionKey: false
})
export class notifications {
  @Prop({ type: String, required: true })
  key!: string;
  @Prop({ type: String, required: true })
  label!: string;
}
export type notificationsDocument = HydratedDocument<notifications> & { _id: string };
export const notificationsSchema = SchemaFactory.createForClass(notifications);
export const notifications_MODEL = 'notifications_MODEL';
export const notificationsModel = MongooseModule.forFeature([
  { name: notifications.name, schema: notificationsSchema },
]);

export const getnotificationsModel = (): DataBaseRepository<notificationsDocument> => {
    
    let connection = ConnectionManager.getConnection("main");
    const model = connection.models['notifications'] || connection.model('notifications', notificationsSchema) as unknown as Model<notificationsDocument>;
    return new DataBaseRepository<notificationsDocument>(model);
}