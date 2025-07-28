import { HydratedDocument, Model, Types, Schema as MongooseSchema } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { CostCalculationMethod, OrderType } from '../../../common/type';
import { NutritionalValues } from '../shared/nutritional-values.schema';
export declare class Ingredient {
    materialId: Types.ObjectId;
    quantity: number;
}
export declare const IngredientSchema: MongooseSchema<Ingredient, Model<Ingredient, any, any, any, import("mongoose").Document<unknown, any, Ingredient, any> & Ingredient & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Ingredient, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Ingredient>, {}> & import("mongoose").FlatRecord<Ingredient> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class CustomAddationsOptionsBranchPrice {
    branch: Types.ObjectId;
    price: number;
}
export declare const CustomAddationsOptionsBranchPriceSchema: MongooseSchema<CustomAddationsOptionsBranchPrice, Model<CustomAddationsOptionsBranchPrice, any, any, any, import("mongoose").Document<unknown, any, CustomAddationsOptionsBranchPrice, any> & CustomAddationsOptionsBranchPrice & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CustomAddationsOptionsBranchPrice, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CustomAddationsOptionsBranchPrice>, {}> & import("mongoose").FlatRecord<CustomAddationsOptionsBranchPrice> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class PriceTagApply {
    priceTag: Types.ObjectId;
    price: number;
}
export declare const PriceTagApplySchema: MongooseSchema<PriceTagApply, Model<PriceTagApply, any, any, any, import("mongoose").Document<unknown, any, PriceTagApply, any> & PriceTagApply & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PriceTagApply, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PriceTagApply>, {}> & import("mongoose").FlatRecord<PriceTagApply> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class AdditionsOption {
    name: string;
    secondaryName?: string;
    description?: string;
    referenceNumber: string;
    price?: number;
    taxGroup?: Types.ObjectId;
    costCalculationMethod: CostCalculationMethod;
    menuGroup?: Types.ObjectId;
    addition: Types.ObjectId;
    ingredients: Ingredient[];
    orderTypes: OrderType[];
    quantity?: number;
    comboException?: Types.ObjectId;
    nutritionalValues?: NutritionalValues;
    CustomAddationsOptionsBranchPrices: CustomAddationsOptionsBranchPrice[];
    inactiveBranches: Types.ObjectId[];
    outOfStockBranches: Types.ObjectId[];
    priceTagApplies: PriceTagApply[];
    isActive: boolean;
    isDeleted: boolean;
}
export type AdditionsOptionDocument = HydratedDocument<AdditionsOption> & {
    _id: string;
};
export declare const AdditionsOptionSchema: MongooseSchema<AdditionsOption, Model<AdditionsOption, any, any, any, import("mongoose").Document<unknown, any, AdditionsOption, any> & AdditionsOption & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AdditionsOption, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AdditionsOption>, {}> & import("mongoose").FlatRecord<AdditionsOption> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ADDITIONS_OPTION_MODEL = "AdditionsOption";
export declare const AdditionsOptionModel: import("@nestjs/common").DynamicModule;
export declare const getAdditionsOptionModel: (businessNumber: string) => DataBaseRepository<AdditionsOptionDocument>;
//# sourceMappingURL=additionsOptions.model.d.ts.map