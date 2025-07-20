import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { ReasonType } from '../../../common/type';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'reason'
})
export class Reason {
    @Prop({ type: String, required: true })
    name!: string;

    @Prop({ type: String, required: false })
    secondaryName?: string;

    @Prop({ type: String, required: true, enum: Object.values(ReasonType) })
    type!: ReasonType;

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean;

    // Timestamps (automatically added by Mongoose)
    createdAt?: Date;
    updatedAt?: Date;
}

export type ReasonDocument = HydratedDocument<Reason>;
export const ReasonSchema = SchemaFactory.createForClass(Reason);

// Indexes for better performance
ReasonSchema.index({ name: 1 });
ReasonSchema.index({ type: 1 });
ReasonSchema.index({ isDeleted: 1 });
ReasonSchema.index({ createdAt: -1 });

export const REASON_MODEL = 'REASON_MODEL';
export const ReasonModel = MongooseModule.forFeature([
    { name: 'Reason', schema: ReasonSchema }
]);

export const getReasonModel = (businessNumber: string): DataBaseRepository<ReasonDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in reason model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Reason'] || connection.model('Reason', ReasonSchema) as unknown as Model<ReasonDocument>;
    return new DataBaseRepository<ReasonDocument>(model);
}
