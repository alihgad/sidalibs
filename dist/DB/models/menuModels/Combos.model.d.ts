import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class ComboSize {
    name: string;
    secondaryName?: string;
    order: number;
    isDefault: boolean;
    isAvailable: boolean;
}
export declare class OptionPrice {
    size: string;
    price: number;
}
export declare class ComboOption {
    name: string;
    secondaryName?: string;
    product: Types.ObjectId;
    prices: OptionPrice[];
    isDefault: boolean;
    isAvailable: boolean;
    order: number;
}
export declare class ComboGroup {
    name: string;
    secondaryName?: string;
    order: number;
    isRequired: boolean;
    maxSelections: number;
    minSelections: number;
    isAvailable: boolean;
    options: ComboOption[];
}
export declare class CustomBranchPrice {
    branch: Types.ObjectId;
    prices: Array<{
        size: string;
        group: string;
        price: number;
    }>;
}
export declare class Combos {
    name: string;
    secondaryName?: string;
    category: Types.ObjectId;
    referenceCode: string;
    barcode?: string;
    description?: string;
    image?: string;
    isActive: boolean;
    isDeleted: boolean;
    tags?: Types.ObjectId[];
    inactiveBranches?: Types.ObjectId[];
    customBranchPrices?: CustomBranchPrice[];
    sizes: ComboSize[];
    groups: ComboGroup[];
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
}
export type CombosDocument = HydratedDocument<Combos> & {
    _id: string;
};
export declare const CombosSchema: import("mongoose").Schema<Combos, Model<Combos, any, any, any, import("mongoose").Document<unknown, any, Combos, any, {}> & Combos & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Combos, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Combos>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Combos> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const COMBO_MODEL = "Combos";
export declare const CombosModel: import("@nestjs/common").DynamicModule;
export declare const getCombosModel: (businessNumber: string) => DataBaseRepository<CombosDocument>;
//# sourceMappingURL=Combos.model.d.ts.map