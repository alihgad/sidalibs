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

  @Prop({ type: Number, default: 0 })
  branchesCount!: number;

  @Prop({
    type: {
      software: [{

        type: { type: String, enum: Object.values(licencesEnum), required: true },
        name: { type: String, required: true },
        duration: { type: String, enum: Object.values(PlanDuration), required: true }

      }],
      hardware: [{

        type: { type: String, enum: Object.values(ProductsTypeEnum), required: true },
        quantity: { type: Number, required: true, min: 1 }

      }]
    },
    required: false,
  })
  requestedItems?: {
    software: LicenseType[],
    hardware: DeviceType[]
  };

  @Prop({
    type: String,
    default: "notConfirmed"
  })
  status?: string;

  @Prop({
    type: String,
    enum: Object.values(PlanType),
    required: false,
  })
  plan!: PlanType;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  @Prop({ type: {
    country: { type: String },
    city: { type: String },
    district: { type: String },
    street: { type: String }
  }, required: false })
  ShippingAddress?: {
    country: string;
    city: string;
    district: string;
    street: string;
  };


}

export type TenantDocument = HydratedDocument<Tenant> & { _id: string };
export const TenantSchema = SchemaFactory.createForClass(Tenant);

// Paranoid (Soft Delete) Middleware
TenantSchema.pre('find', function() {
  this.where({ isDeleted: { $ne: true } });
});

TenantSchema.pre('findOne', function() {
  this.where({ isDeleted: { $ne: true } });
});

TenantSchema.pre('findOneAndUpdate', function() {
  this.where({ isDeleted: { $ne: true } });
});

TenantSchema.pre('findOneAndDelete', function() {
  this.where({ isDeleted: { $ne: true } });
});

TenantSchema.pre('countDocuments', function() {
  this.where({ isDeleted: { $ne: true } });
});

// Soft delete method
TenantSchema.methods.softDelete = function() {
  this.isDeleted = true;
  this.deletedAt = new Date();
  return this.save();
};

// Restore method
TenantSchema.methods.restore = function() {
  this.isDeleted = false;
  this.deletedAt = null;
  return this.save();
};

export const TENANT_MODEL = 'TENANT_MODEL';
export const TenantModel = MongooseModule.forFeature([
  { name: Tenant.name, schema: TenantSchema },
]);


export const getTenantModel = (): DataBaseRepository<TenantDocument> => {
  let connection = ConnectionManager.getConnection("main");
  const model = connection.models['Tenant'] || connection.model('Tenant', TenantSchema) as unknown as Model<TenantDocument>;
  return new DataBaseRepository<TenantDocument>(model);
}

// Helper functions for paranoid operations
export const getTenantModelWithDeleted = (): DataBaseRepository<TenantDocument> => {
  let connection = ConnectionManager.getConnection("main");
  const model = connection.models['Tenant'] || connection.model('Tenant', TenantSchema) as unknown as Model<TenantDocument>;
  const repository = new DataBaseRepository<TenantDocument>(model);
  
  // Override find methods to include deleted records
  const originalFind = repository.find.bind(repository);
  const originalFindOne = repository.findOne.bind(repository);
  
  repository.find = (filter?: any) => {
    return originalFind(filter);
  };
  
  repository.findOne = (filter?: any) => {
    return originalFindOne(filter);
  };
  
  return repository;
};