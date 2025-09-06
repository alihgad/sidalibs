import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { PaymentMethodType } from '../../../common/type';
export declare class PaymentMethod {
    name: string;
    secondName: string;
    type: PaymentMethodType;
    code: string;
    autoOpenDrawer: boolean;
    isActive: boolean;
    isDeleted: boolean;
}
export type PaymentMethodDocument = HydratedDocument<PaymentMethod> & {
    _id: string;
};
export declare const PaymentMethodSchema: import("mongoose").Schema<PaymentMethod, Model<PaymentMethod, any, any, any, import("mongoose").Document<unknown, any, PaymentMethod, any, {}> & PaymentMethod & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PaymentMethod, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PaymentMethod>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PaymentMethod> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const PAYMENT_METHOD_MODEL = "PaymentMethod";
export declare const PaymentMethodModel: import("@nestjs/common").DynamicModule;
export declare const getPaymentMethodModel: (businessNumber: string) => DataBaseRepository<PaymentMethodDocument>;
//# sourceMappingURL=paymentMethods.model.d.ts.map