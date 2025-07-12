import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { PricingMethod } from '../../../common/type';
import { ProductCategorySchema } from './categories.model';
import { TagSchema } from '../TenantModels/tags.model';
import { BranchSchema } from '../TenantModels/branch.model';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class GiftCard {
    @Prop({ required: true })
    name!: string; // الاسم

    @Prop({ type: String, required: false })
    secondaryName?: string; // الاسم الثانوي

    @Prop({ type: String, required: true, unique: true })
    referenceCode!: string; // كود التعريف

    @Prop({ type: String, required: false })
    barcode?: string; // باركود

    @Prop({ type: Types.ObjectId, ref: 'ProductCategory', required: true })
    category!: Types.ObjectId; // التصنيف - مرجع على ProductCategory

    @Prop({ type: String, enum: Object.values(PricingMethod), required: true })
    pricingMethod!: PricingMethod; // طريقة التسعير - ثابت أو مفتوح

    @Prop({ type: Number, required: false })
    price?: number; // السعر - مطلوب فقط إذا كان التسعير ثابت

    @Prop({ type: Boolean, default: true })
    isActive!: boolean; // حالة النشاط

    @Prop({ type: [Types.ObjectId], ref: 'Tag', default: [] })
    tags!: Types.ObjectId[]; // الوسوم - مرجع على Tag

    @Prop({ type: [Types.ObjectId], ref: 'Branch', default: [] })
    inactiveBranches!: Types.ObjectId[]; // الفروع غير النشطة - مرجع على Branch

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean;
}

export type GiftCardDocument = HydratedDocument<GiftCard> & { _id: string };
export const GiftCardSchema = SchemaFactory.createForClass(GiftCard);
export const GIFT_CARD_MODEL = 'GiftCard';
export const GiftCardModel = MongooseModule.forFeature([
    { name: GiftCard.name, schema: GiftCardSchema },
]);

export const getGiftCardsModel = (businessNumber: string): DataBaseRepository<GiftCardDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in GiftCard model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    
    // Register required models in connection
    if (!connection.models['ProductCategory']) {
        connection.model('ProductCategory', ProductCategorySchema);
    }
    if (!connection.models['Tag']) {
        connection.model('Tag', TagSchema);
    }
    if (!connection.models['Branch']) {
        connection.model('Branch', BranchSchema);
    }
    
    const model = connection.models['GiftCard'] || connection.model('GiftCard', GiftCardSchema) as unknown as Model<GiftCardDocument>;
    return new DataBaseRepository<GiftCardDocument>(model);
} 