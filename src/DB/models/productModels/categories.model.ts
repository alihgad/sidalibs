import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class ProductCategory {
    @Prop({ required: true })
    name!: string;

    @Prop({ type: String, required: false })
    secondaryName?: string;

    @Prop({ type: String, required: true, unique: true })
    referenceNumber!: string;

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean;
}

export type ProductCategoryDocument = HydratedDocument<ProductCategory> & { _id: string };
export const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory);
export const Product_CATEGORY_MODEL = 'ProductCategory';
export const ProductCategoryModel = MongooseModule.forFeature([
    { name: ProductCategory.name, schema: ProductCategorySchema },
]);

export const getProductCategoriesModel = (businessNumber: string): DataBaseRepository<ProductCategoryDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in Product category model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['ProductCategory'] || connection.model('ProductCategory', ProductCategorySchema) as unknown as Model<ProductCategoryDocument>;
    return new DataBaseRepository<ProductCategoryDocument>(model);
} 