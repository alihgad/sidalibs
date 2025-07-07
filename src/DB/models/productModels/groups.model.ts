import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class ProductGroup {
    @Prop({ required: true })
    name!: string;

    @Prop({ type: String, required: false })
    secondaryName?: string;

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean;
}

export type ProductGroupDocument = HydratedDocument<ProductGroup> & { _id: string };
export const ProductGroupSchema = SchemaFactory.createForClass(ProductGroup);
export const Product_GROUP_MODEL = 'ProductGroup';
export const ProductGroupModel = MongooseModule.forFeature([
    { name: ProductGroup.name, schema: ProductGroupSchema },
]);

export const getProductGroupsModel = (businessNumber: string): DataBaseRepository<ProductGroupDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in Product category model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['ProductGroup'] || connection.model('ProductGroup', ProductGroupSchema) as unknown as Model<ProductGroupDocument>;
    return new DataBaseRepository<ProductGroupDocument>(model);
} 