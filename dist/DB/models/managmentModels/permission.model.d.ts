import { DataBaseRepository } from "../../DataBase.repository";
import { HydratedDocument, Model } from "mongoose";
export declare class permission {
    name: string;
    description: string;
    key: string;
    category: string;
}
export type permissionDocument = HydratedDocument<permission> & {
    _id: string;
};
export declare const permissionSchema: import("mongoose").Schema<permission, Model<permission, any, any, any, import("mongoose").Document<unknown, any, permission, any> & permission & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, permission, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<permission>, {}> & import("mongoose").FlatRecord<permission> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const permission_MODEL = "PERMISSION_MODEL";
export declare const permissionModel: import("@nestjs/common").DynamicModule;
export declare const getpermissionModel: () => DataBaseRepository<permissionDocument>;
//# sourceMappingURL=permission.model.d.ts.map