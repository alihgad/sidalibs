import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class User {
    constructor(firstName: string, lastName: string, phone: string, role: Types.ObjectId[], isOwner: Boolean, jwtSecret: string, cashierLogin?: string, email?: string, password?: string, notifications?: string[], loginDevicesSession?: Map<string, {
        LSID: string;
        userAgent: string;
        ipAddress: string;
        createdAt: Date;
        deviceType?: string;
    }>);
    firstName: string;
    lastName: string;
    email?: string;
    password?: string;
    phone: string;
    isOwner: Boolean;
    role: Types.ObjectId[];
    notifications: string[];
    jwtSecret: string;
    cashierLogin?: string;
    branches: Types.ObjectId[];
    language?: string;
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    loginDevicesSession?: Map<string, {
        LSID: string;
        browser?: string;
        os?: string;
        ipAddress: string;
        createdAt: Date;
        deviceType?: string;
    }>;
    userName?: string;
}
export type UserDocument = HydratedDocument<User>;
export declare const UserSchema: import("mongoose").Schema<User, Model<User, any, any, any, import("mongoose").Document<unknown, any, User, any> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const USER_MODEL = "USER_MODEL";
export declare const UserModel: import("@nestjs/common").DynamicModule;
export declare const getUserModel: (businessNumber: string) => DataBaseRepository<UserDocument>;
//# sourceMappingURL=users.model.d.ts.map