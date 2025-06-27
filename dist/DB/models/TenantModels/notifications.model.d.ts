import { DataBaseRepository } from "../../DataBase.repository";
import { HydratedDocument, Model } from "mongoose";
export declare class notifications {
    key: string;
    label: string;
}
export type notificationsDocument = HydratedDocument<notifications> & {
    _id: string;
};
export declare const notificationsSchema: import("mongoose").Schema<notifications, Model<notifications, any, any, any, import("mongoose").Document<unknown, any, notifications, any> & notifications & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, notifications, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<notifications>, {}> & import("mongoose").FlatRecord<notifications> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const notifications_MODEL = "notifications_MODEL";
export declare const notificationsModel: import("@nestjs/common").DynamicModule;
export declare const getnotificationsModel: () => DataBaseRepository<notificationsDocument>;
//# sourceMappingURL=notifications.model.d.ts.map