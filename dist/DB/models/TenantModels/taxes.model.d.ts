import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { OrderType } from '../../../common/type';
export declare class Tax {
    name: string;
    secondName: string;
    percentage: number;
    appliesTo: OrderType[];
    isDeleted: boolean;
}
export type TaxDocument = HydratedDocument<Tax> & {
    _id: string;
};
export declare const TaxSchema: import("mongoose").Schema<Tax, Model<Tax, any, any, any, import("mongoose").Document<unknown, any, Tax, any> & Tax & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Tax, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Tax>, {}> & import("mongoose").FlatRecord<Tax> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const TAX_MODEL = "Tax";
export declare const TaxModel: import("@nestjs/common").DynamicModule;
export declare const getTaxModel: (businessNumber: string) => DataBaseRepository<TaxDocument>;
//# sourceMappingURL=taxes.model.d.ts.map