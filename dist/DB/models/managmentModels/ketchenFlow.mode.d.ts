import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Station {
    name: string;
    kitchenDisplayId: Types.ObjectId;
    order: number;
}
export declare class KitchenFlow {
    name: string;
    branches: Types.ObjectId[];
    stations: Station[];
    products: Types.ObjectId[];
    isActive: boolean;
    isDeleted: boolean;
    deletedBy?: Types.ObjectId;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
}
export type KitchenFlowDocument = HydratedDocument<KitchenFlow>;
export declare const KitchenFlowSchema: import("mongoose").Schema<KitchenFlow, Model<KitchenFlow, any, any, any, import("mongoose").Document<unknown, any, KitchenFlow, any> & KitchenFlow & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, KitchenFlow, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<KitchenFlow>, {}> & import("mongoose").FlatRecord<KitchenFlow> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const KITCHEN_FLOW_MODEL = "KitchenFlow";
export declare const KitchenFlowModel: import("@nestjs/common").DynamicModule;
export declare const getKitchenFlowModel: (businessNumber: string) => DataBaseRepository<KitchenFlowDocument>;
//# sourceMappingURL=ketchenFlow.mode.d.ts.map