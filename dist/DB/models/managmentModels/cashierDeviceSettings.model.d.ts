import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export type CashierSettingsDocument = HydratedDocument<CashierSettings>;
export declare class CashierSettings {
    businessNumber: string;
    preApprovedPaymentAmounts: string;
    paymentCurrencies: string;
    predefinedTipPercentages: string;
    orderRaisingDelayMinutes: number;
    inactiveUserLogoutMinutes: number;
    returnPeriodType: string;
    returnPeriodMinutes: number;
    requiredOrderTags: string;
    roundingMethod: string;
    enableTips: boolean;
    discountsRequireCustomerInfo: boolean;
    cancellationRequiresCustomerInfo: boolean;
    tableSelectionRequiredForLocalOrders: boolean;
    alwaysAskCancellationReason: boolean;
    autoSendOrderToKitchenAfterPayment: boolean;
    autoSyncDataAtWorkdayStart: boolean;
    autoPrintProductReport: boolean;
    autoPrintLiabilitiesReport: boolean;
    preventEndDayBeforeInventoryCount: boolean;
    autoCloseSelfServiceOrders: boolean;
    preventSellingOutOfStockProducts: boolean;
    printPaymentReceiptForActiveOrders: boolean;
    allowOpeningOneLiability: boolean;
    requireCustomerInfoBeforeClosingOrder: boolean;
}
export declare const CashierSettingsSchema: import("mongoose").Schema<CashierSettings, Model<CashierSettings, any, any, any, import("mongoose").Document<unknown, any, CashierSettings, any> & CashierSettings & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CashierSettings, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CashierSettings>, {}> & import("mongoose").FlatRecord<CashierSettings> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const CASHIER_SETTINGS_MODEL = "CASHIER_SETTINGS_MODEL";
export declare const CashierSettingsModel: import("@nestjs/common").DynamicModule;
export declare const getCashierSettingsModel: () => DataBaseRepository<CashierSettingsDocument>;
//# sourceMappingURL=cashierDeviceSettings.model.d.ts.map