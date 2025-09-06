import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class StockInBranch {
    branchId?: Types.ObjectId;
    warehouseId?: Types.ObjectId;
    materialId: Types.ObjectId;
    sectionId?: Types.ObjectId;
    quantity: number;
    price?: number;
}
export type StockInBranchDocument = HydratedDocument<StockInBranch>;
export declare const StockInBranchSchema: import("mongoose").Schema<StockInBranch, Model<StockInBranch, any, any, any, import("mongoose").Document<unknown, any, StockInBranch, any, {}> & StockInBranch & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StockInBranch, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<StockInBranch>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<StockInBranch> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const STOCK_IN_BRANCH_MODEL = "STOCK_IN_BRANCH_MODEL";
export declare const StockInBranchModel: import("@nestjs/common").DynamicModule;
export declare const getStockInBranchModel: (businessNumber: string) => DataBaseRepository<StockInBranchDocument>;
//# sourceMappingURL=stockInBranch.d.ts.map