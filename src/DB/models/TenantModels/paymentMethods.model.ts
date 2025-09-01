import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { PaymentMethodType } from '../../../common/type';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class PaymentMethod {
    @Prop({ required: true })
    name!: string; // الاسم

    @Prop({ required: true })
    secondName!: string; // الاسم الثانوي

    @Prop({ type: String, enum: Object.values(PaymentMethodType), required: true })
    type!: PaymentMethodType; // النوع

    @Prop({ required: true, unique: true })
    code!: string; // الكود

    @Prop({ default: false })
    autoOpenDrawer!: boolean; // فتح درج النقود تلقائياً

    @Prop({ default: true })
    isActive!: boolean; // حالة النشاط

    @Prop({ default: false })
    isDeleted!: boolean; // محذوف
}

export type PaymentMethodDocument = HydratedDocument<PaymentMethod> & { _id: string };
export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
export const PAYMENT_METHOD_MODEL = 'PaymentMethod';
export const PaymentMethodModel = MongooseModule.forFeature([
    { name: PaymentMethod.name, schema: PaymentMethodSchema },
]);

export const getPaymentMethodModel = (businessNumber: string): DataBaseRepository<PaymentMethodDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in payment method model")
    }
    const connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['PaymentMethod'] || connection.model('PaymentMethod', PaymentMethodSchema) as unknown as Model<PaymentMethodDocument>;
    return new DataBaseRepository<PaymentMethodDocument>(model);
}