import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DeviceType, LicenseType, PlanType, licencesEnum, PlanDuration, ProductsTypeEnum } from '../../../common/type';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';



@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Tenant {
  @Prop({ type: String, required: true, minlength: 1, maxlength: 20 })
  ownerFirstName!: string;

  @Prop({ type: String, required: true, minlength: 1, maxlength: 20 })
  ownerLastName!: string;

  @Prop({ type: String, required: true, minlength: 1, maxlength: 20 })
  companyName!: string;

  @Prop({ type: String, required: true, unique: true })
  businessNumber!: string;

  @Prop({ type: String, required: true, unique: true })
  Email!: string;

  @Prop({ type: String, required: true })
  countryCode!: string;

  @Prop({ type: String, required: true })
  countryName!: string;

  @Prop({ type: String, required: true, unique: true })
  phoneNumber!: string;

  @Prop({ type: Boolean, default: false })
  confirmed!: boolean;

  @Prop({ type: Boolean, default: false })
  seconderyNameing!: boolean;

  @Prop({ type: Boolean, default: false })
  pricesWithVat!: boolean;

  @Prop({ type: Boolean, default: false })
  specficSupplier!: boolean;
  @Prop({ type: String, default: "Asia/Riyadh" })
  timeZone!: string;

  @Prop({type:Number, default:0})
  branchesCount!: number;

  @Prop({
    type: {
      software: [{
        type: {
          type: { type: String, enum: Object.values(licencesEnum), required: true },
          name: { type: String, required: true },
          duration: { type: String, enum: Object.values(PlanDuration), required: true }
        }
      }],
      hardware: [{
        type: {
          type: { type: String, enum: Object.values(ProductsTypeEnum), required: true },
          quantity: { type: Number, required: true, min: 1 }
        }
      }]
    },
    required: false,
  })
  requestedItems?: {
    software: LicenseType[],
    hardware: DeviceType[]
  };

  @Prop({
    type:String,
    default:"notConfirmed"
  })
  status?: string;

  @Prop({
    type: String,
    enum: Object.values(PlanType),
    required: false,
  })
  plan!: PlanType;
  


}

export type TenantDocument = HydratedDocument<Tenant> & { _id: string };
export const TenantSchema = SchemaFactory.createForClass(Tenant);
export const TENANT_MODEL = 'TENANT_MODEL';
export const TenantModel = MongooseModule.forFeature([
  { name: Tenant.name, schema: TenantSchema },
]);


export const getTenantModel = (): DataBaseRepository<TenantDocument> => {
  let connection = ConnectionManager.getConnection("main");
  const model = connection.models['Tenant'] || connection.model('Tenant', TenantSchema) as unknown as Model<TenantDocument>;
  return new DataBaseRepository<TenantDocument>(model);
}