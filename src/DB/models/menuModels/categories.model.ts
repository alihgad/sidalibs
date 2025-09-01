import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model , Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { MenuGroupSchema } from './groups.model';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class MenuCategory {
    @Prop({ required: true })
    name!: string;

    @Prop({ type: String, required: false })
    secondaryName?: string;

    @Prop({ type: String, required: true, unique: true })
    referenceNumber!: string;

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean;

    @Prop({ type: Types.ObjectId, ref: 'MenuGroup', required: false })
    menuGroup?: Types.ObjectId;
}

export type MenuCategoryDocument = HydratedDocument<MenuCategory> & { _id: string };
export const MenuCategorySchema = SchemaFactory.createForClass(MenuCategory);
export const Menu_CATEGORY_MODEL = 'MenuCategory';
export const MenuCategoryModel = MongooseModule.forFeature([
    { name: MenuCategory.name, schema: MenuCategorySchema },
]);

export const getMenuCategoriesModel = (businessNumber: string): DataBaseRepository<MenuCategoryDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in Menu category model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['MenuCategory'] || connection.model('MenuCategory', MenuCategorySchema) as unknown as Model<MenuCategoryDocument>;
    if (!connection.models['MenuGroup']) {
        connection.model('MenuGroup', MenuGroupSchema);
    }
    return new DataBaseRepository<MenuCategoryDocument>(model);
} 