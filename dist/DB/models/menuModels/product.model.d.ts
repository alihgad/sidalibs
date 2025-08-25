import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { PricingMethod, SaleMethod, CostCalculationMethod, ServingUnit } from '../../../common/type';
export declare class CustomProductBranchPrice {
    branch: Types.ObjectId;
    price: number;
}
export declare const CustomProductBranchPriceSchema: import("mongoose").Schema<CustomProductBranchPrice, Model<CustomProductBranchPrice, any, any, any, import("mongoose").Document<unknown, any, CustomProductBranchPrice, any> & CustomProductBranchPrice & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CustomProductBranchPrice, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CustomProductBranchPrice>, {}> & import("mongoose").FlatRecord<CustomProductBranchPrice> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class NutritionalValues {
    servingSize: number;
    servingUnit: ServingUnit;
    calories: number;
    protein: number;
    totalFat: number;
    saturatedFat: number;
    transFat: number;
    cholesterol: number;
    sodium: number;
    salt: number;
    carbohydrates: number;
    fiber: number;
    totalSugars: number;
    addedSugars: number;
}
export declare const NutritionalValuesSchema: import("mongoose").Schema<NutritionalValues, Model<NutritionalValues, any, any, any, import("mongoose").Document<unknown, any, NutritionalValues, any> & NutritionalValues & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NutritionalValues, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<NutritionalValues>, {}> & import("mongoose").FlatRecord<NutritionalValues> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Product {
    name: string;
    secondaryName?: string;
    description?: string;
    secondaryDescription?: string;
    category: Types.ObjectId;
    isRetailProduct: boolean;
    referenceCode: string;
    pricingMethod: PricingMethod;
    price?: number;
    taxGroup?: Types.ObjectId;
    costCalculationMethod: CostCalculationMethod;
    cost?: number;
    saleMethod: SaleMethod;
    tags: Types.ObjectId[];
    additions: Types.ObjectId[];
    ingredients: Types.ObjectId[];
    CustomProductBranchPrices: CustomProductBranchPrice[];
    inactiveBranches: Types.ObjectId[];
    outOfStockBranches: Types.ObjectId[];
    priceTagApplies: Types.ObjectId[];
    menuGroup?: Types.ObjectId;
    walkTime: number;
    nutritionalValues?: NutritionalValues;
    isActive: boolean;
    isManufactured: boolean;
    isDeleted: boolean;
    containsHighSalt: boolean;
}
export type ProductDocument = HydratedDocument<Product> & {
    _id: string;
};
export declare const ProductSchema: import("mongoose").Schema<Product, Model<Product, any, any, any, import("mongoose").Document<unknown, any, Product, any> & Product & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Product>, {}> & import("mongoose").FlatRecord<Product> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const PRODUCT_MODEL = "Product";
export declare const ProductModel: import("@nestjs/common").DynamicModule;
export declare const getProductModel: (businessNumber: string) => DataBaseRepository<ProductDocument>;
//# sourceMappingURL=product.model.d.ts.map