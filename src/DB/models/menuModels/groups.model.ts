import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class MenuGroup {
    @Prop({ required: true })
    name!: string;

    @Prop({ type: String, required: false })
    secondaryName?: string;

    // المجموعات الفرعية (يمكن أن تحتوي المجموعة على مجموعات أخرى)
    @Prop({ type: [{ type: Types.ObjectId, ref: 'MenuGroup' }], default: [] })
    subGroups!: Types.ObjectId[];

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean;
}

export type MenuGroupDocument = HydratedDocument<MenuGroup> & { _id: string };
export const MenuGroupSchema = SchemaFactory.createForClass(MenuGroup);
export const MENU_GROUP_MODEL = 'MenuGroup';
export const MenuGroupModel = MongooseModule.forFeature([
    { name: MenuGroup.name, schema: MenuGroupSchema },
]);

export const getMenuGroupsModel = (businessNumber: string): DataBaseRepository<MenuGroupDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in Menu group model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['MenuGroup'] || connection.model('MenuGroup', MenuGroupSchema) as unknown as Model<MenuGroupDocument>;
    return new DataBaseRepository<MenuGroupDocument>(model);
} 