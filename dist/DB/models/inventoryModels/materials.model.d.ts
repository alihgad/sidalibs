import { Model, Document } from 'mongoose';
export interface materials extends Document {
    name: string;
    phone: string;
    email?: string;
    totalOrders: number;
    lastOrder?: Date;
    accountBalance: number;
    isDeleted: boolean;
    isBlacklisted: boolean;
    creditAccount: boolean;
    notes?: string;
}
export declare const getMaterialsModel: (businessNumber: string) => Model<materials>;
//# sourceMappingURL=materials.model.d.ts.map