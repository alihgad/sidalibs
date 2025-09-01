import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'inventorySpots'
})
export class InventorySpot {
    @Prop({
        type: {
            branchId: { type: Types.ObjectId, ref: 'Branch' },
            branchName: { type: String },
        },
        required: true
    })
    branch!: {
        branchId: Types.ObjectId;
        branchName: string;
    };

    @Prop({ type: Date, required: true })
    workDate!: Date;

    @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
    createdBy!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    sendBy!: Types.ObjectId;

    @Prop({ type: Date })
    sendAt!: Date;

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean;

    @Prop({ type: String })
    totalDiffCost!: string;

    @Prop({ type: [{
        materialId: Types.ObjectId,
        materialName: String,
        materialCode: String,
        insertedQuantity: Number,
        materialQuantity: Number,
        diffQuantity: Number,
        diffPercent: String,
        diffCost: String,
    }] })
    items!: {
        materialId: Types.ObjectId,
        materialName: String,
        materialCode: String,
        insertedQuantity: String,
        materialQuantity: String,
        diffQuantity: String,
        diffPercent: String,
        diffCost: String,
    }[];

    @Prop({ type: Types.ObjectId, ref: 'User' })
    deletedBy!: Types.ObjectId;

    @Prop({ type: Date })
    deletedAt!: Date;



}

export type InventorySpotDocument = HydratedDocument<InventorySpot>;
export const InventorySpotSchema = SchemaFactory.createForClass(InventorySpot);

// Indexes for better performance
InventorySpotSchema.index({ locationType: 1 });
InventorySpotSchema.index({ locationId: 1 });
InventorySpotSchema.index({ section: 1 });
InventorySpotSchema.index({ isActive: 1 });
InventorySpotSchema.index({ isDeleted: 1 });
InventorySpotSchema.index({ createdAt: -1 });
InventorySpotSchema.index({ updatedBy: 1 });
InventorySpotSchema.index({ deletedBy: 1 });

// Compound indexes
InventorySpotSchema.index({ locationId: 1, section: 1 });
InventorySpotSchema.index({ locationId: 1, isDeleted: 1 });
InventorySpotSchema.index({ code: 1, isDeleted: 1 }, { unique: true });

export const INVENTORY_SPOT_MODEL = 'INVENTORY_SPOT_MODEL';
export const InventorySpotModel = MongooseModule.forFeature([
    { name: 'InventorySpot', schema: InventorySpotSchema }
]);

export const getInventorySpotModel = (businessNumber: string): DataBaseRepository<InventorySpotDocument> => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in inventory spot model');
    }
    let connection = ConnectionManager.getConnection(businessNumber);

    // Register required models for refs
    if (!connection.models['Warehouse']) {
        const { WarehouseSchema } = require('./warehouse.model');
        connection.model('Warehouse', WarehouseSchema);
    }
    if (!connection.models['Branch']) {
        const { BranchSchema } = require('../TenantModels/branch.model');
        connection.model('Branch', BranchSchema);
    }
    if (!connection.models['User']) {
        const { UserSchema } = require('../userModels/users.model');
        connection.model('User', UserSchema);
    }

    const model = connection.models['InventorySpot'] || connection.model('InventorySpot', InventorySpotSchema) as unknown as Model<InventorySpotDocument>;
    return new DataBaseRepository<InventorySpotDocument>(model);
}








