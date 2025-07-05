import { Schema, Model, Document, Types } from 'mongoose';
import { CostCalculationMethod } from '../../../common/type';
import { DataBaseRepository } from '../../DataBase.repository';
export interface materials extends Document {
    name: string;
    secondaryName?: string;
    code: string;
    category: string;
    storageUnit: string;
    recipeUnit: string;
    conversionFactor: number;
    costCalculationMethod: CostCalculationMethod;
    cost: number;
    reorderLevel: number;
    barcode?: string;
    minLevel: number;
    maxLevel: number;
    suppliers?: Types.ObjectId[];
    tags?: Types.ObjectId[];
    ingredients?: Types.ObjectId[];
    isDeleted: boolean;
}
export declare const materialsSchema: Schema<materials, Model<materials, any, any, any, Document<unknown, any, materials, any> & materials & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, materials, Document<unknown, {}, import("mongoose").FlatRecord<materials>, {}> & import("mongoose").FlatRecord<materials> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export type MaterialsDocument = materials & Document;
export declare const getMaterialsModel: (businessNumber: string) => DataBaseRepository<MaterialsDocument>;
//# sourceMappingURL=materials.model.d.ts.map