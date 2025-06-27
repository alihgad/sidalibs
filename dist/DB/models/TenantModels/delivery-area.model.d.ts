import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class DeliveryArea {
    name: string;
    secondaryName?: string;
    referenceNumber?: string;
    branches: Types.ObjectId[];
    isDeleted: boolean;
}
export type DeliveryAreaDocument = HydratedDocument<DeliveryArea> & {
    _id: string;
};
export declare const DeliveryAreaSchema: import("mongoose").Schema<DeliveryArea, Model<DeliveryArea, any, any, any, import("mongoose").Document<unknown, any, DeliveryArea, any> & DeliveryArea & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DeliveryArea, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<DeliveryArea>, {}> & import("mongoose").FlatRecord<DeliveryArea> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const DELIVERY_AREA_MODEL = "DeliveryArea";
export declare const DeliveryAreaModel: import("@nestjs/common").DynamicModule;
export declare const getDeliveryAreaModel: (businessNumber: string) => DataBaseRepository<DeliveryAreaDocument>;
//# sourceMappingURL=delivery-area.model.d.ts.map