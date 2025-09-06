import { Document, HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Settings {
    businessNumber: string;
    displayAppCoverPhoto?: {
        secure_url: string;
        public_id: string;
    };
    kitchenOrderingMethod?: string;
    enablePrintingAndShowingDefaultAdditionOnReceiptAndKDS?: boolean;
    logo?: {
        secure_url: string;
        public_id: string;
    };
    headerText?: string;
    footerText?: string;
    RestrictInventoryTransactionsToAvailableQuantities?: boolean;
}
export type SettingsDocument = HydratedDocument<Settings>;
export declare const SettingsSchema: import("mongoose").Schema<Settings, Model<Settings, any, any, any, Document<unknown, any, Settings, any, {}> & Settings & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Settings, Document<unknown, {}, import("mongoose").FlatRecord<Settings>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Settings> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const getSettingsModel: () => DataBaseRepository<SettingsDocument>;
//# sourceMappingURL=settings.model.d.ts.map