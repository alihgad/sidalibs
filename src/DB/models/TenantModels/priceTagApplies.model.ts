import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { TagSchema } from './tags.model';
import { BranchSchema } from './branch.model';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class PriceTagApplies {
    @Prop({ required: true })
    name!: string; // الاسم الأول لوسم السعر

    @Prop({ required: true })
    secondName!: string; // الاسم الثانوي لوسم السعر

    @Prop({ type: Types.ObjectId, ref: 'Tag', required: true })
    orderTag!: Types.ObjectId; // ريف على وسم الطلبات

    @Prop({ default: false })
    autoApplyToNewBranches!: boolean; // تطبيق تلقائي على الفروع الجديدة

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Branch' }], default: [] })
    specificBranches!: Types.ObjectId[]; // فروع محددة (إذا لم يكن تطبيق تلقائي)

    @Prop({ default: false })
    isDeleted!: boolean; // محذوف
}

export type PriceTagAppliesDocument = HydratedDocument<PriceTagApplies> & { _id: string };
export const PriceTagAppliesSchema = SchemaFactory.createForClass(PriceTagApplies);
export const PRICE_TAG_APPLIES_MODEL = 'PriceTagApplies';
export const PriceTagAppliesModel = MongooseModule.forFeature([
    { name: PriceTagApplies.name, schema: PriceTagAppliesSchema },
]);

export const getPriceTagAppliesModel = (businessNumber: string): DataBaseRepository<PriceTagAppliesDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in price tag applies model")
    }
    const connection = ConnectionManager.getConnection(businessNumber);
    
    // تسجيل الـ models المطلوبة للـ refs
    if (!connection.models['Tag']) {
        connection.model('Tag', TagSchema);
    }
    if (!connection.models['Branch']) {
        connection.model('Branch', BranchSchema);
    }
    
    const model = connection.models['PriceTagApplies'] || connection.model('PriceTagApplies', PriceTagAppliesSchema) as unknown as Model<PriceTagAppliesDocument>;
    return new DataBaseRepository<PriceTagAppliesDocument>(model);
}