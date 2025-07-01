import { Document, Types } from 'mongoose';
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
}
export type MaterialsDocument = materials & Document;
export declare const getMaterialsModel: (businessNumber: string) => DataBaseRepository<MaterialsDocument>;
//# sourceMappingURL=materials.model.d.ts.map