import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class additions {
    @Prop({ required: true })
    name!: string;

    @Prop({ type: String, required: false })
    secondaryName?: string;

    @Prop({ type: String, required: true, unique: true })
    referenceNumber!: string;

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean;
}

export type additionsDocument = HydratedDocument<additions> & { _id: string };
export const additionsSchema = SchemaFactory.createForClass(additions);
export const Product_CATEGORY_MODEL = 'additions';
export const additionsModel = MongooseModule.forFeature([
    { name: additions.name, schema: additionsSchema },
]);

export const getProductCategoriesModel = (businessNumber: string): DataBaseRepository<additionsDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in Product category model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['additions'] || connection.model('additions', additionsSchema) as unknown as Model<additionsDocument>;
    return new DataBaseRepository<additionsDocument>(model);
} 