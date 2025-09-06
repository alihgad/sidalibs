import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class ReceiptForm {
    businessNumber: string;
    logoUrl?: {
        public_id: string;
        secure_url: string;
    };
    printLanguages?: string[];
    primaryLanguage?: string;
    secondaryLanguage?: string;
    headerText?: string;
    footerText?: string;
    invoiceTitle?: string;
    showOrderNumber?: boolean;
    showCalories?: boolean;
    showSubtotal?: boolean;
    showRounding?: boolean;
    showClosedBy?: boolean;
    showCreatedBy?: boolean;
    showCheckNumber?: boolean;
    hideFreeModiferOptions?: boolean;
    printCustomerPhoneNumberInPickupOrders?: boolean;
}
export type ReceiptFormDocument = HydratedDocument<ReceiptForm>;
export declare const ReceiptFormSchema: import("mongoose").Schema<ReceiptForm, Model<ReceiptForm, any, any, any, import("mongoose").Document<unknown, any, ReceiptForm, any, {}> & ReceiptForm & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ReceiptForm, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ReceiptForm>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ReceiptForm> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const RECEIPT_FORM_MODEL = "ReceiptForm";
export declare const ReceiptFormModel: import("@nestjs/common").DynamicModule;
export declare const getReceiptFormModel: () => DataBaseRepository<ReceiptFormDocument>;
//# sourceMappingURL=receipt.model.d.ts.map