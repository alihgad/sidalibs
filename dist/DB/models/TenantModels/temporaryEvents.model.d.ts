import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { TemporaryEventType, DaysOfWeek, OrderType } from '../../../common/type';
export declare class TemporaryEvent {
    name: string;
    secondaryName?: string;
    type: TemporaryEventType;
    fixedPrice?: number;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    isActive: boolean;
    applicableDays: DaysOfWeek[];
    orderTypes: OrderType[];
    priority: number;
    branches?: Types.ObjectId[];
    categories?: Types.ObjectId[];
    products?: Types.ObjectId[];
    productTags?: Types.ObjectId[];
}
export type TemporaryEventDocument = HydratedDocument<TemporaryEvent> & {
    _id: string;
};
export declare const TemporaryEventSchema: import("mongoose").Schema<TemporaryEvent, Model<TemporaryEvent, any, any, any, import("mongoose").Document<unknown, any, TemporaryEvent, any> & TemporaryEvent & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TemporaryEvent, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<TemporaryEvent>, {}> & import("mongoose").FlatRecord<TemporaryEvent> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const TEMPORARY_EVENT_MODEL = "TemporaryEvent";
export declare const TemporaryEventModel: import("@nestjs/common").DynamicModule;
export declare const getTemporaryEventModel: (businessNumber: string) => DataBaseRepository<TemporaryEventDocument>;
//# sourceMappingURL=temporaryEvents.model.d.ts.map