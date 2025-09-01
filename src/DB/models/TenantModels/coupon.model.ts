import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { DiscountSchema } from './discounts.model';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Coupon {
    @Prop({ required: true })
    name!: string; // الاسم

    @Prop({ required: true, unique: true })
    code!: string; // الكود

    @Prop({ type: Types.ObjectId, ref: 'Discount', required: true })
    discount!: Types.ObjectId; // الخصم

    @Prop({ required: true })
    maxUsage!: number; // أقصى استخدام

    @Prop({ required: true })
    startDate!: Date; // تاريخ البداية

    @Prop({ required: true })
    endDate!: Date; // تاريخ النهاية

    @Prop({ default: false })
    isDeleted!: boolean; // محذوف

    @Prop({ default: true })
    isActive!: boolean; // حالة النشاط
}

export type CouponDocument = HydratedDocument<Coupon> & { _id: string };
export const CouponSchema = SchemaFactory.createForClass(Coupon);
export const COUPON_MODEL = 'Coupon';
export const CouponModel = MongooseModule.forFeature([
    { name: Coupon.name, schema: CouponSchema },
]);
export const getCouponModel = (businessNumber: string): DataBaseRepository<CouponDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in coupon model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    if(!connection.models["Discount"]){
        connection.model('Discount', DiscountSchema);
    }
    const model = connection.models['Coupon'] || connection.model('Coupon', CouponSchema) as unknown as Model<CouponDocument>;
    return new DataBaseRepository<CouponDocument>(model);
}