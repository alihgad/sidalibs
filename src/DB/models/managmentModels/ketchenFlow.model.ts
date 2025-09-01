import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';

// Embedded schema for stations
@Schema({ _id: false })
export class Station {
    @Prop({ type: String, required: true })
    name!: string;

    @Prop({ type: Types.ObjectId, ref: 'Device', required: true })
    kitchenDisplayId!: Types.ObjectId;

    @Prop({ type: Number, required: true })
    order!: number;
}

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'kitchenFlows'
})
export class KitchenFlow {
    @Prop({ type: String, required: true })
    name!: string;

    @Prop({ type: [Types.ObjectId], ref: 'Branch', required: true })
    branches!: Types.ObjectId[];

    @Prop({ type: [Station], required: true, default: [] })
    stations!: Station[];

    @Prop({ type: [Types.ObjectId], ref: 'Product', required: true })
    products!: Types.ObjectId[];

    @Prop({ type: Boolean, default: true })
    isActive!: boolean;

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    deletedBy?: Types.ObjectId;

    @Prop({ type: Date })
    deletedAt?: Date;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdAt?: Date;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    updatedAt?: Date;


    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    updatedBy?: Types.ObjectId;

}

export type KitchenFlowDocument = HydratedDocument<KitchenFlow>;
export const KitchenFlowSchema = SchemaFactory.createForClass(KitchenFlow);

// Indexes for better performance
KitchenFlowSchema.index({ name: 1 });
KitchenFlowSchema.index({ branches: 1 });
KitchenFlowSchema.index({ products: 1 });
KitchenFlowSchema.index({ isActive: 1 });
KitchenFlowSchema.index({ isDeleted: 1 });
KitchenFlowSchema.index({ deletedBy: 1 });
KitchenFlowSchema.index({ deletedAt: 1 });
KitchenFlowSchema.index({ createdAt: -1 });
KitchenFlowSchema.index({ updatedAt: -1 });

// Compound indexes
KitchenFlowSchema.index({ name: 1, isDeleted: 1 });
KitchenFlowSchema.index({ isActive: 1, isDeleted: 1 });
KitchenFlowSchema.index({ branches: 1, isActive: 1 });
KitchenFlowSchema.index({ branches: 1, isDeleted: 1 });
KitchenFlowSchema.index({ products: 1, isActive: 1 });
    KitchenFlowSchema.index({ products: 1, isDeleted: 1 });

export const KITCHEN_FLOW_MODEL = 'KitchenFlow';
export const KitchenFlowModel = MongooseModule.forFeature([
    { name: KITCHEN_FLOW_MODEL, schema: KitchenFlowSchema }
]);

export const getKitchenFlowModel = (businessNumber: string): DataBaseRepository<KitchenFlowDocument> => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in kitchen flow model');
    }
    let connection = ConnectionManager.getConnection(businessNumber);

    // Register required models for refs
    if (!connection.models['Branch']) {
        const { BranchSchema } = require('../TenantModels/branch.model');
        connection.model('Branch', BranchSchema);
    }
    if (!connection.models['Product']) {
        const { ProductSchema } = require('../menuModels/product.model');
        connection.model('Product', ProductSchema);
    }
    if (!connection.models['Device']) {
        const { DeviceSchema } = require('../TenantModels/device.model');
        connection.model('Device', DeviceSchema);
    }
    if (!connection.models['User']) {
        const { UserSchema } = require('./users.model');
        connection.model('User', UserSchema);
    }

    const model = connection.models[KITCHEN_FLOW_MODEL] || connection.model(KITCHEN_FLOW_MODEL, KitchenFlowSchema) as unknown as Model<KitchenFlowDocument>;
    return new DataBaseRepository<KitchenFlowDocument>(model);
}; 