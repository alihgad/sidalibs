import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { PurchaseStatus, PurchaseType } from '../../../common/type';

// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'purchase'
})
export class Purchase {
    // Add your properties here
    @Prop({ type: String, required: true })
    referenceNumber!: string;

    @Prop({
        type: {
            supplierId: { type: Types.ObjectId, ref: 'Supplier', required: true },
            supplierName: { type: String, required: true },
        }, ref: 'Supplier', required: true
    })
    supplier!: {
        supplierId: Types.ObjectId;
        supplierName: string;
    };

    @Prop({
        type: {
            branchId: { type: Types.ObjectId, ref: 'Branch', required: true },
            branchName: { type: String, required: true },
        }, ref: 'Branch', required: true
    })
    branch!: {
        branchId: Types.ObjectId;
        branchName: string;
    };

    @Prop({ type: PurchaseType, required: true })
    type!: PurchaseType;

    @Prop({ type: PurchaseStatus, required: true, default: PurchaseStatus.DRAFT })
    status!: PurchaseStatus;

    @Prop({ type: Date, required: true })
    purchaseDate!: Date;

    

    @Prop({ type: Number, required: true, min: 0 })
    totalAmount!: number;

    @Prop({ type: Number, required: true, min: 0, default: 0 })
    taxAmount!: number;

    @Prop({ type: Number, required: true, min: 0, default: 0 })
    discountAmount!: number;

    @Prop({ type: Number, required: true, min: 0 })
    finalAmount!: number;

    @Prop({
        type: [{
            materialId: { type: Types.ObjectId, ref: 'Material' },
            materialName: { type: String },
            code: { type: String },
            quantity: { type: Number, min: 1 },
            unitPrice: { type: Number, min: 0 },
            totalPrice: { type: Number, min: 0 }
        }]
    })
    items!: {
        materialId: Types.ObjectId;
        materialName: string;
        code: string;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
    }[];

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    createdBy!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    receivedBy?: Types.ObjectId;

    @Prop({ type: Date })
    receivedAt?: Date;

    @Prop({ type: String })
    notes?: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    returnedBy?: Types.ObjectId;

    @Prop({ type: Date })
    returnedAt?: Date;

    @Prop({ type: String })
    returnedNotes?: string;


    @Prop({ type: Date })
    invoiceDate?: Date;

    @Prop({ type: String })
    invoiceNumber?: string;

    @Prop({ type: Number,  })
    additionalCosts?: number;

    @Prop({ type: Number,  })
    paidTaxAmount?: number;

  
    
}

export type PurchaseDocument = HydratedDocument<Purchase>;
export const PurchaseSchema = SchemaFactory.createForClass(Purchase);

// Indexes for better performance
PurchaseSchema.index({ purchaseNumber: 1 });
PurchaseSchema.index({ purchaseOrderId: 1 });
PurchaseSchema.index({ supplierId: 1 });
PurchaseSchema.index({ branchId: 1 });
PurchaseSchema.index({ status: 1 });
PurchaseSchema.index({ purchaseDate: -1 });
PurchaseSchema.index({ isDeleted: 1 });
PurchaseSchema.index({ createdAt: -1 });

export const PURCHASE_MODEL = 'PURCHASE_MODEL';
export const PurchaseModel = MongooseModule.forFeature([
    { name: 'Purchase', schema: PurchaseSchema }
]);

export const getPurchaseModel = (businessNumber: string): DataBaseRepository<PurchaseDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in purchase model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);

    // Register required models for refs

    if (!connection.models['Supplier']) {
        const { supplierSchema } = require('./supplier.model');
        connection.model('Supplier', supplierSchema);
    }
    if (!connection.models['Branch']) {
        const { BranchSchema } = require('../TenantModels/branch.model');
        connection.model('Branch', BranchSchema);
    }
    if (!connection.models['User']) {
        const { UserSchema } = require('../userModels/users.model');
        connection.model('User', UserSchema);
    }
    if (!connection.models['Material']) {
        const { MaterialsSchema } = require('./materials.model');
        connection.model('Material', MaterialsSchema);
    }

    const model = connection.models['Purchase'] || connection.model('Purchase', PurchaseSchema) as unknown as Model<PurchaseDocument>;
    return new DataBaseRepository<PurchaseDocument>(model);
}






