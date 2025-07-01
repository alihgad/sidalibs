import { Schema, model, Model, Document, Types } from 'mongoose';
import { ConnectionManager } from '../../connection.manager';
import { DataBaseRepository } from '../../DataBase.repository';

export interface Supplier extends Document {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  contactPerson?: string;
  totalOrders: number;
  lastOrder?: Date;
  accountBalance: number;
  isDeleted: boolean;
  isBlacklisted: boolean;
  creditAccount: boolean;
  notes?: string;
}

export const supplierSchema = new Schema<Supplier>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  contactPerson: {
    type: String,
    required: false
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  lastOrder: {
    type: Date,
    required: false
  },
  accountBalance: {
    type: Number,
    default: 0
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isBlacklisted: {
    type: Boolean,
    default: false
  },
  creditAccount: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

export type SupplierDocument = Supplier & Document;

export const getSupplierModel = (businessNumber: string): DataBaseRepository<SupplierDocument> => {
  if (!businessNumber) {
    throw new Error('businessNumber is required in supplier model');
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  const model = connection.models['Supplier'] || connection.model('Supplier', supplierSchema) as unknown as Model<SupplierDocument>;
  return new DataBaseRepository<SupplierDocument>(model);
}; 