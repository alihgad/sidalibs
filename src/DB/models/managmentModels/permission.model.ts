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
export class permission {
  @Prop({ type: String, required: true })
  name!: string;
  @Prop({ type: String, required: true })
  description!: string;
  @Prop({ type: String, required: true, unique: true })
  key!: string;
  @Prop({ type: String, required: true })
  category!: string;
}
export type permissionDocument = HydratedDocument<permission> & { _id: string };
export const permissionSchema = SchemaFactory.createForClass(permission);
export const permission_MODEL = 'PERMISSION_MODEL';
export const permissionModel = MongooseModule.forFeature([
  { name: permission.name, schema: permissionSchema },
]);

export const getpermissionModel = (): DataBaseRepository<permissionDocument> => {
    
    let connection = ConnectionManager.getConnection("main");
    const model = connection.models['permission'] || connection.model('permission', permissionSchema) as unknown as Model<permissionDocument>;
    return new DataBaseRepository<permissionDocument>(model);
}