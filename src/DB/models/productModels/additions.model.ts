import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Addition {
    @Prop({ required: true })
    name!: string;

    @Prop({ type: String, required: false })
    secondaryName?: string;

    @Prop({ type: String, required: true, unique: true })
    referenceNumber!: string;

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean;
}

export type AdditionDocument = HydratedDocument<Addition> & { _id: string };
export const AdditionSchema = SchemaFactory.createForClass(Addition);
export const ADDITION_MODEL = 'Addition';
export const AdditionModel = MongooseModule.forFeature([
    { name: Addition.name, schema: AdditionSchema },
]);

export const getAdditionsModel = (businessNumber: string): DataBaseRepository<AdditionDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in Addition model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Addition'] || connection.model('Addition', AdditionSchema) as unknown as Model<AdditionDocument>;
    return new DataBaseRepository<AdditionDocument>(model);
} 