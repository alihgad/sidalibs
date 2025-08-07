import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class inventoryCategory {
    @Prop({ required: true })
    name!: string

    @Prop({ type: String, required: false })
    secondaryName?: string;

    @Prop({ type: String, required: true, unique: true })
    referenceNumber!: string;

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean;
}

export type inventoryCategoryDocument = HydratedDocument<inventoryCategory> & { _id: string };
export const inventoryCategorySchema = SchemaFactory.createForClass(inventoryCategory);
export const inventory_CATEGORY_MODEL = 'inventoryCategory';
export const inventoryCategoryModel = MongooseModule.forFeature([
    { name: inventoryCategory.name, schema: inventoryCategorySchema },
]);

export const getinventoryCategoriesModel = (businessNumber: string): DataBaseRepository<inventoryCategoryDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in inventory category model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['inventoryCategory'] || connection.model('inventoryCategory', inventoryCategorySchema) as unknown as Model<inventoryCategoryDocument>;
    return new DataBaseRepository<inventoryCategoryDocument>(model);
} 