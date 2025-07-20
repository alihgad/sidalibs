import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class MenuCategory {
    name: string;
    secondaryName?: string;
    referenceNumber: string;
    isDeleted: boolean;
    menuGroup?: Types.ObjectId;
}
export type MenuCategoryDocument = HydratedDocument<MenuCategory> & {
    _id: string;
};
export declare const MenuCategorySchema: import("mongoose").Schema<MenuCategory, Model<MenuCategory, any, any, any, import("mongoose").Document<unknown, any, MenuCategory, any> & MenuCategory & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MenuCategory, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<MenuCategory>, {}> & import("mongoose").FlatRecord<MenuCategory> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Menu_CATEGORY_MODEL = "MenuCategory";
export declare const MenuCategoryModel: import("@nestjs/common").DynamicModule;
export declare const getMenuCategoriesModel: (businessNumber: string) => DataBaseRepository<MenuCategoryDocument>;
//# sourceMappingURL=categories.model.d.ts.map