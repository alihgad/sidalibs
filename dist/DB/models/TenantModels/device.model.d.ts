import { Collection, HydratedDocument, Model, Types } from 'mongoose';
import { licencesEnum, PlanDuration } from '../../../common/type';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Device {
    name: string;
    deviceType: licencesEnum;
    branchId: Types.ObjectId | undefined;
    activationCode: string;
    isActivated: boolean;
    jwtSecret?: string;
    lastActivatedAt?: Date;
    lastOnlineAt?: Date;
    currentSubscription: {
        duration: PlanDuration;
        paid: boolean;
        startDate: Date;
        endDate: Date;
        receiptUrl?: string;
    };
    subscriptionHistory: {
        duration: PlanDuration;
        paid: boolean;
        startDate: Date;
        receiptUrl?: string;
        endDate?: Date;
    }[];
    autoRenew: boolean;
    isDeleted: boolean;
    isActive: boolean;
    isOpened: boolean;
    openedAt: Date | null;
    depositAmount: number;
    currentCashAmount: number;
}
export type DeviceDocument = HydratedDocument<Device> & {
    _id: string;
};
export declare const DeviceSchema: import("mongoose").Schema<Device, Model<Device, any, any, any, import("mongoose").Document<unknown, any, Device, any, {}> & Device & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Device, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Device>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Device> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Device_MODEL = "Device_MODEL";
export declare const DeviceModel: import("@nestjs/common").DynamicModule;
export declare const getDevices: (businessNumber: string) => DataBaseRepository<DeviceDocument>;
export declare const getDeviceCollection: (businessNumber: string) => Collection<DeviceDocument>;
//# sourceMappingURL=device.model.d.ts.map