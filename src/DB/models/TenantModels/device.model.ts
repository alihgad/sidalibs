import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { PlanDuration, PlanType, ProductsTypeEnum } from '../../../common/type';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';




@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Device {
    @Prop({ required: true, trim: true })
    name!: string;

    @Prop({ type: Types.ObjectId, ref: 'Branch' })
    branchId!: Types.ObjectId;

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
            plan: { type: String, enum: Object.values(PlanType), required: true },
            duration: { type: String, enum: Object.values(PlanDuration), required: true },
            paid: { type: Boolean, default: false },
            startDate: { type: Date },
            endDate: { type: Date },
            branchId: { type: Types.ObjectId, ref: 'Branch' },
            receiptUrl: { type: String },
            amountPaid: { type: Number },
            currency: { type: String },
        },
        required: true,
    })
    currentSubscription!: {
        plan: PlanType;
        duration: PlanDuration;
        paid: boolean;
        startDate: Date;
        endDate: Date;
        branchId: Types.ObjectId;
        receiptUrl?: string;
        amountPaid?: number;
        currency?: string;
    };
    @Prop([
        {
            plan: { type: String, enum: Object.values(PlanType), required: true },
            duration: { type: String, enum: Object.values(PlanDuration), required: true },
            paid: { type: Boolean, default: false },
            startDate: { type: Date, required: true },
            receiptUrl: { type: String },
            amountPaid: { type: Number },
            currency: { type: String },
            endDate: { type: Date },
        },
    ])
    subscriptionHistory!: {
        plan: PlanType;
        duration: PlanDuration;
        paid: boolean;
        startDate: Date;
        receiptUrl?: string;
        amountPaid?: number;
        currency?: string;
        endDate?: Date;
    }[];
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