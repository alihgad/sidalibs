import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { LogActionType } from '../../../common/type';



@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Log {
    @Prop({ type: String, enum: LogActionType, required: true })
    actionType!: LogActionType;

    @Prop({ required: true })
    actionName!: string;

    @Prop()
    actionDescription?: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    performedBy!: Types.ObjectId;

    @Prop()
    module?: string;

    @Prop({ type: String })
    entityType?: string;

    @Prop({ type: Types.ObjectId })
    entityId?: Types.ObjectId;

    @Prop({ type: Object })
    oldData?: any;

    @Prop({ type: Object })
    newData?: any;

    @Prop({
        type: Map,
        of: {
            LSID: { type: String, required: true },
            userAgent: { type: String },
            ipAddress: { type: String },
            createdAt: { type: Date, default: Date.now },
        },
        default: {},
    })
    loginDevicesSession?: Map<string, {
        LSID: string;
        userAgent: string;
        ipAddress: string;
        createdAt: Date;
    }>;

    @Prop({ type: String, enum: ['SUCCESS', 'FAILURE'], default: 'SUCCESS' })
    status!: 'SUCCESS' | 'FAILURE';

    @Prop({ type: Object })
    context?: any;
}


export type LogDocument = HydratedDocument<Log> & { _id: string };
export const LogSchema = SchemaFactory.createForClass(Log);

// إضافة indexes للبحث السريع
LogSchema.index({ actionType: 1, createdAt: -1 });
LogSchema.index({ userId: 1, createdAt: -1 });
LogSchema.index({ entityType: 1, entityId: 1 });
LogSchema.index({ createdAt: -1 });

export const LOG_MODEL = 'Log_MODEL';
export const LogModel = MongooseModule.forFeature([
    { name: Log.name, schema: LogSchema },
]);

export const getLogModel = (businessNumber: string): DataBaseRepository<LogDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in log model");
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Log'] || connection.model('Log', LogSchema) as unknown as Model<LogDocument>;
    return new DataBaseRepository<LogDocument>(model);
}