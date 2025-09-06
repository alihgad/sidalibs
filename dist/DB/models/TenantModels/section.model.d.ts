import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Section {
    name: string;
    seconderyName?: string;
    branchId: Types.ObjectId;
    isDeleted: boolean;
    createdBy: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
export type SectionDocument = HydratedDocument<Section>;
export declare const SectionSchema: import("mongoose").Schema<Section, Model<Section, any, any, any, import("mongoose").Document<unknown, any, Section, any, {}> & Section & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Section, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Section>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Section> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const SECTION_MODEL = "SECTION_MODEL";
export declare const SectionModel: import("@nestjs/common").DynamicModule;
export declare const getSectionModel: (businessNumber: string) => DataBaseRepository<SectionDocument>;
//# sourceMappingURL=section.model.d.ts.map