import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class CountSheet {
    referenceNumber: string;
    name: string;
    secondaryName?: string;
    items: [
        {
            itemId: string;
            itemName: string;
            itemCode: string;
            itemStorageUnit: string;
            itemRecipeUnit: string;
            isDeleted: boolean;
        }
    ];
    isDeleted: boolean;
    deletedAt?: Date;
}
export type CountSheetDocument = HydratedDocument<CountSheet>;
export declare const CountSheetSchema: import("mongoose").Schema<CountSheet, Model<CountSheet, any, any, any, import("mongoose").Document<unknown, any, CountSheet, any, {}> & CountSheet & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CountSheet, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CountSheet>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<CountSheet> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const COUNT_SHEET_MODEL = "COUNT_SHEET_MODEL";
export declare const CountSheetModel: import("@nestjs/common").DynamicModule;
export declare const getCountSheetModel: (businessNumber: string) => DataBaseRepository<CountSheetDocument>;
//# sourceMappingURL=countSheet.model.d.ts.map