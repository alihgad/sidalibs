import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { ChargeType, OrderType } from '../../../common/type';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'charges'
})
export class Charges {
  @Prop({ type: String, required: true , unique: true })
  name!: string;

  @Prop({ type: String , unique: true })
  secondaryName?: string;

  @Prop({ type: ChargeType, required: true })
  type!:ChargeType;

  @Prop({ type: Boolean, required: true })
  isOpenValue!: boolean;

  @Prop({ type: Number})
  value?: number;

  @Prop({ type: [OrderType], required: true })
  applyOnOrderTypes!: OrderType[];


  @Prop({ type: Types.ObjectId, ref: 'TaxGroup' })
  taxGroup!: Types.ObjectId;

  @Prop({ type: Boolean , default: false })
  applyOnAllBranches!: boolean;

  @Prop({ type: [Types.ObjectId], ref: 'Branch' })
  applyOnBranches?: Types.ObjectId[];


  @Prop({ type: Boolean , default: false })
  autoApply!: boolean;


  @Prop({ type: Boolean , default: false })
  withoutDiscounts!: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy!: Types.ObjectId;


  @Prop({ type: Boolean , default: false })
  isDeleted!: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  deletedBy!: Types.ObjectId;

  @Prop({ type: Date })
  deletedAt!: Date;


}

export type ChargesDocument = HydratedDocument<Charges>;
export const chargeschema = SchemaFactory.createForClass(Charges);

// Indexes for better performance
chargeschema.index({ name: 1 });
chargeschema.index({ type: 1 });
chargeschema.index({ isOpenValue: 1 });
chargeschema.index({ applyOnOrderTypes: 1 });
chargeschema.index({ taxGroup: 1 });
chargeschema.index({ applyOnAllBranches: 1 });
chargeschema.index({ applyOnBranches: 1 });
chargeschema.index({ autoApply: 1 });
chargeschema.index({ withoutDiscounts: 1 });
chargeschema.index({ createdBy: 1 });
chargeschema.index({ isDeleted: 1 });
chargeschema.index({ deletedBy: 1 });
chargeschema.index({ deletedAt: 1 });
chargeschema.index({ createdAt: -1 });
chargeschema.index({ updatedAt: -1 });

// Compound indexes
chargeschema.index({ type: 1, isDeleted: 1 });
chargeschema.index({ applyOnAllBranches: 1, isDeleted: 1 });
chargeschema.index({ autoApply: 1, isDeleted: 1 });
chargeschema.index({ createdBy: 1, isDeleted: 1 });
chargeschema.index({ name: 1, isDeleted: 1 });

export const CHARGES_MODEL = 'Charges';
export const ChargesModel = MongooseModule.forFeature([
  { name: CHARGES_MODEL, schema: chargeschema }
]);

export const getChargesModel = (businessNumber: string): DataBaseRepository<ChargesDocument> => {
  if (!businessNumber) {
    throw new Error('businessNumber is required in charges model');
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  
  // Register required models for refs
  if (!connection.models['TaxGroup']) {
    const { TaxGroupSchema } = require('../TenantModels/tax-groups.model');
    connection.model('TaxGroup', TaxGroupSchema);
  }
  if (!connection.models['Branch']) {
    const { BranchSchema } = require('../TenantModels/branch.model');
    connection.model('Branch', BranchSchema);
  }
  if (!connection.models['User']) {
    const { UserSchema } = require('./users.model');
    connection.model('User', UserSchema);
  }

  const model = connection.models[CHARGES_MODEL] || connection.model(CHARGES_MODEL, chargeschema) as unknown as Model<ChargesDocument>;
  return new DataBaseRepository<ChargesDocument>(model);
}; 