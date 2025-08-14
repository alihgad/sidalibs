import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Collection, HydratedDocument, Model, Types } from 'mongoose';
import { deviceTypeEnum, PlanDuration } from '../../../common/type';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';




@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'Device'
})
export class Device {
    @Prop({ required: true, trim: true })
    name!: string;

    @Prop({ required: true, trim: true })
    deviceType!: deviceTypeEnum;

    @Prop({ type: Types.ObjectId, ref: 'Branch' , default: undefined })
    branchId!: Types.ObjectId | undefined;

    @Prop({ required: true, unique: true })
    activationCode!: string; 

    @Prop({ default: false })
    isActivated!: boolean;

    @Prop()
    jwtSecret?: string;

    @Prop()
    lastActivatedAt?: Date;

    @Prop()
    lastOnlineAt?: Date;
    @Prop({
        type: {
            duration: { type: String, enum: Object.values(PlanDuration), required: true },
            paid: { type: Boolean, default: false },
            startDate: { type: Date },
            endDate: { type: Date },
            receiptUrl: { type: String },
        },
        required: true,
    })
    currentSubscription!: {
        duration: PlanDuration;
        paid: boolean;
        startDate: Date;
        endDate: Date;
        receiptUrl?: string;
    };
    @Prop([
        {
            duration: { type: String, enum: Object.values(PlanDuration), required: true },
            paid: { type: Boolean, default: false },
            startDate: { type: Date, required: true },
            receiptUrl: { type: String },
            endDate: { type: Date },
        },
    ])
    subscriptionHistory!: {
        duration: PlanDuration;
        paid: boolean;
        startDate: Date;
        receiptUrl?: string;
        endDate?: Date;
    }[];

    @Prop({ type: Boolean, default: false })
    autoRenew!: boolean;


    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean;

    @Prop({ type: Boolean, default: false })
    isActive!: boolean;

    @Prop({ type: Boolean, default: false })
    isOpened!: boolean;

    @Prop({ type: Date, default: null })
    openedAt!: Date | null;

    @Prop({ type: Number,  min: 1 })
    depositAmount!: number;

    @Prop({ type: Number,  min: 0 , default: 0 })
    salesAmount!: number;

  

}

export type DeviceDocument = HydratedDocument<Device> & { _id: string };
export const DeviceSchema = SchemaFactory.createForClass(Device);
export const Device_MODEL = 'Device_MODEL';
export const DeviceModel = MongooseModule.forFeature([
    { name: Device.name, schema: DeviceSchema },
]);


export const getDevices = (businessNumber: string): DataBaseRepository<DeviceDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in device model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Device'] || connection.model('Device', DeviceSchema) as unknown as Model<DeviceDocument>;
    return new DataBaseRepository<DeviceDocument>(model);
}

export const getDeviceCollection = (businessNumber: string): Collection<DeviceDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in device model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const collection = connection.collection('Device') as unknown as Collection<DeviceDocument>;
    return collection;
}