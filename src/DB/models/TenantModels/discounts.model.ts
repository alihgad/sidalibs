import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { DiscountAppliesTo, DiscountType } from '../../../common/type';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Discount {
    @Prop({ required: true })
    name!: string; // الاسم

    @Prop({ type: [String], enum: DiscountAppliesTo, required: true })
    appliesTo!: DiscountAppliesTo[]; // يطبق على

    @Prop()
    secondaryName?: string; // الإسم الثانوي

    @Prop({ type: [String], enum: DiscountType, required: true })
    type!: DiscountType[]; // نوع الخصم

    @Prop()
    referenceNumber?: string; // الرقم المرجعي

    @Prop({ default: false })
    isTaxable!: boolean; // خاضع للضريبه

    @Prop({ default: false })
    isDeleted!: boolean; // هل تم حذفه
}

export type DiscountDocument = HydratedDocument<Discount> & { _id: string };
export const DiscountSchema = SchemaFactory.createForClass(Discount);
export const DISCOUNT_MODEL = 'Discount';
export const DiscountModel = MongooseModule.forFeature([
    { name: Discount.name, schema: DiscountSchema },
]);

export const getDiscountModel = (businessNumber: string): DataBaseRepository<DiscountDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in discount model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Discount'] || connection.model('Discount', DiscountSchema) as unknown as Model<DiscountDocument>;
    return new DataBaseRepository<DiscountDocument>(model);
}