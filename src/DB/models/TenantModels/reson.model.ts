import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { ReasonType } from '../../../common/type';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Reason {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: false })
    secondaryName?: string;

    @Prop({ required: true, enum: ReasonType })
    type!: ReasonType;

    @Prop({ default: false })
    isDeleted!: boolean;
}

export type ReasonDocument = HydratedDocument<Reason> & { _id: string };
export const ReasonSchema = SchemaFactory.createForClass(Reason);
export const REASON_MODEL = 'Reason';
export const ReasonModel = MongooseModule.forFeature([
    { name: Reason.name, schema: ReasonSchema },
]);
export const getReasonModel = (businessNumber: string): DataBaseRepository<ReasonDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in reason model")
    }
    const connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Reason'] || connection.model('Reason', ReasonSchema) as unknown as Model<ReasonDocument>;
    return new DataBaseRepository<ReasonDocument>(model);
}