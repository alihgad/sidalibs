import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { DaysOfWeek, OrderType, PromotionType } from '../../../common/type';
export declare class PromotionalOffer {
    name: string;
    secondaryName?: string;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    applicableDays: DaysOfWeek[];
    orderType: OrderType[];
    priority: number;
    includeAddons: boolean;
    promotionType: PromotionType[];
    branches: Types.ObjectId[];
    isActive: boolean;
}
export type PromotionalOfferDocument = HydratedDocument<PromotionalOffer> & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare const PromotionalOfferSchema: import("mongoose").Schema<PromotionalOffer, Model<PromotionalOffer, any, any, any, import("mongoose").Document<unknown, any, PromotionalOffer, any, {}> & PromotionalOffer & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PromotionalOffer, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PromotionalOffer>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PromotionalOffer> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const PROMOTIONAL_OFFER_MODEL = "PromotionalOffer";
export declare const PromotionalOfferModel: import("@nestjs/common").DynamicModule;
export declare const getPromotionalOfferModel: (businessNumber: string) => DataBaseRepository<PromotionalOfferDocument>;
//# sourceMappingURL=PromotionalOffer.model.d.ts.map