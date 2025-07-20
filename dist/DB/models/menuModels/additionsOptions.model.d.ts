import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { CostCalculationMethod, OrderType } from '../../../common/type';
export declare class Addition {
    name: string;
    secondaryName?: string;
    description?: string;
    referenceNumber: string;
    price?: number;
    taxGroup?: Types.ObjectId;
    costCalculationMethod: CostCalculationMethod;
    cost?: number;
    menuGroup?: Types.ObjectId;
    ingredients: Types.ObjectId[];
    orderTypes: OrderType[];
    quantity?: number;
    comboException?: Types.ObjectId;
    nutritionalValues?: any;
    customBranchPrices: {
        branch: Types.ObjectId;
        price: number;
    }[];
    inactiveBranches: Types.ObjectId[];
    outOfStockBranches: Types.ObjectId[];
    priceTagApplies: {
        priceTag: Types.ObjectId;
        price: number;
    }[];
    isActive: boolean;
    isDeleted: boolean;
}
export type AdditionDocument = HydratedDocument<Addition> & {
    _id: string;
};
export declare const AdditionSchema: import("mongoose").Schema<Addition, Model<Addition, any, any, any, import("mongoose").Document<unknown, any, Addition, any> & Addition & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Addition, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Addition>, {}> & import("mongoose").FlatRecord<Addition> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ADDITION_MODEL = "Addition";
export declare const AdditionModel: import("@nestjs/common").DynamicModule;
export declare const getAdditionsModel: (businessNumber: string) => DataBaseRepository<AdditionDocument>;
//# sourceMappingURL=additionsOptions.model.d.ts.map