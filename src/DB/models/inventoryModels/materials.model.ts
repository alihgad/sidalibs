import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { CostCalculationMethod } from '../../../common/type';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'materials'
})
export class Materials {
  @Prop({ type: String, required: true, minlength: 2, maxlength: 50 })
  name!: string;

  @Prop({ type: String, required: false, maxlength: 50 })
  secondaryName?: string;

  @Prop({ type: String, required: true, unique: true })
  code!: string;

  @Prop({ type: String, required: true , ref: 'inventoryCategory' })
  category!: string;

  @Prop({ type: String, required: true })
  storageUnit!: string;

  @Prop({ type: String, required: true })
  recipeUnit!: string;

  @Prop({ type: Number, required: true })
  conversionFactor!: number;

  @Prop({ 
    type: String, 
    enum: Object.values(CostCalculationMethod), 
    required: true 
  })
  costCalculationMethod!: CostCalculationMethod;

  @Prop({ type: Number, required: true, min: 0 })
  totalCostOfProduction!: number;

  @Prop({ type: Number, required: true, min: 0 })
  reorderLevel!: number;

  @Prop({ type: String, required: false })
  barcode?: string;

  @Prop({ type: Number, required: true, min: 0 })
  minLevel!: number;

  @Prop({ type: Number, required: true, min: 0 })
  maxLevel!: number;

  @Prop({ type: [Types.ObjectId], ref: 'Supplier', required: false })
  suppliers?: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Tag', required: false })
  tags?: Types.ObjectId[];

    @Prop({ type: [{
    materialId: { type: Types.ObjectId, ref: 'Materials'},
    materialName: { type: String },
    quantity: { type: Number, required: true, min: 0 },
    yieldPercentage: { type: Number, required: true, min: 0, max: 100 },
    unitCost: { type: Number, required: true, min: 0 }, 
    finalQuantity: { type: Number, required: true, min: 0 },
    wasteQuantity: { type: Number, required: true, min: 0, default: 0 },
    finalCost: { type: Number, required: true, min: 0 }
    }], required: false })
  ingredients?: {
    materialId: Types.ObjectId;
    materialName: string;
    quantity: number;
    yieldPercentage: number;
    unitCost: number;
    finalQuantity: number;
    wasteQuantity: number;
    finalCost: number;
  }[];

  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  // Timestamps (automatically added by Mongoose)
  createdAt?: Date;
  updatedAt?: Date;
}

export type MaterialsDocument = HydratedDocument<Materials>;
export const MaterialsSchema = SchemaFactory.createForClass(Materials);




export const MATERIALS_MODEL = 'MATERIALS_MODEL';
export const MaterialsModel = MongooseModule.forFeature([
  { name: 'Materials', schema: MaterialsSchema }
]);

export const getMaterialsModel = (businessNumber: string): DataBaseRepository<MaterialsDocument> => {
  if (!businessNumber) {
    throw new Error('businessNumber is required in materials model');
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  
  // Register required models for refs
  if (!connection.models['Tag']) {
    const { TagSchema } = require('../TenantModels/tags.model');
    connection.model('Tag', TagSchema);
  }
  if (!connection.models['Supplier']) {
    const { supplierSchema } = require('./supplier.model');
    connection.model('Supplier', supplierSchema);
  }

  if (!connection.models['inventoryCategory']) {
    const { inventoryCategorySchema } = require('./categories.model');
    connection.model('inventoryCategory', inventoryCategorySchema);
  }

  const model = connection.models['Materials'] || connection.model('Materials', MaterialsSchema) as unknown as Model<MaterialsDocument>;
  return new DataBaseRepository<MaterialsDocument>(model);
}

