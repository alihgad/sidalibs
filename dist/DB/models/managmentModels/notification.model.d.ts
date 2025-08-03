import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Notification {
    constructor(name: string, triggerType: string, applyOn: string[], frequency: string, usersToBeNotified?: Types.ObjectId[], rolesToBeNotified?: Types.ObjectId[], isActive?: boolean, customSchedule?: string, triggerCount?: number);
    name: string;
    triggerType: string;
    applyOn: string[];
    frequency: string;
    usersToBeNotified: Types.ObjectId[];
    rolesToBeNotified: Types.ObjectId[];
    isActive: boolean;
}
export type NotificationDocument = HydratedDocument<Notification>;
export declare const NotificationSchema: import("mongoose").Schema<Notification, Model<Notification, any, any, any, import("mongoose").Document<unknown, any, Notification, any> & Notification & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Notification, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Notification>, {}> & import("mongoose").FlatRecord<Notification> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const NOTIFICATION_MODEL = "NOTIFICATION_MODEL";
export declare const NotificationModel: import("@nestjs/common").DynamicModule;
export declare const getManagmentNotificationModel: (businessNumber: string) => DataBaseRepository<NotificationDocument>;
//# sourceMappingURL=notification.model.d.ts.map