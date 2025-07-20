import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class MenuGroup {
    name: string;
    secondaryName?: string;
    subGroups: Types.ObjectId[];
    isDeleted: boolean;
}
export type MenuGroupDocument = HydratedDocument<MenuGroup> & {
    _id: string;
};
export declare const MenuGroupSchema: import("mongoose").Schema<MenuGroup, Model<MenuGroup, any, any, any, import("mongoose").Document<unknown, any, MenuGroup, any> & MenuGroup & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MenuGroup, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<MenuGroup>, {}> & import("mongoose").FlatRecord<MenuGroup> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const MENU_GROUP_MODEL = "MenuGroup";
export declare const MenuGroupModel: import("@nestjs/common").DynamicModule;
export declare const getMenuGroupsModel: (businessNumber: string) => DataBaseRepository<MenuGroupDocument>;
//# sourceMappingURL=groups.model.d.ts.map