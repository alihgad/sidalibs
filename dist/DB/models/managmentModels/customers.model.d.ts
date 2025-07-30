import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class customers {
    constructor(name: string, phone: string, totalOrders: number | undefined, favoriteBranch: Types.ObjectId, accountBalance: number | undefined, isDeleted: boolean | undefined, isBlacklisted: boolean | undefined, creditAccount: boolean | undefined, favoriteItem: Types.ObjectId, notes?: string, lastOrder?: Date);
    name: string;
    email?: string;
    phone: string;
    totalOrders: number;
    lastOrder?: Date;
    accountBalance: number;
    isDeleted: boolean;
    isBlacklisted: boolean;
    creditAccount: boolean;
    favoriteBranch: Types.ObjectId;
    favoriteItem: Types.ObjectId;
    notes?: string;
}
export type customersDocument = HydratedDocument<customers>;
export declare const customersSchema: import("mongoose").Schema<customers, Model<customers, any, any, any, import("mongoose").Document<unknown, any, customers, any> & customers & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, customers, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<customers>, {}> & import("mongoose").FlatRecord<customers> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const customers_MODEL = "customers_MODEL";
export declare const customersModel: import("@nestjs/common").DynamicModule;
export declare const getcustomersModel: (businessNumber: string) => DataBaseRepository<customersDocument>;
//# sourceMappingURL=customers.model.d.ts.map