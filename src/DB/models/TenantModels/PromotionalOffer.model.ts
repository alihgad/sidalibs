import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { BranchSchema } from './branch.model';
import { DaysOfWeek, OrderType, PromotionType } from '../../../common/type';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class PromotionalOffer {
    @Prop({ required: true })
    name!: string; // الاسم

    @Prop()
    secondaryName?: string; // الاسم الثانوي

    @Prop({ required: true })
    startDate!: Date; // تاريخ البدء

    @Prop({ required: true })
    endDate!: Date; // تاريخ الانتهاء

    @Prop({ required: true })
    startTime!: string; // وقت البدء (HH:mm)

    @Prop({ required: true })
    endTime!: string; // وقت الانتهاء (HH:mm)

    @Prop({ type: [String], enum: DaysOfWeek, required: true })
    applicableDays!: DaysOfWeek[]; // تطبيق على الأيام

    @Prop({ type: [String], enum: OrderType, required: true })
    orderType!: OrderType[]; // تطبيق على أنواع الطلب

    @Prop({ required: true, default: 1 })
    priority!: number; // الأولوية

    @Prop({ default: false })
    includeAddons!: boolean; // تضمين الاضافات

    @Prop({ type: [String], enum: PromotionType, required: true })
    promotionType!: PromotionType[]; // نوع العرض الترويجي

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Branch' }], required: true })
    branches!: Types.ObjectId[]; // تطبيق في فروع

    @Prop({ default: true })
    isActive!: boolean; // حالة النشاط
}

export type PromotionalOfferDocument = HydratedDocument<PromotionalOffer> & { 
    _id: string;
    createdAt: Date;
    updatedAt: Date;
};
export const PromotionalOfferSchema = SchemaFactory.createForClass(PromotionalOffer);
export const PROMOTIONAL_OFFER_MODEL = 'PromotionalOffer';
export const PromotionalOfferModel = MongooseModule.forFeature([
    { name: PromotionalOffer.name, schema: PromotionalOfferSchema },
]);

export const getPromotionalOfferModel = (businessNumber: string): DataBaseRepository<PromotionalOfferDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in promotional offer model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    
    // Check if Branch model is already registered
    if (!connection.models['Branch']) {
        connection.model('Branch', BranchSchema);
    }

    const model = connection.models['PromotionalOffer'] || connection.model('PromotionalOffer', PromotionalOfferSchema) as unknown as Model<PromotionalOfferDocument>;
    return new DataBaseRepository<PromotionalOfferDocument>(model);
}