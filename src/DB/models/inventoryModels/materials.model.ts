import { Schema, model, Model, Document, Types } from 'mongoose';
import { CostCalculationMethod } from '../../../common/type';
import { ConnectionManager } from '../../connection.manager';
import { DataBaseRepository } from '../../DataBase.repository';
import { TagSchema } from '../TenantModels/tags.model';
import { supplierSchema } from './supplier.model';

export interface materials extends Document {
  name: string;
  secondaryName?: string;
  code: string;
  category: string;
  storageUnit: string;
  recipeUnit: string;
  conversionFactor: number;
  costCalculationMethod: CostCalculationMethod;
  cost: number;
  reorderLevel: number;
  barcode?: string;
  minLevel: number;
  maxLevel: number;
  suppliers?: Types.ObjectId[];
  tags?: Types.ObjectId[];
  ingredients?: Types.ObjectId[];
  isDeleted: boolean;
}

const materialsSchema = new Schema<materials>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  secondaryName: {
    type: String,
    required: false,
    maxlength: 50
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  storageUnit: {
    type: String,
    required: true
  },
  recipeUnit: {
    type: String,
    required: true
  },
  conversionFactor: {
    type: Number,
    required: true
  },
  costCalculationMethod: {
    type: String,
    enum: Object.values(CostCalculationMethod),
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  reorderLevel: {
    type: Number,
    required: true
  },
  barcode: {
    type: String,
    required: false
  },
  minLevel: {
    type: Number,
    required: true
  },
  maxLevel: {
    type: Number,
    required: true
  },
  suppliers: [{
    type: Schema.Types.ObjectId,
    ref: 'Supplier',
    required: false
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
    required: false
  }],
  ingredients: [{
    type: Schema.Types.ObjectId,
    ref: 'Material',
    required: false
  }],
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export type MaterialsDocument = materials & Document;

export const getMaterialsModel = (businessNumber: string): DataBaseRepository<MaterialsDocument> => {
  if (!businessNumber) {
    throw new Error('businessNumber is required in materials model');
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  // Register Tag model in the same connection if not already registered
  if (!connection.models['Tag']) {
    connection.model('Tag', TagSchema);
  }
  // Register Supplier model in the same connection if not already registered
  if (!connection.models['Supplier']) {
    connection.model('Supplier', supplierSchema);
  }
  const model = connection.models['Material'] || connection.model('Material', materialsSchema) as unknown as Model<MaterialsDocument>;
  return new DataBaseRepository<MaterialsDocument>(model);
}; 