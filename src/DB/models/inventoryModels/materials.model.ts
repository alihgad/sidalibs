import { Schema, model, Model, Document } from 'mongoose';

export interface materials extends Document {
  name: string;
  phone: string;
  email?: string;
  totalOrders: number;
  lastOrder?: Date;
  accountBalance: number;
  isDeleted: boolean;
  isBlacklisted: boolean;
  creditAccount: boolean;
  notes?: string;
}

const materialsSchema = new Schema<materials>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  phone: {
    type: String,
    required: true
  },
  email: {
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

export const getMaterialsModel = (businessNumber: string): Model<materials> => {
  return model<materials>(`materials`, materialsSchema);
}; 