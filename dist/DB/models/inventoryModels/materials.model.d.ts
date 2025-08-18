import { HydratedDocument, Model, Types } from 'mongoose';
import { CostCalculationMethod } from '../../../common/type';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Materials {
    name: string;
    secondaryName?: string;
    code: string;
    category: string;
    storageUnit: string;
    recipeUnit: string;
    conversionFactor: number;
    costCalculationMethod: CostCalculationMethod;
    totalCostOfProduction: number;
    reorderLevel: number;
    barcode?: string;
    minLevel: number;
    maxLevel: number;
    suppliers?: Types.ObjectId[];
    tags?: Types.ObjectId[];
    ingredients?: {
        materialId: Types.ObjectId;
        quantity: number;
        yieldPercentage: number;
        unitCost: number;
        finalQuantity: number;
        wasteQuantity: number;
        finalCost: number;
    }[];
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type MaterialsDocument = HydratedDocument<Materials>;
export declare const MaterialsSchema: import("mongoose").Schema<Materials, Model<Materials, any, any, any, import("mongoose").Document<unknown, any, Materials, any> & Materials & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Materials, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Materials>, {}> & import("mongoose").FlatRecord<Materials> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const MATERIALS_MODEL = "MATERIALS_MODEL";
export declare const MaterialsModel: import("@nestjs/common").DynamicModule;
export declare const getMaterialsModel: (businessNumber: string) => DataBaseRepository<MaterialsDocument>;
//# sourceMappingURL=materials.model.d.ts.map