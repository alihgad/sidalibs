import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { OrderType } from '../../../common/type';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Tax {
    @Prop({ required: true })
    name!: string; // الاسم

    @Prop({ required: true })
    secondName!: string; // الاسم الثانوي

    @Prop({ required: true, min: 0, max: 100 })
    percentage!: number; // نسبة الضريبة

    @Prop({ type: [String], enum: Object.values(OrderType), required: true })
    appliesTo!: OrderType[]; // تطبق على

    @Prop({ default: false })
    isDeleted!: boolean; // محذوف
}

export type TaxDocument = HydratedDocument<Tax> & { _id: string };
export const TaxSchema = SchemaFactory.createForClass(Tax);
export const TAX_MODEL = 'Tax';
export const TaxModel = MongooseModule.forFeature([
    { name: Tax.name, schema: TaxSchema },
]);

export const getTaxModel = (businessNumber: string): DataBaseRepository<TaxDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in tax model")
    }
    const connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Tax'] || connection.model('Tax', TaxSchema) as unknown as Model<TaxDocument>;
    return new DataBaseRepository<TaxDocument>(model);
}