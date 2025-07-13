import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
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
  collection: 'Sales'
})
export class Sales {
  @Prop({ 
    type: String, 
    required: true, 
    unique: true,
  })
  invoiceNumber!: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  salesPersonId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Customer', required: false })
  customerId?: Types.ObjectId;

  @Prop({ type: Number, required: true, min: 0 })
  totalAmount!: number;

  @Prop({ type: Number, required: true, min: 0, default: 0 , nullable: true })
  taxAmount?: number | null;

  @Prop({ type: Number, required: true, min: 0, default: 0 , nullable: true })
  discountAmount?: number | null;

  @Prop({ type: Number, required: true, min: 0 })
  finalAmount!: number;

  @Prop({ type: String, required: true, enum: ['CASH', 'CARD', 'OTHER'] , nullable: true })
  paymentMethod?: string | null;

  @Prop({ type: String, required: true, enum: ['PENDING', 'COMPLETED', 'CANCELLED', 'REFUNDED'] , nullable: true })
  status?: string | null;

  @Prop({ type: [{
    productId: { type: Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    tax: { type: Number, default: 0, min: 0 }
  }], required: true })
  items!: {
    productId: Types.ObjectId;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    discount?: number;
    tax?: number;
  }[];

  @Prop({ type: String , nullable: true })
  notes?: string | null;

  @Prop({ type: Date , nullable: true })
  completedAt?: Date | null;

  @Prop({ type: Date , nullable: true })
  cancelledAt?: Date | null;

  @Prop({ type: String , nullable: true })
  cancellationReason?: string | null;

  @Prop({ type: Types.ObjectId, ref: 'User' , nullable: true })
  cancelledBy?: Types.ObjectId | null;

  @Prop({ type: Boolean, default: false })
  isRefunded!: boolean | null;

  @Prop({ type: Date , nullable: true })
  refundedAt?: Date | null;

  @Prop({ type: Types.ObjectId, ref: 'User' , nullable: true })
  refundedBy?: Types.ObjectId | null;

  @Prop({ type: String , nullable: true })
  refundReason?: string | null;

}

export type SalesDocument = HydratedDocument<Sales>;
export const SalesSchema = SchemaFactory.createForClass(Sales);

// Indexes for better performance
SalesSchema.index({ invoiceNumber: 1 });
SalesSchema.index({ cashierId: 1 });
SalesSchema.index({ branchId: 1 });
SalesSchema.index({ customerId: 1 });
SalesSchema.index({ status: 1 });
SalesSchema.index({ createdAt: -1 });

export const SALES_MODEL = 'SALES_MODEL';
export const SalesModel = MongooseModule.forFeature([
  { name: 'Sales', schema: SalesSchema }
]);



export const getSalesModel = (businessNumber: string): DataBaseRepository<SalesDocument> => {
  if (!businessNumber) {
    throw new Error("businessNumber is required in sales model")
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  
  // Register required models for refs
  if (!connection.models['User']) {
    const { UserSchema } = require('./users.model');
    connection.model('User', UserSchema);
  }
  if (!connection.models['Branch']) {
    const { BranchSchema } = require('../TenantModels/branch.model');
    connection.model('Branch', BranchSchema);
  }
  if (!connection.models['Customer']) {
    const { CustomerSchema } = require('./customers.model');
    connection.model('Customer', CustomerSchema);
  }
  if (!connection.models['Product']) {
    const { ProductSchema } = require('../productModels/product.model');
    connection.model('Product', ProductSchema);
  }

  const model = connection.models['Sales'] || connection.model('Sales', SalesSchema) as unknown as Model<SalesDocument>;
  return new DataBaseRepository<SalesDocument>(model);
}










