import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Receipt {
    logoUrl?: {
        public_id: string;
        secure_url: string;
    };
    printLanguages: string[];
    primaryLanguage: string;
    secondaryLanguage: string;
    headerText?: string;
    footerText?: string;
    invoiceTitle?: string;
    showOrderNumber: boolean;
    showCalories: boolean;
    showSubtotal: boolean;
    showRounding: boolean;
    showClosedBy: boolean;
    showCreatedBy: boolean;
    showCheckNumber: boolean;
    hideFreeModiferOptions: boolean;
    printCustomerPhoneNumberInPickupOrders: boolean;
}
export type ReceiptDocument = HydratedDocument<Receipt>;
export declare const ReceiptSchema: import("mongoose").Schema<Receipt, Model<Receipt, any, any, any, import("mongoose").Document<unknown, any, Receipt, any> & Receipt & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Receipt, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Receipt>, {}> & import("mongoose").FlatRecord<Receipt> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const RECEIPT_MODEL = "Receipt";
export declare const ReceiptModel: import("@nestjs/common").DynamicModule;
export declare const getReceiptModel: (businessNumber: string) => DataBaseRepository<ReceiptDocument>;
//# sourceMappingURL=receipt.model.d.ts.map