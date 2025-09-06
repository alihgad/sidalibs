import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ReasonType } from '../../../common/type';
export declare class Reason {
    name: string;
    secondaryName?: string;
    type: ReasonType;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type ReasonDocument = HydratedDocument<Reason>;
export declare const ReasonSchema: import("mongoose").Schema<Reason, Model<Reason, any, any, any, import("mongoose").Document<unknown, any, Reason, any, {}> & Reason & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Reason, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Reason>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Reason> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const REASON_MODEL = "REASON_MODEL";
export declare const ReasonModel: import("@nestjs/common").DynamicModule;
export declare const getReasonModel: (businessNumber: string) => DataBaseRepository<ReasonDocument>;
//# sourceMappingURL=reason.model.d.ts.map