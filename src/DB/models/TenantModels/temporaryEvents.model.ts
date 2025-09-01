import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { TemporaryEventType, DaysOfWeek, OrderType } from '../../../common/type';
import { BranchSchema } from './branch.model';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class TemporaryEvent {
    @Prop({ required: true })
    name!: string; // اسم الفعالية المؤقتة

    @Prop()
    secondaryName?: string; // الاسم الثانوي

    @Prop({ type: String, enum: TemporaryEventType, required: true })
    type!: TemporaryEventType; // نوع الفعالية

    @Prop({ required: true })
    fixedPrice?: number; // السعر الثابت

    @Prop({ required: true })
    startDate!: Date; // تاريخ البدء

    @Prop({ required: true })
    endDate!: Date; // تاريخ الانتهاء

    @Prop({ required: true })
    startTime!: string; // وقت البدء (HH:mm)

    @Prop({ required: true })
    endTime!: string; // وقت الانتهاء (HH:mm)

    @Prop({ default: true })
    isActive!: boolean; // حالة النشاط

    @Prop({ type: [{ type: String, enum: DaysOfWeek }], required: true })
    applicableDays!: DaysOfWeek[]; // أيام تطبيق الفعالية

    @Prop({ type: [{ type: String, enum: OrderType }], required: true })
    orderTypes!: OrderType[]; // أنواع الطلبات المطبقة عليها الفعالية

    @Prop({ required: true, min: 1 })
    priority!: number; // الأولوية

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Branch' }] })
    branches?: Types.ObjectId[]; // الفروع المختارة

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }] })
    categories?: Types.ObjectId[]; // التصنيفات المختارة

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
    products?: Types.ObjectId[]; // المنتجات المختارة

    @Prop({ type: [{ type: Types.ObjectId, ref: 'ProductTag' }] })
    productTags?: Types.ObjectId[]; // وسوم المنتجات المختارة
}

export type TemporaryEventDocument = HydratedDocument<TemporaryEvent> & { _id: string };
export const TemporaryEventSchema = SchemaFactory.createForClass(TemporaryEvent);

export const TEMPORARY_EVENT_MODEL = 'TemporaryEvent';
export const TemporaryEventModel = MongooseModule.forFeature([
    { name: TemporaryEvent.name, schema: TemporaryEventSchema },
]);

export const getTemporaryEventModel = (businessNumber: string): DataBaseRepository<TemporaryEventDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in temporary event model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    if (!connection.models['Branch']) {
        connection.model('Branch', BranchSchema);
    }
    const model = connection.models['TemporaryEvent'] || connection.model('TemporaryEvent', TemporaryEventSchema) as unknown as Model<TemporaryEventDocument>;
    return new DataBaseRepository<TemporaryEventDocument>(model);
}