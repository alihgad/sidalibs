import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Brand {
    @Prop({ required: true })
    name!: string;
    @Prop({ type: String, })
    type!: string;
}
export type BrandDocument = HydratedDocument<Brand> & { _id: string };
export const BrandSchema = SchemaFactory.createForClass(Brand);
export const Brand_MODEL = 'Brand_MODEL';
export const BrandModel = MongooseModule.forFeature([
    { name: Brand.name, schema: BrandSchema },
]);


export const getBrandModel = (businessNumber: string): DataBaseRepository<BrandDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in brand model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Brand'] || connection.model('Brand', BrandSchema) as unknown as Model<BrandDocument>;
    return new DataBaseRepository<BrandDocument>(model);
}