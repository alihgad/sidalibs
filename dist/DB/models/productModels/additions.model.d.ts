import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Addition {
    name: string;
    secondaryName?: string;
    referenceNumber: string;
    isDeleted: boolean;
}
export type AdditionDocument = HydratedDocument<Addition> & {
    _id: string;
};
export declare const AdditionSchema: import("mongoose").Schema<Addition, Model<Addition, any, any, any, import("mongoose").Document<unknown, any, Addition, any> & Addition & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Addition, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Addition>, {}> & import("mongoose").FlatRecord<Addition> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ADDITION_MODEL = "Addition";
export declare const AdditionModel: import("@nestjs/common").DynamicModule;
export declare const getAdditionsModel: (businessNumber: string) => DataBaseRepository<AdditionDocument>;
//# sourceMappingURL=additions.model.d.ts.map