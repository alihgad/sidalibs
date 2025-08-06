import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types, Schema as MongooseSchema } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { CostCalculationMethod, OrderType } from '../../../common/type';
import { MenuGroupSchema } from './groups.model';
import { TaxGroupSchema } from '../TenantModels/tax-groups.model';
import { MaterialsSchema } from '../inventoryModels/materials.model';
import { BranchSchema } from '../TenantModels/branch.model';
import { PriceTagAppliesSchema } from '../TenantModels/priceTagApplies.model';
import { AdditionSchema } from './additions.model';
import { NutritionalValues, NutritionalValuesSchema } from '../shared/nutritional-values.schema';

@Schema()
export class Ingredient {
  @Prop({ type: Types.ObjectId, ref: 'Materials', required: true })
  materialId!: Types.ObjectId;

  @Prop({ type: Number, required: true })
  quantity!: number;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);

@Schema()
export class CustomAddationsOptionsBranchPrice {
  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branch!: Types.ObjectId;

  @Prop({ type: Number, required: true })
  price!: number;
}

export const CustomAddationsOptionsBranchPriceSchema = SchemaFactory.createForClass(CustomAddationsOptionsBranchPrice);

@Schema()
export class PriceTagApply {
  @Prop({ type: Types.ObjectId, ref: 'PriceTagApplies', required: true })
  priceTag!: Types.ObjectId;

  @Prop({ type: Number, required: true })
  price!: number;
}

export const PriceTagApplySchema = SchemaFactory.createForClass(PriceTagApply);

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class AdditionsOption {
  @Prop({ required: true })
  name!: string;

  @Prop() secondaryName?: string;
  @Prop() description?: string;

  @Prop({ required: true })
  referenceNumber!: string;

  @Prop() price?: number;

  @Prop({ type: Types.ObjectId, ref: 'TaxGroup' })
  taxGroup?: Types.ObjectId;

  @Prop({ type: String, enum: CostCalculationMethod, required: true })
  costCalculationMethod!: CostCalculationMethod;

  @Prop({ type: Types.ObjectId, ref: 'MenuGroup' })
  menuGroup?: Types.ObjectId;

  // Add the addition field to link with Addition model
  @Prop({ type: Types.ObjectId, ref: 'Addition', required: true })
  addition!: Types.ObjectId;

  @Prop({ type: [IngredientSchema], default: [] })
  ingredients!: Ingredient[];

  @Prop({ type: [String], enum: OrderType, default: [] })
  orderTypes!: OrderType[];

  @Prop() quantity?: number;

  @Prop({ type: Types.ObjectId, ref: 'Combo' })
  comboException?: Types.ObjectId;

  @Prop({ type: NutritionalValuesSchema })
  nutritionalValues?: NutritionalValues;

  @Prop({ type: [CustomAddationsOptionsBranchPriceSchema], default: [] })
  CustomAddationsOptionsBranchPrices!: CustomAddationsOptionsBranchPrice[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Branch' }], default: [] })
  inactiveBranches!: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Branch' }], default: [] })
  outOfStockBranches!: Types.ObjectId[];

  @Prop({ type: [PriceTagApplySchema], default: [] })
  priceTagApplies!: PriceTagApply[];

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ default: false })
  isDeleted!: boolean;
}

export type AdditionsOptionDocument = HydratedDocument<AdditionsOption> & { _id: string };
export const AdditionsOptionSchema = SchemaFactory.createForClass(AdditionsOption);
export const ADDITIONS_OPTION_MODEL = 'AdditionsOption';

export const AdditionsOptionModel = MongooseModule.forFeature([
  { name: ADDITIONS_OPTION_MODEL, schema: AdditionsOptionSchema },
]);
export const getAdditionsOptionModel = (businessNumber: string): DataBaseRepository<AdditionsOptionDocument> => {
  if (!businessNumber) {
    throw new Error("businessNumber is required in AdditionsOption model");
  }

  const connection = ConnectionManager.getConnection(businessNumber);

  if (!connection.models['TaxGroup']) {
    connection.model('TaxGroup', TaxGroupSchema);
  }
  if (!connection.models['Materials']) {
    connection.model('Materials', MaterialsSchema);
  }
  if (!connection.models['Branch']) {
    connection.model('Branch', BranchSchema);
  }
  if (!connection.models['PriceTagApplies']) {
    connection.model('PriceTagApplies', PriceTagAppliesSchema);
  }
  if (!connection.models['MenuGroup']) {
    connection.model('MenuGroup', MenuGroupSchema);
  }
  if (!connection.models['Addition']) {
    connection.model('Addition', AdditionSchema);
  }
  if (!connection.models['Combo']) {
    connection.model('Combo', new MongooseSchema({})); // Replace when Combo schema is ready
  }

  const model = connection.models[ADDITIONS_OPTION_MODEL] || connection.model(ADDITIONS_OPTION_MODEL, AdditionsOptionSchema) as unknown as Model<AdditionsOptionDocument>;
  return new DataBaseRepository<AdditionsOptionDocument>(model);
};