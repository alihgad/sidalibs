import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { Transaction } from '../../../common/type';
export declare class materialCard {
    constructor(materialId: Types.ObjectId, price: number, closeDate: Date, inputs: Transaction[], outputs: Transaction[], startPrice: number, oldInputs: Transaction[], oldOutputs: Transaction[], branchId: Types.ObjectId);
    materialId: Types.ObjectId;
    branchId: Types.ObjectId;
    price: number;
    closeDate: Date;
    inputs: Transaction[];
    outputs: Transaction[];
    oldInputs: Transaction[];
    oldOutputs: Transaction[];
    startPrice: number;
}
export type materialCardDocument = HydratedDocument<materialCard>;
export declare const materialCardSchema: import("mongoose").Schema<materialCard, Model<materialCard, any, any, any, import("mongoose").Document<unknown, any, materialCard, any, {}> & materialCard & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, materialCard, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<materialCard>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<materialCard> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const material_CARD_MODEL = "material_CARD_MODEL";
export declare const materialCardModel: import("@nestjs/common").DynamicModule;
export declare const getmaterialCardModel: (businessNumber: string) => DataBaseRepository<materialCardDocument>;
//# sourceMappingURL=itemCard.model.d.ts.map