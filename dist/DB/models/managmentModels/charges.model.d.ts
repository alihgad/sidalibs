import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ChargeType, OrderType } from '../../../common/type';
export declare class Charges {
    name: string;
    secondaryName?: string;
    type: ChargeType;
    isOpenValue: boolean;
    value?: number;
    applyOnOrderTypes: OrderType[];
    taxGroup: Types.ObjectId;
    applyOnAllBranches: boolean;
    applyOnBranches?: Types.ObjectId[];
    autoApply: boolean;
    withoutDiscounts: boolean;
    createdBy: Types.ObjectId;
    isDeleted: boolean;
    deletedBy: Types.ObjectId;
    deletedAt: Date;
}
export type ChargesDocument = HydratedDocument<Charges>;
export declare const chargeschema: import("mongoose").Schema<Charges, Model<Charges, any, any, any, import("mongoose").Document<unknown, any, Charges, any> & Charges & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Charges, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Charges>, {}> & import("mongoose").FlatRecord<Charges> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const CHARGES_MODEL = "Charges";
export declare const ChargesModel: import("@nestjs/common").DynamicModule;
export declare const getChargesModel: (businessNumber: string) => DataBaseRepository<ChargesDocument>;
//# sourceMappingURL=charges.model.d.ts.map