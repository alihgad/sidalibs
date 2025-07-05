import { HydratedDocument, Model, Types } from 'mongoose';
import { deviceTypeEnum, PlanDuration, PlanType } from '../../../common/type';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Device {
    name: string;
    deviceType: deviceTypeEnum;
    branchId: Types.ObjectId;
    activationCode: string;
    isActivated: boolean;
    jwtSecret?: string;
    lastActivatedAt?: Date;
    lastOnlineAt?: Date;
    currentSubscription: {
        plan: PlanType;
        duration: PlanDuration;
        paid: boolean;
        startDate: Date;
        endDate: Date;
        branchId: Types.ObjectId;
        receiptUrl?: string;
        amountPaid?: number;
        currency?: string;
    };
    subscriptionHistory: {
        plan: PlanType;
        duration: PlanDuration;
        paid: boolean;
        startDate: Date;
        receiptUrl?: string;
        amountPaid?: number;
        currency?: string;
        endDate?: Date;
    }[];
}
export type DeviceDocument = HydratedDocument<Device> & {
    _id: string;
};
export declare const DeviceSchema: import("mongoose").Schema<Device, Model<Device, any, any, any, import("mongoose").Document<unknown, any, Device, any> & Device & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Device, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Device>, {}> & import("mongoose").FlatRecord<Device> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Device_MODEL = "Device_MODEL";
export declare const DeviceModel: import("@nestjs/common").DynamicModule;
export declare const getDevices: (businessNumber: string) => DataBaseRepository<DeviceDocument>;
//# sourceMappingURL=device.model.d.ts.map