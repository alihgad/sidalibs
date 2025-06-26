import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { Tax, TaxSchema } from './taxes.model';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class TaxGroup {
    @Prop({ required: true })
    name!: string; // الاسم

    @Prop({ required: true })
    secondName!: string; // الاسم الثانوي

    @Prop({ required: true, unique: true })
    code!: string; // الرقم المرجعي

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Tax' }], required: true })
    taxes!: Tax[]; // مجموعة الضرائب

    @Prop({ default: false })
    isDeleted!: boolean; // محذوف
}

export type TaxGroupDocument = HydratedDocument<TaxGroup> & { _id: string };
export const TaxGroupSchema = SchemaFactory.createForClass(TaxGroup);
export const TAX_GROUP_MODEL = 'TaxGroup';
export const TaxGroupModel = MongooseModule.forFeature([
    { name: TaxGroup.name, schema: TaxGroupSchema },
]);

export const getTaxGroupModel = (businessNumber: string): DataBaseRepository<TaxGroupDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in tax group model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    if(!connection.models["Tax"]){
        connection.model('Tax', TaxSchema);
    }
    const model = connection.models['TaxGroup'] || connection.model('TaxGroup', TaxGroupSchema) as unknown as Model<TaxGroupDocument>;
    return new DataBaseRepository<TaxGroupDocument>(model);
} 