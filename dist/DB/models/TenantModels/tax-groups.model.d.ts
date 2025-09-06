import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { Tax } from './taxes.model';
export declare class TaxGroup {
    name: string;
    secondName: string;
    code: string;
    taxes: Tax[];
    isDeleted: boolean;
}
export type TaxGroupDocument = HydratedDocument<TaxGroup> & {
    _id: string;
};
export declare const TaxGroupSchema: import("mongoose").Schema<TaxGroup, Model<TaxGroup, any, any, any, import("mongoose").Document<unknown, any, TaxGroup, any, {}> & TaxGroup & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TaxGroup, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<TaxGroup>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<TaxGroup> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const TAX_GROUP_MODEL = "TaxGroup";
export declare const TaxGroupModel: import("@nestjs/common").DynamicModule;
export declare const getTaxGroupModel: (businessNumber: string) => DataBaseRepository<TaxGroupDocument>;
//# sourceMappingURL=tax-groups.model.d.ts.map