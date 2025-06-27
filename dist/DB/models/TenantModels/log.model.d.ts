import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { LogActionType } from '../../../common/type';
export declare class Log {
    actionType: LogActionType;
    actionName: string;
    actionDescription?: string;
    performedBy: Types.ObjectId;
    module?: string;
    entityType?: string;
    entityId?: Types.ObjectId;
    oldData?: any;
    newData?: any;
    loginDevicesSession?: Map<string, {
        LSID: string;
        userAgent: string;
        ipAddress: string;
        createdAt: Date;
    }>;
    status: 'SUCCESS' | 'FAILURE';
    context?: any;
}
export type LogDocument = HydratedDocument<Log> & {
    _id: string;
};
export declare const LogSchema: import("mongoose").Schema<Log, Model<Log, any, any, any, import("mongoose").Document<unknown, any, Log, any> & Log & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Log, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Log>, {}> & import("mongoose").FlatRecord<Log> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const LOG_MODEL = "Log_MODEL";
export declare const LogModel: import("@nestjs/common").DynamicModule;
export declare const getLogModel: (businessNumber: string) => DataBaseRepository<LogDocument>;
//# sourceMappingURL=log.model.d.ts.map