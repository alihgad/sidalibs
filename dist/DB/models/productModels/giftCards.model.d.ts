import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { PricingMethod } from '../../../common/type';
export declare class GiftCard {
    name: string;
    secondaryName?: string;
    referenceCode: string;
    barcode?: string;
    category: Types.ObjectId;
    pricingMethod: PricingMethod;
    price?: number;
    isActive: boolean;
    tags: Types.ObjectId[];
    inactiveBranches: Types.ObjectId[];
    isDeleted: boolean;
}
export type GiftCardDocument = HydratedDocument<GiftCard> & {
    _id: string;
};
export declare const GiftCardSchema: import("mongoose").Schema<GiftCard, Model<GiftCard, any, any, any, import("mongoose").Document<unknown, any, GiftCard, any> & GiftCard & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GiftCard, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<GiftCard>, {}> & import("mongoose").FlatRecord<GiftCard> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const GIFT_CARD_MODEL = "GiftCard";
export declare const GiftCardModel: import("@nestjs/common").DynamicModule;
export declare const getGiftCardsModel: (businessNumber: string) => DataBaseRepository<GiftCardDocument>;
//# sourceMappingURL=giftCards.model.d.ts.map