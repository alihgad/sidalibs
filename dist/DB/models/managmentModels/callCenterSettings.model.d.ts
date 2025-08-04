import { Document, HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class CallCenterSettings {
    agents?: Types.ObjectId[];
    acceptedPaymentModes?: Types.ObjectId[];
    inactiveBranches?: Types.ObjectId[];
    menuGroup?: Types.ObjectId;
    inactiveOrderTypes?: string[];
    allowDiscounts?: boolean;
    allowEditingOrders?: boolean;
    allowVoidingActiveOrders?: boolean;
    allowAgentsToReadAllCCOrders?: boolean;
    allowAgentsToReadAllOrders?: boolean;
    allowPriceTags?: boolean;
}
export type CallCenterSettingsDocument = HydratedDocument<CallCenterSettings>;
export declare const CallCenterSettingsSchema: import("mongoose").Schema<CallCenterSettings, Model<CallCenterSettings, any, any, any, Document<unknown, any, CallCenterSettings, any> & CallCenterSettings & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CallCenterSettings, Document<unknown, {}, import("mongoose").FlatRecord<CallCenterSettings>, {}> & import("mongoose").FlatRecord<CallCenterSettings> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const getCallCenterSettingsModel: (businessNumber: string) => DataBaseRepository<CallCenterSettingsDocument>;
//# sourceMappingURL=callCenterSettings.model.d.ts.map