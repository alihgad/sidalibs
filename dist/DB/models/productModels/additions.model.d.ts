import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class additions {
    name: string;
    secondaryName?: string;
    referenceNumber: string;
    isDeleted: boolean;
}
export type additionsDocument = HydratedDocument<additions> & {
    _id: string;
};
export declare const additionsSchema: import("mongoose").Schema<additions, Model<additions, any, any, any, import("mongoose").Document<unknown, any, additions, any> & additions & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, additions, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<additions>, {}> & import("mongoose").FlatRecord<additions> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Product_CATEGORY_MODEL = "additions";
export declare const additionsModel: import("@nestjs/common").DynamicModule;
export declare const getProductCategoriesModel: (businessNumber: string) => DataBaseRepository<additionsDocument>;
//# sourceMappingURL=additions.model.d.ts.map